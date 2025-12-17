package com.example.descontaobackend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.util.List;

@Entity
@Table(name = "comercio")
public class Comercio {

    @Id
    @Column(name = "cnpj_comercio")
    private Long cnpj;

    @ManyToOne
    @JoinColumn(name = "id_categoria", nullable = false)
    private Categoria categoria;

    @NotBlank(message = "Razão social é obrigatória")
    @Column(name = "raz_social_comercio", nullable = false, length = 50)
    private String razaoSocial;

    @Column(name = "nom_fantasia_comercio", length = 30)
    private String nomeFantasia;

    @Column(name = "end_comercio", length = 40)
    private String endereco;

    @Column(name = "bai_comercio", length = 30)
    private String bairro;

    @Column(name = "cep_comercio", length = 8)
    private String cep;

    @Column(name = "cid_comercio", length = 40)
    private String cidade;

    @Column(name = "uf_comercio", length = 2)
    private String uf;

    @Column(name = "con_comercio", length = 15)
    private String contato;

    @NotBlank(message = "Email é obrigatório")
    @Email(message = "Email deve ser válido")
    @Column(name = "email_comercio", nullable = false, unique = true, length = 50)
    private String email;

    @NotBlank(message = "Senha é obrigatória")
    @Column(name = "sen_comercio", nullable = false)
    private String senha;

    @OneToMany(mappedBy = "comercio")
    private List<Cupom> cupons;

    public Comercio() {}

    public Comercio(Long cnpj, String razaoSocial, String email, String senha, Categoria categoria) {
        this.cnpj = cnpj;
        this.razaoSocial = razaoSocial;
        this.email = email;
        this.senha = senha;
        this.categoria = categoria;
    }

    public Long getCnpj() {
        return cnpj;
    }

    public void setCnpj(Long cnpj) {
        this.cnpj = cnpj;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
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

    public List<Cupom> getCupons() {
        return cupons;
    }

    public void setCupons(List<Cupom> cupons) {
        this.cupons = cupons;
    }
}
