// app/src/main/java/com/example/confisafemobile/Risk_Area_Activity.kt
package com.example.confisafemobile

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.confisafemobile.adapter.RiskAreaAdapter
import com.example.confisafemobile.databinding.ActivityRiskAreaBinding // <— ajuste se o nome do layout for outro
import com.example.confisafemobile.model.DataSource

class Risk_Area_Activity : AppCompatActivity() {

    private lateinit var binding: ActivityRiskAreaBinding
    private lateinit var adapter: RiskAreaAdapter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityRiskAreaBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // seta voltar (opcional)
        binding.backArrow.setOnClickListener { onBackPressedDispatcher.onBackPressed() }

        // Adapter com clique que abre a tela de EPIs passando os extras
        adapter = RiskAreaAdapter { area ->
            val i = Intent(this, EpiListActivity::class.java).apply {
                putExtra(EpiListActivity.EXTRA_AREA_ID, area.id)     // ex.: "caldeira" | "camara_fria" | "tanque"
                putExtra(EpiListActivity.EXTRA_AREA_NAME, area.name) // ex.: "Caldeira"
            }
            startActivity(i)
        }

        binding.rvRiskAreas.layoutManager = LinearLayoutManager(this)
        binding.rvRiskAreas.adapter = adapter
        adapter.submitList(DataSource.loadRiskAreas())
    }
}

