package com.confisafe.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "empresas")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Empresa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Razão Social é obrigatória")
    @Column(name = "razao_social", nullable = false)
    private String razaoSocial;

    @NotBlank(message = "CNPJ é obrigatório")
    @Column(name = "cnpj", nullable = false, unique = true, length = 32)
    private String cnpj;

    @NotBlank(message = "E-mail é obrigatório")
    @Email(message = "E-mail inválido")
    @Column(name = "email_corporativo", nullable = false, unique = true)
    private String emailCorporativo;

    @NotBlank(message = "Telefone é obrigatório")
    @Column(name = "telefone", nullable = false, length = 32)
    private String telefone;

    @NotBlank(message = "Nome do responsável é obrigatório")
    @Column(name = "nome_responsavel", nullable = false)
    private String nomeResponsavel;

    @NotBlank(message = "CPF é obrigatório")
    @Column(name = "cpf", nullable = false, unique = true, length = 32)
    private String cpf;

    @NotBlank(message = "Cargo é obrigatório")
    @Column(name = "cargo", nullable = false)
    private String cargo;

    @NotBlank(message = "Senha é obrigatória")
    @Column(name = "senha", nullable = false)
    private String senha;

    @Column(name = "departamento")
    private String departamento;

    @Column(name = "ramal", length = 32)
    private String ramal;

    @CreationTimestamp
    @Column(name = "data_cadastro", nullable = false, updatable = false)
    private LocalDateTime dataCadastro;

    @UpdateTimestamp
    @Column(name = "data_atualizacao")
    private LocalDateTime dataAtualizacao;
}
