package com.example.confisafemobile.model

import kotlinx.parcelize.Parcelize
import android.os.Parcelable

@Parcelize
data class Epi(
    val name: String,
    val iconResId: Int
) : Parcelable