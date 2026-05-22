package com.confisafe.backend.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class CadastroEmpresaRequest {
    
    @NotBlank(message = "Razão Social é obrigatória")
    private String razaoSocial;
    
    @NotBlank(message = "CNPJ é obrigatório")
    private String cnpj;
    
    @NotBlank(message = "E-mail é obrigatório")
    @Email(message = "E-mail inválido")
    private String emailCorporativo;
    
    @NotBlank(message = "Telefone é obrigatório")
    private String telefone;
    
    @NotBlank(message = "Nome do responsável é obrigatório")
    private String nomeResponsavel;
    
    @NotBlank(message = "CPF é obrigatório")
    private String cpf;
    
    @NotBlank(message = "Cargo é obrigatório")
    private String cargo;
    
    @NotBlank(message = "Senha é obrigatória")
    @Size(min = 8, message = "Senha deve ter no mínimo 8 caracteres")
    private String senha;
    
    private String departamento;
    private String ramal;
}
