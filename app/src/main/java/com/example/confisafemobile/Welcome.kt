package com.example.confisafemobile

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.example.confisafemobile.databinding.ActivityWelcomeBinding
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import android.app.AlertDialog
import android.util.Log
import android.widget.Toast
import kotlin.math.max

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
            //seedFuncionariosComSenhaAno()
        }

        binding.buttonReport.setOnClickListener {
            startActivity(Intent(this, ReportActivity::class.java))
        }

    }

//    Nome	Usuário (ID)	Email (Login)	Senha Gerada
//    Augusto	2714	2714@app.com	141414
//    Tibério	1437	1437@app.com	373737
//    Calígula	3741	3741@app.com	414141
//    Cláudio	4154	4154@app.com	545454
//    Nero	5468	5468@app.com	686868
//    Vespasiano	6979	6979@app.com	797979
//    Tito	7981	7981@app.com	818181
//    Domiciano	8196	8196@app.com	969696
//    Trajano	9817	9817@app.com	117117
//    Adriano	1138	1138@app.com	138138

//    // --- FUNÇÃO DE SEED (SENHAS PELO ANO + BANCO LIMPO) ---
//    private fun seedFuncionariosComSenhaAno() {
//        val auth = FirebaseAuth.getInstance()
//        val db = FirebaseFirestore.getInstance()
//        val batch = db.batch()
//
//        val lista = listOf(
//            Triple("Augusto", "2714", "14"),
//            Triple("Tibério", "1437", "37"),
//            Triple("Calígula", "3741", "41"),
//            Triple("Cláudio", "4154", "54"),
//            Triple("Nero", "5468", "68"),
//            Triple("Vespasiano", "6979", "79"),
//            Triple("Tito", "7981", "81"),
//            Triple("Domiciano", "8196", "96"),
//            Triple("Trajano", "9817", "117"),
//            Triple("Adriano", "1138", "138")
//        )
//
//        val logFinal = StringBuilder()
//        var pending = lista.size
//        var created = 0
//
//        // Função que gera senha repetindo o ano (ex: 14 -> 141414)
//        fun gerarSenha(ano: String): String {
//            val sb = StringBuilder()
//            while (sb.length < 6) sb.append(ano)
//            return sb.toString().substring(0, 6)
//        }
//
//        fun finalizarProcesso() {
//            batch.commit().addOnCompleteListener {
//                val resultadoTexto = logFinal.toString()
//                Log.d("SEED_RESULT", "\n$resultadoTexto")
//
//                if (!isFinishing) {
//                    AlertDialog.Builder(this@Welcome)
//                        .setTitle("Copie seus dados:")
//                        .setMessage(resultadoTexto)
//                        .setPositiveButton("OK", null)
//                        .show()
//                }
//                Toast.makeText(this@Welcome, "Concluído! $created criados.", Toast.LENGTH_SHORT).show()
//            }
//        }
//
//        for ((nome, id, ano) in lista) {
//            val email = "$id@app.com"
//            val senhaDoAno = gerarSenha(ano) // Gera a senha única
//
//            auth.createUserWithEmailAndPassword(email, senhaDoAno)
//                .addOnCompleteListener { task ->
//                    // Mostra a senha REAL no alerta, mas NÃO salva no banco
//                    logFinal.append("func: $nome\nuser: $id\nsenha: $senhaDoAno\n\n")
//
//                    if (task.isSuccessful) {
//                        val docRef = db.collection("funcionarios").document(id)
//                        // Salva SÓ O NOME no banco, mantendo limpo
//                        val dadosLimpos = hashMapOf("nome" to nome)
//                        batch.set(docRef, dadosLimpos)
//                        created++
//                    }
//                    pending--
//                    if (pending == 0) finalizarProcesso()
//                }
//        }
//    }
}