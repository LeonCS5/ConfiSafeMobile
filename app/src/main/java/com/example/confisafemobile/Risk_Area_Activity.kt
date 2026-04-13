package com.example.confisafemobile

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.confisafemobile.adapter.RiskAreaAdapter
import com.example.confisafemobile.databinding.ActivityRiskAreaBinding
import com.example.confisafemobile.model.RiskArea
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore

/**
 * TELA DE SELEÇÃO DE ÁREAS DE RISCO:
 * Lista todas as áreas cadastradas no Firestore. Ao clicar em uma área,
 * o usuário é direcionado para a lista de EPIs específicos daquele local.
 */
class Risk_Area_Activity : AppCompatActivity() {

    private lateinit var binding: ActivityRiskAreaBinding
    private lateinit var adapter: RiskAreaAdapter
    private lateinit var auth: FirebaseAuth
    private lateinit var db: FirebaseFirestore

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // Inicializa ViewBinding
        binding = ActivityRiskAreaBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // Inicializa instâncias do Firebase
        auth = FirebaseAuth.getInstance()
        db = FirebaseFirestore.getInstance()

        // --- CONFIGURAÇÃO DA UI ---
        configurarRecyclerView()
        configurarDadosDoUsuario()
        
        // --- NAVEGAÇÃO ---
        binding.backArrow.setOnClickListener { 
            // Usa o dispatcher moderno para voltar a tela
            onBackPressedDispatcher.onBackPressed() 
        }

        binding.buttonReport.setOnClickListener {
            startActivity(Intent(this, ReportActivity::class.java))
        }

        // --- CARREGAMENTO DE DADOS ---
        buscarAreasNoFirestore()
    }

    /**
     * Recupera o e-mail do usuário logado e busca o nome real no banco.
     */
    private fun configurarDadosDoUsuario() {
        val usuarioAtual = auth.currentUser
        if (usuarioAtual != null) {
            val idFuncionario = usuarioAtual.email?.substringBefore("@") ?: ""

            db.collection("funcionarios").document(idFuncionario).get()
                .addOnSuccessListener { documento ->
                    if (documento.exists()) {
                        val nomeReal = documento.getString("nome")
                        binding.tvUserName.text = nomeReal
                    } else {
                        binding.tvUserName.text = "Func: $idFuncionario"
                    }
                }
                .addOnFailureListener {
                    binding.tvUserName.text = "Func: $idFuncionario"
                }
        }
    }

    /**
     * Prepara a lista (RecyclerView) e define o que acontece ao clicar em um item.
     */
    private fun configurarRecyclerView() {
        // Inicializa o adapter com uma função de clique (lambda)
        adapter = RiskAreaAdapter { area ->
            // Ao clicar, abre a EpiListActivity passando o ID e Nome da área via Intent
            val intent = Intent(this, EpiListActivity::class.java).apply {
                putExtra(EpiListActivity.EXTRA_AREA_ID, area.id)
                putExtra(EpiListActivity.EXTRA_AREA_NAME, area.name)
            }
            startActivity(intent)
        }

        // Define o gerenciador de layout (Lista Vertical)
        binding.rvRiskAreas.layoutManager = LinearLayoutManager(this)
        binding.rvRiskAreas.adapter = adapter
    }

    /**
     * Busca a coleção "areas" na nuvem.
     * Cada documento representa um setor da empresa (Ex: Elétrica, Altura).
     */
    private fun buscarAreasNoFirestore() {
        db.collection("areas")
            .get()
            .addOnSuccessListener { documentos ->
                val listaDeAreas = mutableListOf<RiskArea>()

                for (doc in documentos) {
                    // Mapeia os dados do Firebase para o objeto RiskArea do Kotlin
                    val id = doc.getString("id") ?: ""
                    val nome = doc.getString("nome") ?: "Área sem Nome"
                    listaDeAreas.add(RiskArea(id, nome))
                }

                if (listaDeAreas.isEmpty()) {
                    Toast.makeText(this, "Nenhuma área cadastrada no sistema.", Toast.LENGTH_SHORT).show()
                }

                // Envia a lista para o adapter atualizar a tela automaticamente
                adapter.submitList(listaDeAreas)
            }
            .addOnFailureListener { e ->
                Log.e("FIRESTORE_ERROR", "Erro ao carregar áreas: ${e.message}")
                Toast.makeText(this, "Falha na conexão com o banco de dados.", Toast.LENGTH_SHORT).show()
            }
    }
}
