package com.example.confisafemobile

import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.confisafemobile.databinding.ActivityEpiListBinding
import com.example.confisafemobile.model.Epi
import com.example.confisafemobile.ui.EpiAdapter
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore

class EpiListActivity : AppCompatActivity() {

    companion object {
        const val EXTRA_AREA_ID = "extra_area_id"
        const val EXTRA_AREA_NAME = "extra_area_name"
    }

    private lateinit var binding: ActivityEpiListBinding
    private val adapter by lazy { EpiAdapter() }

    // Inicializa o banco de dados
    private val db = FirebaseFirestore.getInstance()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityEpiListBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val auth = FirebaseAuth.getInstance()
        val usuarioAtual = auth.currentUser

        // --- LÓGICA DO NOME DO FUNCIONÁRIO ---
        if (usuarioAtual != null) {
            val idFuncionario = usuarioAtual.email?.substringBefore("@") ?: ""

            db.collection("funcionarios").document(idFuncionario).get()
                .addOnSuccessListener { documento ->
                    if (documento.exists()) {
                        val nomeReal = documento.getString("nome")
                        binding.tvUserName.text = "$nomeReal"
                    } else {
                        binding.tvUserName.text = "Func: $idFuncionario"
                    }
                }
                .addOnFailureListener {
                    binding.tvUserName.text = "Func: $idFuncionario"
                }
        }

        // Configura botão de voltar
        binding.backArrow.setOnClickListener { onBackPressedDispatcher.onBackPressed() }

        // Define o título da área
        val areaName = intent.getStringExtra(EXTRA_AREA_NAME) ?: "EPIs"
        binding.tvAreaName.text = "EPIs - $areaName"

        // Configura a lista (RecyclerView)
        binding.rvEpiList.layoutManager = LinearLayoutManager(this)
        binding.rvEpiList.adapter = adapter

        // Pega o ID da área selecionada (ex: "caldeira")
        val areaId = intent.getStringExtra(EXTRA_AREA_ID).orEmpty()

        // Verifica se temos uma área e busca no banco
        if (areaId.isNotEmpty()) {
            carregarEpisDoFirebase(areaId)
        } else {
            Toast.makeText(this, "Erro: Área não identificada", Toast.LENGTH_SHORT).show()
        }
    }

    private fun carregarEpisDoFirebase(areaId: String) {
        // Busca EPIs onde 'areaId' é igual à área atual
        db.collection("epis")
            .whereEqualTo("areaId", areaId)
            .get()
            .addOnSuccessListener { documentos ->

                val listaDeEpis = mutableListOf<Epi>()

                for (doc in documentos) {
                    val nome = doc.getString("nome") ?: "Sem Nome"
                    val nomeIcone = doc.getString("icone") ?: "ic_epi_placeholder"

                    // Converte o nome do ícone para imagem real
                    val iconId = getDrawableId(nomeIcone)

                    listaDeEpis.add(Epi(nome, iconId))
                }

                if (listaDeEpis.isEmpty()) {
                    Toast.makeText(this, "Nenhum EPI encontrado.", Toast.LENGTH_SHORT).show()
                }

                // Atualiza a lista na tabela
                adapter.submitList(listaDeEpis)
            }
            .addOnFailureListener { e ->
                Toast.makeText(this, "Erro ao carregar: ${e.message}", Toast.LENGTH_LONG).show()
            }
    }

    // Busca o ID da imagem pelo nome (texto)
    private fun getDrawableId(nomeDaImagem: String): Int {
        val id = resources.getIdentifier(nomeDaImagem, "drawable", packageName)
        // Retorna ícone padrão se não encontrar
        return if (id != 0) id else com.example.confisafemobile.R.drawable.ic_epi_placeholder
    }
}