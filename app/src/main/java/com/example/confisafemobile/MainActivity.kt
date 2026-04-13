package com.example.confisafemobile

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.confisafemobile.databinding.ActivityLoginBinding
import com.google.firebase.auth.FirebaseAuth

/**
 * PONTO DE ENTRADA DO APP: Tela de Login.
 * Responsável pela autenticação do funcionário via Firebase.
 */
class MainActivity : AppCompatActivity() {

    // ViewBinding: Forma moderna de acessar os IDs do XML sem usar findViewById
    private lateinit var binding: ActivityLoginBinding
    
    // FirebaseAuth: Motor de autenticação do Google
    private lateinit var auth: FirebaseAuth

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Inicializa o layout usando ViewBinding
        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // Inicializa o Firebase Auth
        auth = FirebaseAuth.getInstance()

        // VERIFICAÇÃO AUTOMÁTICA: Se o usuário já estiver logado, pula direto para a Welcome
        if (auth.currentUser != null) {
            irParaWelcome()
        }

        // CONFIGURAÇÃO DO BOTÃO LOGIN
        binding.buttonLogin.setOnClickListener {
            executarProcessoDeLogin()
        }
    }

    /**
     * Valida os campos e tenta realizar a autenticação no Firebase.
     */
    private fun executarProcessoDeLogin() {
        // .trim() remove espaços vazios acidentais no início ou fim
        val idFuncionario = binding.editTextUsername.text.toString().trim()
        val senha = binding.editTextPassword.text.toString().trim()

        // VALIDAÇÃO BÁSICA: Impede o envio de campos vazios para o servidor
        if (idFuncionario.isEmpty() || senha.isEmpty()) {
            Toast.makeText(this, "Por favor, preencha o ID e a Senha", Toast.LENGTH_SHORT).show()
            return
        }

        // INDICADOR DE CARREGAMENTO: Desabilita o botão para evitar cliques duplos
        binding.buttonLogin.isEnabled = false
        
        /**
         * LÓGICA DO ID -> E-MAIL:
         * Como o Firebase Auth exige um e-mail, transformamos o ID numérico (ex: 5050)
         * em um formato de e-mail invisível (ex: 5050@app.com).
         */
        val emailFormatado = "$idFuncionario@app.com"

        // TENTA O LOGIN NO FIREBASE
        auth.signInWithEmailAndPassword(emailFormatado, senha)
            .addOnCompleteListener(this) { tarefa ->
                // Reabilita o botão independente do resultado
                binding.buttonLogin.isEnabled = true

                if (tarefa.isSuccessful) {
                    // LOGIN SUCESSO
                    Toast.makeText(this, "Bem-vindo(a)!", Toast.LENGTH_SHORT).show()
                    irParaWelcome()
                } else {
                    // LOGIN FALHOU (Senha errada ou ID não cadastrado)
                    Toast.makeText(this, "ID ou Senha incorretos.", Toast.LENGTH_SHORT).show()
                }
            }
    }

    /**
     * Navega para a tela principal e limpa a pilha de navegação.
     * Isso impede que o usuário volte ao login apertando o botão "Voltar".
     */
    private fun irParaWelcome() {
        val intent = Intent(this, Welcome::class.java)
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK)
        startActivity(intent)
        finish() // Encerra esta Activity
    }
}
