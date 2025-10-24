package com.example.confisafemobile

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.confisafemobile.adapter.RiskAreaAdapter
import com.example.confisafemobile.databinding.ActivityRiskAreaBinding
import com.example.confisafemobile.model.DataSource
import com.example.confisafemobile.model.RiskArea

class Risk_Area_Activity : AppCompatActivity() {

    private lateinit var binding: ActivityRiskAreaBinding
    private lateinit var riskAreaAdapter: RiskAreaAdapter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityRiskAreaBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setupRecyclerView()
        setupClickListeners()
    }

    private fun setupRecyclerView() {
        // Adapter que reage diretamente ao clique de cada área
        riskAreaAdapter = RiskAreaAdapter { clickedArea ->
            openEpiList(clickedArea)
        }

        binding.rvRiskAreas.apply {
            adapter = riskAreaAdapter
            layoutManager = LinearLayoutManager(this@Risk_Area_Activity)
        }

        val riskAreas = DataSource.loadRiskAreas()
        riskAreaAdapter.submitList(riskAreas)
    }

    private fun setupClickListeners() {
        binding.backArrow.setOnClickListener {
            finish()
        }

        binding.buttonReport.setOnClickListener {
            // abrir tela de report futuramente
        }
    }

    private fun openEpiList(area: RiskArea) {
        val intent = Intent(this, EpiListActivity::class.java).apply {
            putExtra("EXTRA_RISK_AREA", area)
        }
        startActivity(intent)
    }
}
