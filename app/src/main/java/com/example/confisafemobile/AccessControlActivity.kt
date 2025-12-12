package com.example.confisafemobile

import android.os.Bundle
import android.os.CountDownTimer
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.confisafemobile.databinding.ActivityAccessControlBinding
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FieldValue
import com.google.firebase.firestore.FirebaseFirestore
import java.util.concurrent.TimeUnit

class AccessControlActivity : AppCompatActivity() {

    private lateinit var binding: ActivityAccessControlBinding
    private val db = FirebaseFirestore.getInstance()
    private val auth = FirebaseAuth.getInstance()

    // Variáveis do Cronômetro
    private var timer: CountDownTimer? = null
    // TEMPO LIMITE PADRÃO: 30 Minutos (em milissegundos)
    // Você pode mudar isso ou puxar do banco de dados da área
    private val tempoLimiteMillis: Long = 30 * 60 * 1000

    private var idDocumentoAcesso: String = "" // Para atualizar o mesmo doc na saída

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityAccessControlBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // 1. Pega dados da Intent (vindos da tela anterior)
        val areaNome = intent.getStringExtra("nome_area") ?: "Área Restrita"
        val areaId = intent.getStringExtra("id_area") ?: ""

        binding.tvAreaName.text = areaNome
        formatarTempo(tempoLimiteMillis) // Mostra 30:00 inicial

        // 2. Carrega nome do funcionário
        carregarUsuario()

        // 3. Botão ENTRAR
        binding.btnEntrarArea.setOnClickListener {
            iniciarAcesso(areaId, areaNome)
        }

        // 4. Botão SAIR
        binding.btnSairArea.setOnClickListener {
            finalizarAcesso()
        }
    }

    private fun carregarUsuario() {
        val user = auth.currentUser
        val id = user?.email?.substringBefore("@") ?: ""
        db.collection("funcionarios").document(id).get()
            .addOnSuccessListener {
                val nome = it.getString("nome") ?: "Usuário"
                binding.tvUserName.text = "Colaborador: $nome"
            }
    }

    // --- LÓGICA DE ENTRADA ---
    private fun iniciarAcesso(areaId: String, areaNome: String) {
        // 1. Muda visual
        binding.btnEntrarArea.visibility = View.GONE
        binding.btnSairArea.visibility = View.VISIBLE
        binding.tvStatusMessage.text = "VOCÊ ESTÁ DENTRO DA ÁREA DE RISCO"
        binding.tvStatusMessage.setTextColor(resources.getColor(android.R.color.holo_red_dark, null))

        // 2. Registra no Banco
        val dadosEntrada = hashMapOf(
            "areaId" to areaId,
            "areaNome" to areaNome,
            "userId" to (auth.currentUser?.uid ?: ""),
            "userEmail" to (auth.currentUser?.email ?: ""),
            "entrada" to FieldValue.serverTimestamp(),
            "status" to "EM_ANDAMENTO"
        )

        db.collection("acessos").add(dadosEntrada)
            .addOnSuccessListener { docRef ->
                idDocumentoAcesso = docRef.id // Guarda ID para usar na saída
                iniciarCronometro()
                Toast.makeText(this, "Cronômetro Iniciado!", Toast.LENGTH_SHORT).show()
            }
    }

    // --- LÓGICA DO CRONÔMETRO ---
    private fun iniciarCronometro() {
        timer = object : CountDownTimer(tempoLimiteMillis, 1000) {
            override fun onTick(millisUntilFinished: Long) {
                formatarTempo(millisUntilFinished)

                // Alerta se faltar menos de 5 min (opcional)
                if (millisUntilFinished < 5 * 60 * 1000) {
                    binding.tvTimer.setTextColor(resources.getColor(android.R.color.holo_red_dark, null))
                }
            }

            override fun onFinish() {
                binding.tvTimer.text = "00:00"
                binding.tvStatusMessage.text = "TEMPO ESGOTADO! SAIA IMEDIATAMENTE."
                // Aqui você poderia tocar um som ou vibrar
            }
        }.start()
    }

    private fun formatarTempo(millis: Long) {
        val minutos = TimeUnit.MILLISECONDS.toMinutes(millis)
        val segundos = TimeUnit.MILLISECONDS.toSeconds(millis) % 60
        binding.tvTimer.text = String.format("%02d:%02d", minutos, segundos)
    }

    // --- LÓGICA DE SAÍDA ---
    private fun finalizarAcesso() {
        // Para o relógio
        timer?.cancel()

        // Atualiza banco com a saída
        if (idDocumentoAcesso.isNotEmpty()) {
            db.collection("acessos").document(idDocumentoAcesso)
                .update("saida", FieldValue.serverTimestamp(), "status", "CONCLUIDO")
                .addOnSuccessListener {
                    Toast.makeText(this, "Acesso finalizado.", Toast.LENGTH_LONG).show()
                    finish() // Fecha a tela e volta
                }
        } else {
            finish()
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        timer?.cancel() // Garante que o timer pare se fechar o app
    }
}