package com.example.confisafemobile

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.confisafemobile.adapter.RiskAreaAdapter
import com.example.confisafemobile.databinding.ActivityWelcomeBinding
import com.example.confisafemobile.model.DataSource
import com.example.confisafemobile.model.RiskArea

class WelcomeActivity : AppCompatActivity() {

    // 1. Prepara as variáveis para o View Binding, o Adapter e para guardar a seleção.
    private lateinit var binding: ActivityWelcomeBinding
    private lateinit var riskAreaAdapter: RiskAreaAdapter
    private var selectedRiskArea: RiskArea? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // 2. Infla o layout 'activity_welcome.xml' usando View Binding.
        binding = ActivityWelcomeBinding.inflate(layoutInflater)
        setContentView(binding.root) // Usa a raiz do binding como a view da tela.

        // 3. Chama as funções para configurar a lista e os cliques.
        setupRecyclerView()
        setupClickListeners()

        // 4. Garante que o botão "Select" comece desabilitado.
        binding.buttonSelect.isEnabled = false
    }

    private fun setupRecyclerView() {
        // Inicializa o Adapter. A função passada define o que acontece
        // quando um item da lista é clicado.
        riskAreaAdapter = RiskAreaAdapter { clickedArea ->
            // Guarda a área de risco que o usuário selecionou.
            selectedRiskArea = clickedArea
            // Habilita o botão "Select", pois agora há uma seleção.
            binding.buttonSelect.isEnabled = true
        }

        // Conecta o RecyclerView do layout ao Adapter e define que a lista será vertical.
        binding.rvRiskAreas.adapter = riskAreaAdapter
        binding.rvRiskAreas.layoutManager = LinearLayoutManager(this)

        // Carrega os dados do nosso "banco de dados" e os envia para a lista.
        val riskAreas = DataSource.loadRiskAreas()
        riskAreaAdapter.submitList(riskAreas)
    }

    private fun setupClickListeners() {
        binding.backArrow.setOnClickListener {
            finish() // Fecha esta tela e volta para a anterior (Login).
        }

        binding.buttonSelect.setOnClickListener {
            // Esta lógica só executa se 'selectedRiskArea' não for nulo.
            selectedRiskArea?.let { area ->
                // Cria a intenção de abrir a tela da lista de EPIs.
                val intent = Intent(this, EpiListActivity::class.java).apply {
                    // "Empacota" o objeto da área selecionada para enviá-lo para a próxima tela.
                    putExtra("EXTRA_RISK_AREA", area)
                }
                startActivity(intent)
            }
        }

        binding.buttonReport.setOnClickListener {
            // Aqui virá a lógica para abrir a tela de Reporte de Acidente.
        }
    }
}