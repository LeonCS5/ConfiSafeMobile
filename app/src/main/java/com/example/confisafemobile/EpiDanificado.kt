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

/**
 * TELA DE REPORTE DE EPI DANIFICADO:
 * Permite ao funcionário registrar um equipamento que precisa de substituição.
 * Possui lógica de "Spinners Cascatas" (Selecionar Área -> Filtrar EPIs).
 */
class EpiDanificado : AppCompatActivity() {

    private lateinit var binding: ActivityEpiDanificadoBinding
    private var photoUri: Uri? = null // Guarda o caminho da foto selecionada (se houver)
    
    // Instâncias do Firebase
    private val db = FirebaseFirestore.getInstance()
    private val auth = FirebaseAuth.getInstance()

    /**
     * Modelo de dados interno para facilitar a gestão do Spinner de Áreas.
     * Guardamos o ID (para o banco) e o Nome (para o usuário).
     */
    data class AreaSimples(val id: String, val nome: String) {
        override fun toString(): String = nome // O Spinner usa o toString() para exibir o texto
    }

    // Lista que armazenará as áreas vindas do Firestore
    private val listaAreas = mutableListOf<AreaSimples>()

    // Contrato para selecionar imagem da galeria (Forma moderna de Intent.ACTION_PICK)
    private val pickImage = registerForActivityResult(ActivityResultContracts.GetContent()) { uri ->
        uri?.let {
            photoUri = it
            binding.ivPreview.setImageURI(it) // Mostra a miniatura da foto na tela
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityEpiDanificadoBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // --- CONFIGURAÇÃO DE CLIQUES ---
        binding.backArrow.setOnClickListener { finish() }
        binding.btnAddFoto.setOnClickListener { pickImage.launch("image/*") }
        binding.btnEnviar.setOnClickListener { validarEEnviarRelatorio() }

        // Inicializa o processo de carregamento de dados
        carregarAreasDoBanco()
    }

    /**
     * Busca todas as áreas cadastradas para preencher o primeiro Spinner.
     */
    private fun carregarAreasDoBanco() {
        db.collection("areas").get()
            .addOnSuccessListener { documentos ->
                listaAreas.clear()
                // Opção padrão instrutiva
                listaAreas.add(AreaSimples("", "Selecione a Área..."))

                for (doc in documentos) {
                    val id = doc.getString("id") ?: doc.id
                    val nome = doc.getString("nome") ?: "Sem Nome"
                    listaAreas.add(AreaSimples(id, nome))
                }

                configurarSpinnerAreas()
            }
            .addOnFailureListener { e ->
                Log.e("FIRESTORE_ERROR", "Erro ao carregar áreas: ${e.message}")
                Toast.makeText(this, "Erro ao carregar lista de áreas.", Toast.LENGTH_SHORT).show()
            }
    }

    /**
     * Define o comportamento do Spinner de Áreas.
     * Quando uma área é selecionada, o segundo Spinner (EPIs) é filtrado automaticamente.
     */
    private fun configurarSpinnerAreas() {
        val adapter = ArrayAdapter(this, android.R.layout.simple_spinner_item, listaAreas)
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
        binding.inputArea.adapter = adapter

        binding.inputArea.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
            override fun onItemSelected(parent: AdapterView<*>?, view: View?, position: Int, id: Long) {
                val areaSelecionada = listaAreas[position]

                if (areaSelecionada.id.isNotEmpty()) {
                    // Busca EPIs que pertencem a esta área específica
                    carregarEpisVinculadosAArea(areaSelecionada.id)
                } else {
                    limparSpinnerEpis()
                }
            }
            override fun onNothingSelected(p0: AdapterView<*>?) {}
        }
    }

    /**
     * Busca na coleção "epis" apenas os itens que possuem o "areaId" correspondente.
     */
    private fun carregarEpisVinculadosAArea(areaId: String) {
        db.collection("epis")
            .whereEqualTo("areaId", areaId)
            .get()
            .addOnSuccessListener { documentos ->
                val nomesEpis = mutableListOf<String>()
                for (doc in documentos) {
                    nomesEpis.add(doc.getString("nome") ?: "EPI sem nome")
                }
                atualizarSpinnerEpis(nomesEpis)
            }
            .addOnFailureListener {
                Toast.makeText(this, "Erro ao buscar equipamentos desta área.", Toast.LENGTH_SHORT).show()
            }
    }

    private fun limparSpinnerEpis() {
        atualizarSpinnerEpis(listOf("Selecione a Área primeiro"))
    }

    private fun atualizarSpinnerEpis(lista: List<String>) {
        val listaFinal = if (lista.isNotEmpty()) lista else listOf("Nenhum EPI cadastrado aqui")
        val adapter = ArrayAdapter(this, android.R.layout.simple_spinner_item, listaFinal)
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
        binding.inputEpi.adapter = adapter
    }

    /**
     * Coleta os dados do formulário, valida e salva no Firestore.
     */
    private fun validarEEnviarRelatorio() {
        val areaObjeto = binding.inputArea.selectedItem as? AreaSimples
        val epiNome = binding.inputEpi.selectedItem?.toString() ?: ""
        val descricao = binding.inputDescricao.text?.toString().orEmpty()

        // VALIDAÇÃO: Impede envios incompletos
        if (areaObjeto == null || areaObjeto.id.isEmpty()) {
            Toast.makeText(this, "Por favor, selecione uma Área.", Toast.LENGTH_SHORT).show()
            return
        }

        // Lógica para pegar o valor do RadioGroup (Gravidade)
        val gravidade = when (binding.rgGravity.checkedRadioButtonId) {
            binding.rbHigh.id -> "Alta"
            binding.rbMed.id  -> "Média"
            binding.rbLow.id  -> "Baixa"
            else              -> "Média" // Valor padrão
        }

        val usuario = auth.currentUser

        // Monta o mapa de dados para o banco
        val relatorio = hashMapOf(
            "areaId" to areaObjeto.id,
            "areaNome" to areaObjeto.nome,
            "epi" to epiNome,
            "descricao" to descricao,
            "gravidade" to gravidade,
            "userId" to (usuario?.uid ?: "Desconhecido"),
            "userEmail" to (usuario?.email ?: "Desconhecido"),
            "data" to FieldValue.serverTimestamp(), // Usa a hora do servidor do Google
            "status" to "Pendente",
            "temFoto" to (photoUri != null)
        )

        // Desabilita o botão para evitar envio duplo
        binding.btnEnviar.isEnabled = false

        db.collection("relatorios_epis_danificados").add(relatorio)
            .addOnSuccessListener {
                Toast.makeText(this, "Registro enviado com sucesso!", Toast.LENGTH_LONG).show()
                finish() // Fecha a tela e volta ao menu
            }
            .addOnFailureListener { e ->
                binding.btnEnviar.isEnabled = true
                Log.e("FIRESTORE_ERROR", "Erro ao salvar relatório: ${e.message}")
                Toast.makeText(this, "Erro ao enviar. Verifique sua internet.", Toast.LENGTH_SHORT).show()
            }
    }
}
