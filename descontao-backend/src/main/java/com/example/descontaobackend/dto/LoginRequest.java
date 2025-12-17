package com.example.descontaobackend.dto;

import jakarta.validation.constraints.NotBlank;

public class LoginRequest {

    @NotBlank(message = "Documento é obrigatório")
    private String documento; // CPF ou CNPJ

    @NotBlank(message = "Senha é obrigatória")
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
