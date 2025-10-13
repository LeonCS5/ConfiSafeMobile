package com.example.confisafemobile.model

import com.example.confisafemobile.R // Importante para acessar os drawables

object DataSource {

    // Nosso único ícone "coringa" para absolutamente tudo.
    private val PLACEHOLDER_ICON = R.drawable.ic_epi_placeholder

    fun loadRiskAreas(): List<RiskArea> {
        return listOf(
            RiskArea(
                name = "Espaço Confinado",
                iconResId = PLACEHOLDER_ICON, // Usando o coringa
                requiredEpis = listOf(
                    Epi("Capacete", PLACEHOLDER_ICON),
                    Epi("Óculos de Proteção", PLACEHOLDER_ICON),
                    Epi("Luvas de Proteção", PLACEHOLDER_ICON),
                    Epi("Respirador com Linha de Ar", PLACEHOLDER_ICON),
                    Epi("Detector de Gases", PLACEHOLDER_ICON),
                    Epi("Cinto de Segurança", PLACEHOLDER_ICON)
                )
            ),
            RiskArea(
                name = "Câmara Fria",
                iconResId = PLACEHOLDER_ICON, // Usando o coringa
                requiredEpis = listOf(
                    Epi("Jaqueta Térmica", PLACEHOLDER_ICON),
                    Epi("Calça Térmica", PLACEHOLDER_ICON),
                    Epi("Luvas Térmicas", PLACEHOLDER_ICON),
                    Epi("Botas Térmicas", PLACEHOLDER_ICON),
                    Epi("Gorro Térmico", PLACEHOLDER_ICON)
                )
            ),
            RiskArea(
                name = "Tanque Químico",
                iconResId = PLACEHOLDER_ICON, // Usando o coringa
                requiredEpis = listOf(
                    Epi("Capacete com Protetor Facial", PLACEHOLDER_ICON),
                    Epi("Macacão Químico", PLACEHOLDER_ICON),
                    Epi("Luvas de PVC", PLACEHOLDER_ICON),
                    Epi("Botas de Borracha", PLACEHOLDER_ICON),
                    Epi("Respirador para Vapores", PLACEHOLDER_ICON)
                )
            )
        )
    }
}