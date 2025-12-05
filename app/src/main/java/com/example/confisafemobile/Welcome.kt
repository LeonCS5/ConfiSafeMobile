package com.example.confisafemobile

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.example.confisafemobile.databinding.ActivityWelcomeBinding
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore

class Welcome : AppCompatActivity() {

    private lateinit var binding: ActivityWelcomeBinding
    private lateinit var auth: FirebaseAuth

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityWelcomeBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // Inicializa a ferramenta de login do Google (Firebase)
        auth = FirebaseAuth.getInstance() // Inicializa Auth
        val db = FirebaseFirestore.getInstance() // Inicializa Banco de Dados

        val usuarioAtual = auth.currentUser

        // --- PARTE DO NOME ---
        if (usuarioAtual != null) {
            val idFuncionario = usuarioAtual.email?.substringBefore("@") ?: ""

            db.collection("funcionarios").document(idFuncionario).get()
                .addOnSuccessListener { documento ->
                    if (documento.exists()) {
                        val nomeReal = documento.getString("nome")
                        binding.tvUserName.text = "Olá, $nomeReal"
                    } else {
                        binding.tvUserName.text = "Func: $idFuncionario"
                    }
                }
                .addOnFailureListener {
                    binding.tvUserName.text = "Func: $idFuncionario"
                }
        }
        // --- FIM DA PARTE DO NOME ---

        // Botão de logout
        binding.buttonBack.setOnClickListener {
            auth.signOut() // Desloga

            val intent = Intent(this, MainActivity::class.java)
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK)
            startActivity(intent)
            finish()
        }

        // Ações dos outros botões
        binding.buttonRiskArea.setOnClickListener {
            startActivity(Intent(this, Risk_Area_Activity::class.java))
        }

        binding.buttonEPIdanificado.setOnClickListener {
            startActivity(Intent(this, EpiDanificado::class.java))
            //enviarTUDOdoDataSource()
        }
    }

//    private fun enviarTUDOdoDataSource() {
//        val db = com.google.firebase.firestore.FirebaseFirestore.getInstance()
//        val batch = db.batch()
//
//        // LISTA GERAL (Coloca aqui todos os teus EPIs misturados)
//        val listaMestra = listOf(
//
//            // --- ÁREA: CALDEIRA ---
//            Triple("Capacete", "ic_construction", "caldeira"),
//            // --- ÁREA: CAMARA FRIA ---
//            Triple("Jaqueta Térmica", "ic_health_and_safety", "camara_fria"),
//            // --- ÁREA: TANQUE ---
//            Triple("Capacete com Protetor Facial", "ic_construction", "tanque"),
//        )
//
//        // O código abaixo faz o trabalho pesado sozinho
//        for (item in listaMestra) {
//            val novoDoc = db.collection("epis").document()
//            val dados = hashMapOf(
//                "nome" to item.first,
//                "icone" to item.second, // Nome do arquivo sem R.drawable
//                "areaId" to item.third  // O ID que liga à tela anterior
//            )
//            batch.set(novoDoc, dados)
//        }
//
//        batch.commit()
//            .addOnSuccessListener {
//                android.widget.Toast.makeText(this, "SUCESSO! Base de dados completa atualizada.", android.widget.Toast.LENGTH_LONG).show()
//            }
//            .addOnFailureListener { e ->
//                android.widget.Toast.makeText(this, "Erro: ${e.message}", android.widget.Toast.LENGTH_LONG).show()
//            }
//    }

}