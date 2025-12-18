package com.example.descontaobackend.dto;

import jakarta.validation.constraints.*;

public class ComercioDto {

    @NotNull(message = "CNPJ é obrigatório")
    private Long cnpj;

    @NotNull(message = "Categoria é obrigatória")
    private Integer categoriaId;

    @NotBlank(message = "Razão social é obrigatória")
    @Size(min = 2, max = 50, message = "Razão social deve ter entre 2 e 50 caracteres")
    private String razaoSocial;

    @Size(max = 30, message = "Nome fantasia não pode ter mais de 30 caracteres")
    private String nomeFantasia;

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

    @Pattern(regexp = "^[0-9]{10,15}$", message = "Contato deve conter entre 10 e 15 dígitos", groups = {})
    private String contato;

    @NotBlank(message = "Email é obrigatório")
    @Email(message = "Email deve ser válido")
    @Size(max = 50, message = "Email não pode ter mais de 50 caracteres")
    private String email;

    @NotBlank(message = "Senha é obrigatória")
    @Size(min = 6, max = 255, message = "Senha deve ter pelo menos 6 caracteres")
    private String senha;

    public ComercioDto() {}

    public Long getCnpj() {
        return cnpj;
    }

    public void setCnpj(Long cnpj) {
        this.cnpj = cnpj;
    }

    public Integer getCategoriaId() {
        return categoriaId;
    }

    public void setCategoriaId(Integer categoriaId) {
        this.categoriaId = categoriaId;
    }

    public String getRazaoSocial() {
        return razaoSocial;
    }

    public void setRazaoSocial(String razaoSocial) {
        this.razaoSocial = razaoSocial;
    }

    public String getNomeFantasia() {
        return nomeFantasia;
    }

    public void setNomeFantasia(String nomeFantasia) {
        this.nomeFantasia = nomeFantasia;
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

    public String getContato() {
        return contato;
    }

    public void setContato(String contato) {
        this.contato = contato;
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
