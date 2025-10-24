package com.example.confisafemobile

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.example.confisafemobile.databinding.ActivityLoginBinding

class MainActivity : AppCompatActivity() {

    // Declara a variável para o View Binding, que conecta o layout ao código.
    private lateinit var binding: ActivityLoginBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // 1. CORRETO: Carrega o layout da tela de login (activity_login.xml)
        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // 2. CORRETO: Acessa o botão 'buttonLogin', que EXISTE no layout de login
        binding.buttonLogin.setOnClickListener {
            // Cria uma "intenção" (Intent) para abrir a tela Risk_Area_Activity.
            val intent = Intent(this, Risk_Area_Activity::class.java)

            // Executa a intenção, abrindo a nova tela.
            startActivity(intent)
        }
    }
}