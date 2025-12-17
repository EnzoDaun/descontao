package com.example.descontaobackend.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "cupom_associado")
public class CupomAssociado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cupom_associado")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "num_cupom", nullable = false)
    private Cupom cupom;

    @ManyToOne
    @JoinColumn(name = "cpf_associado", nullable = false)
    private Associado associado;

    @Column(name = "dta_cupom_associado", nullable = false)
    private LocalDate dataReserva;

    @Column(name = "dta_uso_cupom_associado")
    private LocalDate dataUso;

    public CupomAssociado() {}

    public CupomAssociado(Cupom cupom, Associado associado) {
        this.cupom = cupom;
        this.associado = associado;
        this.dataReserva = LocalDate.now();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Cupom getCupom() {
        return cupom;
    }

    public void setCupom(Cupom cupom) {
        this.cupom = cupom;
    }

    public Associado getAssociado() {
        return associado;
    }

    public void setAssociado(Associado associado) {
        this.associado = associado;
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

    public boolean isUtilizado() {
        return dataUso != null;
    }

    public void marcarComoUtilizado() {
        this.dataUso = LocalDate.now();
    }
}
