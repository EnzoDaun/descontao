package com.example.descontaobackend.dto;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;

public class CupomDto {

    private String numero;

    @NotBlank(message = "Título é obrigatório")
    @Size(min = 2, max = 25, message = "Título deve ter entre 2 e 25 caracteres")
    private String titulo;

    private String nomeComercio;
    private String categoria;
    private LocalDate dataEmissao;

    @NotNull(message = "Data de início é obrigatória")
    private LocalDate dataInicio;

    @NotNull(message = "Data de término é obrigatória")
    private LocalDate dataTermino;

    @NotNull(message = "Percentual de desconto é obrigatório")
    @DecimalMin(value = "0.01", message = "Percentual deve ser maior que 0")
    @DecimalMax(value = "100.00", message = "Percentual não pode ser maior que 100")
    private BigDecimal percentualDesconto;

    private boolean reservado;
    private boolean utilizado;
    private LocalDate dataReserva;
    private LocalDate dataUso;

    public CupomDto() {}

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

    public String getNomeComercio() {
        return nomeComercio;
    }

    public void setNomeComercio(String nomeComercio) {
        this.nomeComercio = nomeComercio;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
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

    public boolean isReservado() {
        return reservado;
    }

    public void setReservado(boolean reservado) {
        this.reservado = reservado;
    }

    public boolean isUtilizado() {
        return utilizado;
    }

    public void setUtilizado(boolean utilizado) {
        this.utilizado = utilizado;
    }

    public LocalDate getDataReserva() {
        return dataReserva;
    }

    public void setDataReserva(LocalDate dataReserva) {
        this.dataReserva = dataReserva;
    }

    public LocalDate getDataUso() {
        return dataUso;
    }

    public void setDataUso(LocalDate dataUso) {
        this.dataUso = dataUso;
    }
}
