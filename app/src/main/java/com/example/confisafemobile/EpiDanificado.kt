package com.example.confisafemobile

import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.confisafemobile.databinding.ActivityEpiDanificadoBinding
import com.example.confisafemobile.model.Epi
import com.example.confisafemobile.ui.EpiAdapter

class EpiDanificado : AppCompatActivity() {

    private lateinit var binding: ActivityEpiDanificadoBinding
    private val adapter by lazy { EpiAdapter() }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityEpiDanificadoBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // Navegação
        binding.backArrow.setOnClickListener {
            onBackPressedDispatcher.onBackPressed()
        }

        // Lista
        binding.rvEpiDanificado.layoutManager = LinearLayoutManager(this)
        binding.rvEpiDanificado.adapter = adapter

        // EPIs básicos (você pode puxar de um DataSource depois)
        val lista = listOf(
            Epi("Capacete",                R.drawable.ic_construction),
            Epi("Óculos de Proteção",     R.drawable.ic_goggles),         // use ic_eyeglasses se preferir
            Epi("Luvas de Proteção",      R.drawable.ic_back_hand),
            Epi("Respirador",             R.drawable.ic_air_purifier),
            Epi("Detector de Gases",      R.drawable.ic_gas_meter),
            Epi("Cinto de Segurança",     R.drawable.ic_safety_check),
        )
        adapter.submitList(lista)

        // Botões (placeholder)
        binding.buttonAddPhoto.setOnClickListener {
            Toast.makeText(this, "Adicionar foto (TODO)", Toast.LENGTH_SHORT).show()
        }
        binding.buttonReportDamaged.setOnClickListener {
            Toast.makeText(this, "Reportar EPI danificado (TODO)", Toast.LENGTH_SHORT).show()
        }
    }
}
