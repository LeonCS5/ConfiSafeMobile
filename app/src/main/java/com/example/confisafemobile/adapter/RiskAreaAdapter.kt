package com.example.confisafemobile.adapter

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.example.confisafemobile.databinding.ItemRiskAreaBinding
import com.example.confisafemobile.model.RiskArea

class RiskAreaAdapter(
    private val onItemClicked: (RiskArea) -> Unit
) : ListAdapter<RiskArea, RiskAreaAdapter.RiskAreaViewHolder>(DiffCallback) {

    class RiskAreaViewHolder(
        private val binding: ItemRiskAreaBinding,
        private val onItemClicked: (RiskArea) -> Unit
    ) : RecyclerView.ViewHolder(binding.root) {

        fun bind(riskArea: RiskArea) {
            binding.tvRiskName.text = riskArea.name
            binding.ivRiskIcon.setImageResource(riskArea.iconResId)

            // Clique no item inteiro
            binding.root.setOnClickListener {
                onItemClicked(riskArea)
            }
        }
    }

    companion object {
        private val DiffCallback = object : DiffUtil.ItemCallback<RiskArea>() {
            override fun areItemsTheSame(oldItem: RiskArea, newItem: RiskArea): Boolean =
                oldItem.name == newItem.name

            override fun areContentsTheSame(oldItem: RiskArea, newItem: RiskArea): Boolean =
                oldItem == newItem
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RiskAreaViewHolder {
        return RiskAreaViewHolder(
            ItemRiskAreaBinding.inflate(LayoutInflater.from(parent.context), parent, false),
            onItemClicked
        )
    }

    override fun onBindViewHolder(holder: RiskAreaViewHolder, position: Int) {
        holder.bind(getItem(position))
    }
}
