package com.example.confisafemobile.adapter

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.example.confisafemobile.databinding.ItemRiskAreaBinding
import com.example.confisafemobile.model.RiskArea

// O Adapter recebe uma função como parâmetro no construtor.
// Esta é a forma moderna de lidar com cliques.
class RiskAreaAdapter(private val onItemClicked: (RiskArea) -> Unit) :
    ListAdapter<RiskArea, RiskAreaAdapter.RiskAreaViewHolder>(DiffCallback) {

    // O ViewHolder "segura" os componentes visuais de cada item da lista (o ícone e o texto).
    class RiskAreaViewHolder(private var binding: ItemRiskAreaBinding) :
        RecyclerView.ViewHolder(binding.root) {

        // A função bind conecta os dados de uma 'RiskArea' específica aos componentes visuais.
        fun bind(riskArea: RiskArea) {
            binding.tvRiskName.text = riskArea.name
            binding.ivRiskIcon.setImageResource(riskArea.iconResId)
        }
    }

    // O DiffCallback ajuda o RecyclerView a ser super eficiente, calculando
    // a melhor forma de atualizar a lista sem redesenhar tudo.
    companion object {
        private val DiffCallback = object : DiffUtil.ItemCallback<RiskArea>() {
            override fun areItemsTheSame(oldItem: RiskArea, newItem: RiskArea): Boolean {
                return oldItem.name == newItem.name
            }

            override fun areContentsTheSame(oldItem: RiskArea, newItem: RiskArea): Boolean {
                return oldItem == newItem
            }
        }
    }

    // Chamado quando o RecyclerView precisa criar um novo ViewHolder (uma nova linha na lista).
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RiskAreaViewHolder {
        val viewHolder = RiskAreaViewHolder(
            ItemRiskAreaBinding.inflate(
                LayoutInflater.from(parent.context),
                parent,
                false
            )
        )
        // Configura o clique para o item inteiro.
        viewHolder.itemView.setOnClickListener {
            val position = viewHolder.adapterPosition
            onItemClicked(getItem(position))
        }
        return viewHolder
    }

    // Chamado quando o RecyclerView precisa exibir os dados em um ViewHolder específico.
    override fun onBindViewHolder(holder: RiskAreaViewHolder, position: Int) {
        holder.bind(getItem(position))
    }
}