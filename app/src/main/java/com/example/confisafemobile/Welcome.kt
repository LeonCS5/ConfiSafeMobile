package com.example.confisafemobile

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.confisafemobile.databinding.ActivityWelcomeBinding
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore

/**
 * TELA PRINCIPAL (DASHBOARD):
 * Esta tela serve como o menu central do aplicativo após o login.
 * Ela recupera o nome real do funcionário do banco de dados e gerencia a navegação.
 */
class Welcome : AppCompatActivity() {

    // ViewBinding: Acesso direto aos componentes do XML activity_welcome.xml
    private lateinit var binding: ActivityWelcomeBinding
    
    // Ferramentas do Firebase: Auth para login/logout e Firestore para dados
    private lateinit var auth: FirebaseAuth
    private lateinit var db: FirebaseFirestore

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // Inicializa ViewBinding
        binding = ActivityWelcomeBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // Inicializa Firebase
        auth = FirebaseAuth.getInstance()
        db = FirebaseFirestore.getInstance()

        // TENTA RECUPERAR O USUÁRIO LOGADO
        val usuarioAtual = auth.currentUser

        if (usuarioAtual != null) {
            // LÓGICA DE RECUPERAÇÃO DE NOME:
            // O e-mail do usuário é "ID@app.com". Extraímos apenas o ID antes do "@".
            val idFuncionario = usuarioAtual.email?.substringBefore("@") ?: ""
            
            // Busca o nome real do funcionário na coleção "funcionarios" do Firestore
            recuperarNomeDoFuncionario(idFuncionario)
        }

        // --- CONFIGURAÇÃO DOS BOTÕES DE NAVEGAÇÃO ---

        // Botão ÁREAS DE RISCO
        binding.buttonRiskArea.setOnClickListener {
            startActivity(Intent(this, Risk_Area_Activity::class.java))
        }

        // Botão EPI DANIFICADO
        binding.buttonEPIdanificado.setOnClickListener {
            startActivity(Intent(this, EpiDanificado::class.java))
        }

        // Botão RELATÓRIO / LOGS
        binding.buttonReport.setOnClickListener {
            startActivity(Intent(this, ReportActivity::class.java))
        }

        // BOTÃO SAIR (LOGOUT)
        binding.buttonBack.setOnClickListener {
            fazerLogout()
        }
    }

    /**
     * Consulta o Firestore para trocar o ID pelo nome real do funcionário.
     * Exemplo: De "Olá, 2714" para "Olá, Augusto".
     */
    private fun recuperarNomeDoFuncionario(id: String) {
        if (id.isEmpty()) return

        db.collection("funcionarios").document(id).get()
            .addOnSuccessListener { documento ->
                if (documento.exists()) {
                    val nomeReal = documento.getString("nome")
                    binding.tvUserName.text = "Olá, $nomeReal"
                } else {
                    // Se não encontrar no banco, mostra o ID como fallback
                    binding.tvUserName.text = "ID: $id"
                }
            }
            .addOnFailureListener { e ->
                // Em caso de erro de rede ou permissão, mostra apenas o ID
                Log.e("FIRESTORE_ERROR", "Erro ao buscar nome: ${e.message}")
                binding.tvUserName.text = "ID: $id"
            }
    }

    /**
     * Desloga o usuário do Firebase e retorna para a tela de Login.
     */
    private fun fazerLogout() {
        auth.signOut() // Encerra a sessão no servidor do Firebase

        // Redireciona para MainActivity
        val intent = Intent(this, MainActivity::class.java)
        // Essas flags removem a tela Welcome do histórico
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK)
        startActivity(intent)
        finish() // Encerra a atividade atual
    }
}
