package com.example.confisafemobile

import android.content.Intent
import android.os.Bundle
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.example.confisafemobile.databinding.ActivityLoginBinding
import com.example.confisafemobile.databinding.ActivityWelcomeBinding

class Welcome : AppCompatActivity() {

    private lateinit var binding: ActivityWelcomeBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityWelcomeBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.buttonBack.setOnClickListener {
            val intent = Intent(this, Risk_Area_Activity::class.java)

            // Executa a intenção, abrindo a nova tela.
            startActivity(intent)
        }
    }
}