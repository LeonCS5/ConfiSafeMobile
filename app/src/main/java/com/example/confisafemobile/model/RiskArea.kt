// app/src/main/java/com/example/confisafemobile/model/RiskArea.kt
package com.example.confisafemobile.model

import android.os.Parcelable
import kotlinx.parcelize.Parcelize

@Parcelize
data class RiskArea(
    val id: String,   // "caldeira", "silo", "tanque"
    val name: String  // "Caldeira", "Silo", "Tanque"
) : Parcelable
