package com.example.confisafemobile

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.confisafemobile.databinding.ActivityLoginBinding
import com.google.firebase.auth.FirebaseAuth

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityLoginBinding
    private lateinit var auth: FirebaseAuth

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Configura o layout
        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // Inicializa a ferramenta de login do Google (Firebase)
        auth = FirebaseAuth.getInstance()

        // Quando clicar no botão LOGIN
        binding.buttonLogin.setOnClickListener {

            // 1. Pega o que foi digitado
            val idFuncionario = binding.editTextUsername.text.toString().trim()
            val senha = binding.editTextPassword.text.toString().trim()

            // 2. Verifica se não está vazio
            if (idFuncionario.isEmpty() || senha.isEmpty()) {
                Toast.makeText(this, "Preencha o ID e a Senha", Toast.LENGTH_SHORT).show()
            } else {
                // 3. O TRUQUE DO E-MAIL INVISÍVEL
                // O usuário digitou "5050", nós transformamos em "5050@app.com"
                // Isso tem que ser IGUAL ao final que você usou no site do Firebase
                val emailFormatado = "$idFuncionario@app.com"

                // 4. Tenta entrar
                realizarLogin(emailFormatado, senha)
            }
        }
    }

    private fun realizarLogin(email: String, pass: String) {
        auth.signInWithEmailAndPassword(email, pass)
            .addOnCompleteListener(this) { tarefa ->
                if (tarefa.isSuccessful) {
                    // SUCESSO!
                    Toast.makeText(this, "Login Aprovado!", Toast.LENGTH_SHORT).show()

                    // Vai para a tela de Boas-vindas
                    val intent = Intent(this, Welcome::class.java)
                    // As linhas abaixo impedem que o usuário volte ao login se apertar "Voltar"
                    intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK)
                    startActivity(intent)

                } else {
                    // ERRO!
                    Toast.makeText(this, "ID ou Senha incorretos.", Toast.LENGTH_SHORT).show()
                }
            }
    }
}
