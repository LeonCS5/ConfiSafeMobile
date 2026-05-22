package com.confisafe.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class EsqueciSenhaRequest {

    @NotBlank(message = "E-mail é obrigatório")
    @Email(message = "E-mail inválido")
    private String email;

    // Construtor padrão
    public EsqueciSenhaRequest() {
    }

    // Construtor com parâmetro
    public EsqueciSenhaRequest(String email) {
        this.email = email;
    }

    // Getter e Setter
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
