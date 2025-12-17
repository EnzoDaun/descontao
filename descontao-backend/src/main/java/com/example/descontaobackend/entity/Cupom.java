package com.example.descontaobackend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "cupom")
public class Cupom {

    @Id
    @Column(name = "num_cupom", length = 12)
    private String numero;

    @NotBlank(message = "Título é obrigatório")
    @Column(name = "tit_cupom", nullable = false, length = 25)
    private String titulo;

    @ManyToOne
    @JoinColumn(name = "cnpj_comercio", nullable = false)
    private Comercio comercio;

    @Column(name = "dta_emissao_cupom", nullable = false)
    private LocalDate dataEmissao;

    @Column(name = "dta_inicio_cupom", nullable = false)
    private LocalDate dataInicio;

    @Column(name = "dta_termino_cupom", nullable = false)
    private LocalDate dataTermino;

    @NotNull(message = "Percentual de desconto é obrigatório")
    @DecimalMin(value = "0.01", message = "Percentual deve ser maior que 0")
    @DecimalMax(value = "100.00", message = "Percentual não pode ser maior que 100")
    @Column(name = "per_desc_cupom", nullable = false, precision = 5, scale = 2)
    private BigDecimal percentualDesconto;

    @OneToMany(mappedBy = "cupom")
    private List<CupomAssociado> associacoes;

    public Cupom() {}

    public Cupom(String numero, String titulo, Comercio comercio, LocalDate dataInicio,
                 LocalDate dataTermino, BigDecimal percentualDesconto) {
        this.numero = numero;
        this.titulo = titulo;
        this.comercio = comercio;
        this.dataEmissao = LocalDate.now();
        this.dataInicio = dataInicio;
        this.dataTermino = dataTermino;
        this.percentualDesconto = percentualDesconto;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public Comercio getComercio() {
        return comercio;
    }

    public void setComercio(Comercio comercio) {
        this.comercio = comercio;
    }

    public LocalDate getDataEmissao() {
        return dataEmissao;
    }

    public void setDataEmissao(LocalDate dataEmissao) {
        this.dataEmissao = dataEmissao;
    }

    public LocalDate getDataInicio() {
        return dataInicio;
    }

    public void setDataInicio(LocalDate dataInicio) {
        this.dataInicio = dataInicio;
    }

    public LocalDate getDataTermino() {
        return dataTermino;
    }

    public void setDataTermino(LocalDate dataTermino) {
        this.dataTermino = dataTermino;
    }

    public BigDecimal getPercentualDesconto() {
        return percentualDesconto;
    }

    public void setPercentualDesconto(BigDecimal percentualDesconto) {
        this.percentualDesconto = percentualDesconto;
    }

    public List<CupomAssociado> getAssociacoes() {
        return associacoes;
    }

    public void setAssociacoes(List<CupomAssociado> associacoes) {
        this.associacoes = associacoes;
    }

    public boolean isAtivo() {
        LocalDate hoje = LocalDate.now();
        return !hoje.isBefore(dataInicio) && !hoje.isAfter(dataTermino);
    }

    public boolean isVencido() {
        return LocalDate.now().isAfter(dataTermino);
    }
}
