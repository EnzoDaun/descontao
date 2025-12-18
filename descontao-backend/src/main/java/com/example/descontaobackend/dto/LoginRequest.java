package com.example.descontaobackend.dto;

import jakarta.validation.constraints.*;

public class LoginRequest {

    @NotBlank(message = "Documento é obrigatório")
    @Pattern(regexp = "^[0-9]{11,14}$", message = "Documento deve conter apenas dígitos (11 para CPF ou 14 para CNPJ)")
    private String documento; // CPF ou CNPJ

    @NotBlank(message = "Senha é obrigatória")
    @Size(min = 6, max = 255, message = "Senha deve ter pelo menos 6 caracteres")
    private String senha;

    public LoginRequest() {}

    public LoginRequest(String documento, String senha) {
        this.documento = documento;
        this.senha = senha;
    }

    public String getDocumento() {
        return documento;
    }

    public void setDocumento(String documento) {
        this.documento = documento;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }
}
