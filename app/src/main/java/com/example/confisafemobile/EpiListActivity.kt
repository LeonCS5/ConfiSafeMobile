package com.example.confisafemobile

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.example.confisafemobile.databinding.ActivityEpiListBinding

class EpiListActivity : AppCompatActivity() {

    // Prepara a variável para o View Binding.
    private lateinit var binding: ActivityEpiListBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Infla o layout 'activity_epi_list.xml' e o conecta a este código.
        binding = ActivityEpiListBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // Nos próximos passos, adicionaremos o código aqui para:
        // 1. Receber os dados da área de risco vindos da Risk_Area_Activity.
        // 2. Usar esses dados para exibir a lista de EPIs correta.
    }
}