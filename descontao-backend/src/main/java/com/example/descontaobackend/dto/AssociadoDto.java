package com.example.descontaobackend.dto;

import jakarta.validation.constraints.*;
import java.time.LocalDate;

public class AssociadoDto {

    @NotNull(message = "CPF é obrigatório")
    private Long cpf;

    @NotBlank(message = "Nome é obrigatório")
    @Size(min = 2, max = 40, message = "Nome deve ter entre 2 e 40 caracteres")
    private String nome;

    private LocalDate dataNascimento;

    @Size(max = 40, message = "Endereço não pode ter mais de 40 caracteres")
    private String endereco;

    @Size(max = 30, message = "Bairro não pode ter mais de 30 caracteres")
    private String bairro;

    @Pattern(regexp = "^[0-9]{8}$", message = "CEP deve conter exatamente 8 dígitos", groups = {})
    private String cep;

    @Size(max = 40, message = "Cidade não pode ter mais de 40 caracteres")
    private String cidade;

    @Pattern(regexp = "^[A-Z]{2}$", message = "UF deve conter exatamente 2 letras maiúsculas", groups = {})
    private String uf;

    @Pattern(regexp = "^[0-9]{10,15}$", message = "Celular deve conter entre 10 e 15 dígitos", groups = {})
    private String celular;

    @NotBlank(message = "Email é obrigatório")
    @Email(message = "Email deve ser válido")
    @Size(max = 50, message = "Email não pode ter mais de 50 caracteres")
    private String email;

    @NotBlank(message = "Senha é obrigatória")
    @Size(min = 6, max = 255, message = "Senha deve ter pelo menos 6 caracteres")
    private String senha;

    public AssociadoDto() {}

    public Long getCpf() {
        return cpf;
    }

    public void setCpf(Long cpf) {
        this.cpf = cpf;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getUf() {
        return uf;
    }

    public void setUf(String uf) {
        this.uf = uf;
    }

    public String getCelular() {
        return celular;
    }

    public void setCelular(String celular) {
        this.celular = celular;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }
}
