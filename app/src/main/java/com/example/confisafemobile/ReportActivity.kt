package com.example.confisafemobile

import android.R
import android.os.Bundle
import android.widget.ArrayAdapter
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.confisafemobile.databinding.ActivityReportBinding
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FieldValue
import com.google.firebase.firestore.FirebaseFirestore

class ReportActivity : AppCompatActivity() {

    private lateinit var binding: ActivityReportBinding
    private val db = FirebaseFirestore.getInstance()
    private val auth = FirebaseAuth.getInstance()

    private val listaAreas = mutableListOf<String>()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityReportBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // 1. Carrega Nome do Usuário para exibir no TextView novo
        carregarNomeUsuario()

        // 2. Carrega as áreas do banco
        carregarAreasDoBanco()

        binding.btnEnviarReport.setOnClickListener {
            enviarAlertaRapido()
        }
    }

    private fun carregarNomeUsuario() {
        val user = auth.currentUser
        if (user != null) {
            val userId = user.email?.substringBefore("@") ?: ""
            // Tenta pegar o nome do banco
            db.collection("funcionarios").document(userId).get()
                .addOnSuccessListener { doc ->
                    if (doc.exists()) {
                        val nome = doc.getString("nome") ?: userId
                        binding.tvUserName.text = "Repórter: $nome"
                    } else {
                        binding.tvUserName.text = "Repórter: $userId"
                    }
                }
                .addOnFailureListener {
                    binding.tvUserName.text = "Repórter: $userId"
                }
        }
    }

    private fun carregarAreasDoBanco() {
        listaAreas.add("Carregando áreas...")
        atualizarSpinner()

        db.collection("areas")
            .get()
            .addOnSuccessListener { documentos ->
                listaAreas.clear()

                if (documentos.isEmpty) {
                    listaAreas.add("Geral / Outros")
                } else {
                    for (doc in documentos) {
                        val nomeArea = doc.getString("nome") ?: "Área sem nome"
                        listaAreas.add(nomeArea)
                    }
                }
                atualizarSpinner()
            }
            .addOnFailureListener {
                listaAreas.clear()
                listaAreas.add("Erro ao carregar áreas")
                atualizarSpinner()
            }
    }

    private fun atualizarSpinner() {
        val adapter = ArrayAdapter(this, R.layout.simple_spinner_dropdown_item, listaAreas)
        binding.spinnerAreas.adapter = adapter
    }

    private fun enviarAlertaRapido() {
        val areaSelecionada = binding.spinnerAreas.selectedItem.toString()
        var titulo = binding.etTituloAcidente.text.toString().trim() // Remove espaços extras
        val usuario = auth.currentUser

        // Validação da Área
        if (areaSelecionada == "Carregando áreas..." || areaSelecionada == "Erro ao carregar áreas") {
            Toast.makeText(this, "Aguarde o carregamento das áreas", Toast.LENGTH_SHORT).show()
            return
        }

        // --- MUDANÇA: Se estiver vazio, define um texto padrão (NÃO é mais obrigatório) ---
        if (titulo.isEmpty()) {
            titulo = "Acidente (Sem descrição)"
        }

        val gravidade = when (binding.rgGravidade.checkedRadioButtonId) {
            com.example.confisafemobile.R.id.rbLeve -> "Leve"
            com.example.confisafemobile.R.id.rbModerado -> "Moderado"
            com.example.confisafemobile.R.id.rbGrave -> "Grave"
            else -> "Não informada"
        }

        if (usuario != null) {
            val alerta = hashMapOf(
                "area" to areaSelecionada,
                "titulo" to titulo,
                "gravidade" to gravidade,
                "userId" to usuario.uid,
                "userEmail" to (usuario.email ?: ""),
                "dataHora" to FieldValue.serverTimestamp(),
                "status" to "ALERTA_ATIVO",
                "temPosReport" to false
            )

            db.collection("relatorios_acidentes")
                .add(alerta)
                .addOnSuccessListener {
                    Toast.makeText(this, "🚨 ALERTA ENVIADO!", Toast.LENGTH_LONG).show()
                    finish()
                }
                .addOnFailureListener {
                    Toast.makeText(this, "Falha ao enviar", Toast.LENGTH_SHORT).show()
                }
        }
    }
}