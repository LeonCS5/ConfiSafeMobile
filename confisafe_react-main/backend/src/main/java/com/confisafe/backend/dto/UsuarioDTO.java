package com.confisafe.backend.dto;

import lombok.Data;

@Data
public class UsuarioDTO {
    private Long id;
    private String email;
    private String nomeCompleto;
    private String cargo;
    private String departamento;
    private String telefone;
}
