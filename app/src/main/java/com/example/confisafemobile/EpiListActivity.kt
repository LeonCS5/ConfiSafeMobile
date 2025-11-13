package com.example.confisafemobile

import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.confisafemobile.databinding.ActivityEpiListBinding
import com.example.confisafemobile.model.DataSource
import com.example.confisafemobile.ui.EpiAdapter

class EpiListActivity : AppCompatActivity() {

    companion object {
        const val EXTRA_AREA_ID = "extra_area_id"
        const val EXTRA_AREA_NAME = "extra_area_name"
    }

    private lateinit var binding: ActivityEpiListBinding
    private val adapter by lazy { EpiAdapter() }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityEpiListBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // Navegação (seta voltar)
        binding.backArrow.setOnClickListener { onBackPressedDispatcher.onBackPressed() }

        // Título da seção com o nome da área
        val areaName = intent.getStringExtra(EXTRA_AREA_NAME) ?: "EPIs"
        binding.tvAreaName.text = "EPIs - $areaName"

        // (Opcional) nome do usuário no topo; pode esconder se não tiver
        binding.textUserName.visibility = View.GONE

        // Recycler
        binding.rvEpiList.layoutManager = LinearLayoutManager(this)
        binding.rvEpiList.adapter = adapter

        val areaId = intent.getStringExtra(EXTRA_AREA_ID).orEmpty()
        val epis = DataSource.getEpisFor(areaId)

        if (epis.isEmpty()) {
            Toast.makeText(this, "Sem EPIs cadastrados para: $areaId", Toast.LENGTH_SHORT).show()
        }
        adapter.submitList(epis)
    }
}
