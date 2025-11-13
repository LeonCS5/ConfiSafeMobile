package com.example.confisafemobile.ui

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.example.confisafemobile.databinding.ListItemEpiBinding
import com.example.confisafemobile.model.Epi

class EpiAdapter : ListAdapter<Epi, EpiAdapter.VH>(DIFF) {

    companion object {
        private val DIFF = object : DiffUtil.ItemCallback<Epi>() {
            override fun areItemsTheSame(a: Epi, b: Epi) = a.name == b.name
            override fun areContentsTheSame(a: Epi, b: Epi) = a == b
        }
    }

    inner class VH(private val b: ListItemEpiBinding) : RecyclerView.ViewHolder(b.root) {
        fun bind(item: Epi) {
            b.tvEpiName.text = item.name
            b.tvEpiIcon.setImageResource(item.iconResId)
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int) =
        VH(ListItemEpiBinding.inflate(LayoutInflater.from(parent.context), parent, false))

    override fun onBindViewHolder(holder: VH, position: Int) = holder.bind(getItem(position))
}
