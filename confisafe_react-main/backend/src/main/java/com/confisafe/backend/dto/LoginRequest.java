package com.confisafe.backend.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class LoginRequest {
    
    @NotBlank(message = "E-mail é obrigatório")
    @Email(message = "E-mail inválido")
    private String email;
    
    @NotBlank(message = "Senha é obrigatória")
    private String senha;
}
