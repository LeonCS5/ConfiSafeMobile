package com.example.confisafemobile.adapter

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.annotation.DrawableRes
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.example.confisafemobile.R // <-- IMPORTA O R DO APP
import com.example.confisafemobile.databinding.ItemRiskAreaBinding
import com.example.confisafemobile.model.RiskArea // <-- USA a classe do model

class RiskAreaAdapter(
    private val onClick: (RiskArea) -> Unit
) : ListAdapter<RiskArea, RiskAreaAdapter.VH>(DIFF) {

    companion object {
        private val DIFF = object : DiffUtil.ItemCallback<RiskArea>() {
            override fun areItemsTheSame(a: RiskArea, b: RiskArea) = a.id == b.id
            override fun areContentsTheSame(a: RiskArea, b: RiskArea) = a == b
        }
    }

    inner class VH(private val b: ItemRiskAreaBinding) : RecyclerView.ViewHolder(b.root) {
        fun bind(item: RiskArea) {
            b.tvRiskName.text = item.name
            b.ivRiskIcon.setImageResource(iconFor(item.id)) // usa os drawables abaixo
            b.root.setOnClickListener { onClick(item) }
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int) =
        VH(ItemRiskAreaBinding.inflate(LayoutInflater.from(parent.context), parent, false))

    override fun onBindViewHolder(holder: VH, position: Int) = holder.bind(getItem(position))
}

@DrawableRes
private fun iconFor(areaId: String) = when (areaId) {
    "caldeira" -> R.drawable.ic_local_fire_department
    "camara_fria" -> R.drawable.ic_device_thermostat
    "silo"     -> R.drawable.ic_warehouse
    "tanque"   -> R.drawable.ic_oil_barrel
    else       -> R.drawable.ic_epi_placeholder
}

