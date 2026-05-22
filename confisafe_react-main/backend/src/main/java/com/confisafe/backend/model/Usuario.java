package com.confisafe.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "usuarios")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "E-mail é obrigatório")
    @Email(message = "E-mail inválido")
    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @NotBlank(message = "Senha é obrigatória")
    @Column(name = "senha", nullable = false)
    private String senha;

    @Column(name = "nome_completo")
    private String nomeCompleto;

    @Column(name = "cargo")
    private String cargo;

    @Column(name = "departamento")
    private String departamento;

    @Column(name = "telefone", length = 64)
    private String telefone;

    @Column(name = "ramal", length = 32)
    private String ramal;

    @Lob
    @Column(name = "foto_perfil", columnDefinition = "LONGTEXT")
    private String fotoPerfil;
}

