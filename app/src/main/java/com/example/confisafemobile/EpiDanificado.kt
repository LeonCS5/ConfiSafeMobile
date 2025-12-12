package com.example.confisafemobile

import android.net.Uri
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.AdapterView
import android.widget.ArrayAdapter
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import com.example.confisafemobile.databinding.ActivityEpiDanificadoBinding
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FieldValue
import com.google.firebase.firestore.FirebaseFirestore

class EpiDanificado : AppCompatActivity() {

    private lateinit var binding: ActivityEpiDanificadoBinding
    private var photoUri: Uri? = null
    private val db = FirebaseFirestore.getInstance()
    private val auth = FirebaseAuth.getInstance()

    // Vamos guardar objetos simples para saber o ID da área selecionada
    data class AreaSimples(val id: String, val nome: String) {
        override fun toString(): String = nome // Para aparecer bonito no Spinner
    }

    // Lista para guardar as áreas carregadas
    private val listaAreas = mutableListOf<AreaSimples>()

    private val pickImage = registerForActivityResult(ActivityResultContracts.GetContent()) { uri ->
        uri?.let {
            photoUri = it
            binding.ivPreview.setImageURI(it)
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityEpiDanificadoBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.backArrow.setOnClickListener { finish() }
        binding.btnAddFoto.setOnClickListener { pickImage.launch("image/*") }

        // 1. Carrega as áreas (Igualzinho ao Risk_Area_Activity)
        carregarAreas()

        binding.btnEnviar.setOnClickListener {
            enviarRelatorio()
        }
    }

    private fun carregarAreas() {
        // Busca na coleção "areas"
        db.collection("areas").get()
            .addOnSuccessListener { documentos ->
                listaAreas.clear()

                // Adiciona uma opção padrão "falsa"
                listaAreas.add(AreaSimples("", "Selecione a Área..."))

                for (doc in documentos) {
                    val id = doc.getString("id") ?: doc.id // Tenta pegar o campo 'id', senão usa o ID do doc
                    val nome = doc.getString("nome") ?: "Sem Nome"
                    listaAreas.add(AreaSimples(id, nome))
                }

                configurarSpinnerAreas()
            }
            .addOnFailureListener {
                Toast.makeText(this, "Erro ao carregar áreas.", Toast.LENGTH_SHORT).show()
            }
    }

    private fun configurarSpinnerAreas() {
        val adapter = ArrayAdapter(this, android.R.layout.simple_spinner_item, listaAreas)
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
        binding.inputArea.adapter = adapter

        // OUVINTE: Quando mudar a área, busca os EPIs daquela área específica
        binding.inputArea.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
            override fun onItemSelected(parent: AdapterView<*>?, view: View?, position: Int, id: Long) {
                val areaSelecionada = listaAreas[position]

                if (areaSelecionada.id.isNotEmpty()) {
                    // Se selecionou uma área válida, busca os EPIs dela na coleção separada
                    carregarEpisDaArea(areaSelecionada.id)
                } else {
                    // Se selecionou "Selecione...", limpa o segundo spinner
                    limparSpinnerEpis()
                }
            }
            override fun onNothingSelected(p0: AdapterView<*>?) {}
        }
    }

    private fun carregarEpisDaArea(areaId: String) {
        // AQUI ESTÁ A MÁGICA QUE FALTAVA:
        // Busca na coleção "epis" onde "areaId" é igual ao ID selecionado
        // (Exatamente a mesma lógica do seu EpiListActivity)

        db.collection("epis")
            .whereEqualTo("areaId", areaId)
            .get()
            .addOnSuccessListener { documentos ->
                val nomesEpis = mutableListOf<String>()

                for (doc in documentos) {
                    val nomeEpi = doc.getString("nome") ?: "EPI sem nome"
                    nomesEpis.add(nomeEpi)
                }

                atualizarSpinnerEpis(nomesEpis)
            }
            .addOnFailureListener {
                Toast.makeText(this, "Erro ao carregar EPIs.", Toast.LENGTH_SHORT).show()
            }
    }

    private fun limparSpinnerEpis() {
        atualizarSpinnerEpis(listOf("Selecione a Área primeiro"))
    }

    private fun atualizarSpinnerEpis(lista: List<String>) {
        val listaFinal = if (lista.isNotEmpty()) lista else listOf("Nenhum EPI encontrado nesta área")

        val adapter = ArrayAdapter(this, android.R.layout.simple_spinner_item, listaFinal)
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
        binding.inputEpi.adapter = adapter
    }

    private fun enviarRelatorio() {
        // Pega o objeto AreaSimples selecionado para ter acesso ao Nome e ID
        val areaObjeto = binding.inputArea.selectedItem as? AreaSimples
        val areaNome = areaObjeto?.nome ?: ""

        val epiNome = binding.inputEpi.selectedItem?.toString() ?: ""
        val desc = binding.inputDescricao.text?.toString().orEmpty()

        // Validação
        if (areaObjeto == null || areaObjeto.id.isEmpty() || epiNome == "Selecione a Área primeiro" || epiNome == "Nenhum EPI encontrado nesta área") {
            Toast.makeText(this, "Preencha a Área e o EPI corretamente.", Toast.LENGTH_SHORT).show()
            return
        }

        val grav = when (binding.rgGravity.checkedRadioButtonId) {
            binding.rbHigh.id -> "Alta"
            binding.rbMed.id  -> "Média"
            binding.rbLow.id  -> "Baixa"
            else              -> "Não informada"
        }

        val user = auth.currentUser

        val dados = hashMapOf(
            "areaId" to areaObjeto.id,  // Salva o ID da área
            "areaNome" to areaNome,     // Salva o Nome da área
            "epi" to epiNome,
            "descricao" to desc,
            "gravidade" to grav,
            "userId" to (user?.uid ?: ""),
            "userEmail" to (user?.email ?: ""),
            "data" to FieldValue.serverTimestamp(),
            "status" to "Pendente",
            "temFoto" to (photoUri != null)
        )

        db.collection("relatorios_epis_danificados").add(dados)
            .addOnSuccessListener {
                Toast.makeText(this, "Reporte enviado com sucesso!", Toast.LENGTH_LONG).show()
                finish()
            }
            .addOnFailureListener {
                Toast.makeText(this, "Erro ao enviar.", Toast.LENGTH_SHORT).show()
            }
    }
}