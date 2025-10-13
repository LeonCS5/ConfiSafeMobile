package com.example.confisafemobile.model

import kotlinx.parcelize.Parcelize
import android.os.Parcelable

@Parcelize
data class RiskArea(
    val name: String,
    val iconResId: Int,
    val requiredEpis: List<Epi>
) : Parcelable