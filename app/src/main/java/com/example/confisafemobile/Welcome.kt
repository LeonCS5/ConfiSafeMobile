package com.example.confisafemobile

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.example.confisafemobile.databinding.ActivityWelcomeBinding

class Welcome : AppCompatActivity() {

    private lateinit var binding: ActivityWelcomeBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityWelcomeBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // Voltar para a tela anterior (login)
        binding.buttonBack.setOnClickListener {
            onBackPressedDispatcher.onBackPressed()
        }

        // Ações principais da tela
        binding.buttonRiskArea.setOnClickListener {
            startActivity(Intent(this, Risk_Area_Activity::class.java))
        }
        binding.buttonEPIdanificado.setOnClickListener {
            startActivity(Intent(this, EpiDanificado::class.java))
        }
//        binding.buttonReport.setOnClickListener {
//            startActivity(Intent(this, ReportAccidentActivity::class.java))
//        }
    }
}
