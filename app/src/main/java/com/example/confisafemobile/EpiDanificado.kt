package com.example.confisafemobile

import android.net.Uri
import android.os.Bundle
import android.widget.ArrayAdapter
import android.widget.Spinner
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import com.example.confisafemobile.databinding.ActivityEpiDanificadoBinding

class EpiDanificado : AppCompatActivity() {

    private lateinit var binding: ActivityEpiDanificadoBinding
    private var photoUri: Uri? = null

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

        // Voltar
        binding.backArrow.setOnClickListener { onBackPressedDispatcher.onBackPressed() }

        // Dropdown de EPIs (ArrayAdapter padrão)
        val epis = arrayOf(
            "Capacete","Óculos de Proteção","Luvas de Proteção","Respirador",
            "Detector de Gases","Cinto de Segurança","Jaqueta Térmica","Calça Térmica",
            "Luvas Térmicas","Botas Térmicas","Gorro Térmico","Macacão Químico",
            "Luvas de PVC","Botas de Borracha"
        )
        val adapter = ArrayAdapter(this, android.R.layout.simple_spinner_item, epis)
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
        binding.inputEpi.adapter = adapter

        // Foto
        binding.btnAddFoto.setOnClickListener { pickImage.launch("image/*") }

        // Enviar
        binding.btnEnviar.setOnClickListener {
            val epi = binding.inputEpi.selectedItem.toString()
            val area = binding.inputArea.selectedItem.toString()
            val desc = binding.inputDescricao.text?.toString().orEmpty()
            val grav = when (binding.rgGravity.checkedRadioButtonId) {
                binding.rbHigh.id -> "Alta"
                binding.rbMed.id  -> "Média"
                binding.rbLow.id  -> "Baixa"
                else              -> ""
            }

            if (epi.isBlank() || area.isBlank() || desc.isBlank() || grav.isBlank()) {
                Toast.makeText(this, "Preencha todos os campos.", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            // TODO: enviar para backend
            Toast.makeText(this, "Enviado: $epi / $area / $grav", Toast.LENGTH_LONG).show()
            finish()
        }
    }
}

