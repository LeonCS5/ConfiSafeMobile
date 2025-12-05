// app/src/main/java/com/example/confisafemobile/Risk_Area_Activity.kt
package com.example.confisafemobile

import android.content.Intent
import android.os.Bundle
import android.widget.Toast // Import necessário para mensagens de erro
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.confisafemobile.adapter.RiskAreaAdapter
import com.example.confisafemobile.databinding.ActivityRiskAreaBinding
import com.example.confisafemobile.model.RiskArea // Importante: certifique-se que este import está aqui
// import com.example.confisafemobile.model.DataSource <-- Não precisamos mais deste
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore

class Risk_Area_Activity : AppCompatActivity() {

    private lateinit var binding: ActivityRiskAreaBinding
    private lateinit var adapter: RiskAreaAdapter
    private lateinit var auth: FirebaseAuth

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityRiskAreaBinding.inflate(layoutInflater)
        setContentView(binding.root)

        auth = FirebaseAuth.getInstance()
        val db = FirebaseFirestore.getInstance() // Inicializa Banco de Dados

        val usuarioAtual = auth.currentUser

        // --- PARTE DO NOME (MANTIDA IGUAL) ---
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
        // --- FIM DA PARTE DO NOME ---

        // seta voltar
        binding.backArrow.setOnClickListener { onBackPressedDispatcher.onBackPressed() }

        // Adapter com clique que abre a tela de EPIs passando os extras
        adapter = RiskAreaAdapter { area ->
            val i = Intent(this, EpiListActivity::class.java).apply {
                putExtra(EpiListActivity.EXTRA_AREA_ID, area.id)
                putExtra(EpiListActivity.EXTRA_AREA_NAME, area.name)
            }
            startActivity(i)
        }

        binding.rvRiskAreas.layoutManager = LinearLayoutManager(this)
        binding.rvRiskAreas.adapter = adapter

        // --- MUDANÇA AQUI: SUBSTITUÍMOS O DATASOURCE PELO FIREBASE ---

        // Vai buscar a coleção "areas" que você criou no site
        db.collection("areas")
            .get()
            .addOnSuccessListener { documentos ->

                val listaDeAreas = mutableListOf<RiskArea>()

                for (doc in documentos) {
                    // Pega os campos do documento
                    val id = doc.getString("id") ?: ""
                    val nome = doc.getString("nome") ?: "Sem Nome"

                    // Adiciona à lista
                    listaDeAreas.add(RiskArea(id, nome))
                }

                if (listaDeAreas.isEmpty()) {
                    Toast.makeText(this, "Nenhuma área encontrada.", Toast.LENGTH_SHORT).show()
                }

                // Atualiza o RecyclerView com a lista que veio da nuvem
                adapter.submitList(listaDeAreas)
            }
            .addOnFailureListener { e ->
                Toast.makeText(this, "Erro ao carregar áreas: ${e.message}", Toast.LENGTH_LONG).show()
            }
    }
}