package com.example.descontaobackend.dto;

public class AuthResponse {

    private String tipo;
    private String nome;
    private String email;
    private Long identificador; // CPF ou CNPJ
    private String message;

    public AuthResponse() {}

    public AuthResponse(String tipo, String nome, String email, Long identificador, String message) {
        this.tipo = tipo;
        this.nome = nome;
        this.email = email;
        this.identificador = identificador;
        this.message = message;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getIdentificador() {
        return identificador;
    }

    public void setIdentificador(Long identificador) {
        this.identificador = identificador;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
