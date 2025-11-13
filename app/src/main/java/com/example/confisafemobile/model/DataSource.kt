package com.example.confisafemobile.model

import androidx.annotation.DrawableRes
import com.example.confisafemobile.R

object DataSource {

    @DrawableRes
    private val PLACEHOLDER_ICON = R.drawable.ic_epi_placeholder

    // Lista mostrada em Risk_Area_Activity (adapter espera id + name)
    fun loadRiskAreas(): List<RiskArea> = listOf(
        RiskArea(id = "caldeira",    name = "Caldeira"),
        RiskArea(id = "camara_fria", name = "Câmara Fria"),
        RiskArea(id = "tanque",      name = "Tanque Químico")
    )

    // EPIs por local (usado pela EpiListActivity)
    fun getEpisFor(areaId: String): List<Epi> = when (areaId) {
        "caldeira" -> listOf(
            Epi("Capacete",                R.drawable.ic_construction),
            Epi("Óculos de Proteção",     R.drawable.ic_goggles),          // se não tiver: ic_eyeglasses
            Epi("Luvas de Proteção",      R.drawable.ic_back_hand),
            Epi("Respirador com Linha de Ar", R.drawable.ic_air_purifier), // respiratório
            Epi("Detector de Gases",      R.drawable.ic_gas_meter),
            Epi("Cinto de Segurança",     R.drawable.ic_safety_check),
        )

        "camara_fria" -> listOf(
            Epi("Jaqueta Térmica",        R.drawable.ic_health_and_safety),
            Epi("Calça Térmica",          R.drawable.ic_verified_user),
            Epi("Luvas Térmicas",         R.drawable.ic_back_hand),
            Epi("Botas Térmicas",         R.drawable.ic_shield),
            Epi("Gorro Térmico",          R.drawable.ic_shield_person),
        )

        "tanque" -> listOf(
            Epi("Capacete com Protetor Facial", R.drawable.ic_construction),
            Epi("Macacão Químico",        R.drawable.ic_science),
            Epi("Luvas de PVC",           R.drawable.ic_back_hand),
            Epi("Botas de Borracha",      R.drawable.ic_shield),
            Epi("Respirador para Vapores",R.drawable.ic_air_purifier),
        )

        else -> emptyList()
    }
}
