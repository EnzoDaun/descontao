package com.example.descontaobackend.service;

import com.example.descontaobackend.entity.CupomAssociado;
import com.example.descontaobackend.entity.Cupom;
import com.example.descontaobackend.entity.Associado;
import com.example.descontaobackend.dto.CupomDto;
import com.example.descontaobackend.repository.CupomAssociadoRepository;
import com.example.descontaobackend.repository.CupomRepository;
import com.example.descontaobackend.repository.AssociadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CupomAssociadoService {

    @Autowired
    private CupomAssociadoRepository cupomAssociadoRepository;

    @Autowired
    private CupomRepository cupomRepository;

    @Autowired
    private AssociadoRepository associadoRepository;

    public List<CupomDto> findMeusCupons(Long cpfAssociado) {
        return cupomAssociadoRepository.findByAssociado_Cpf(cpfAssociado).stream()
            .map(this::toDto)
            .collect(Collectors.toList());
    }

    public List<CupomDto> findCuponsComercio(Long cnpjComercio) {
        return cupomAssociadoRepository.findByCupom_Comercio_Cnpj(cnpjComercio).stream()
            .map(this::toDto)
            .collect(Collectors.toList());
    }

    public CupomAssociado reservarCupom(String numeroCupom, Long cpfAssociado) {
        if (cupomAssociadoRepository.existsByCupom_Numero(numeroCupom)) {
            throw new RuntimeException("Cupom já foi reservado");
        }

        Cupom cupom = cupomRepository.findById(numeroCupom)
            .orElseThrow(() -> new RuntimeException("Cupom não encontrado"));

        if (!cupom.isAtivo()) {
            throw new RuntimeException("Cupom não está ativo");
        }

        Associado associado = associadoRepository.findById(cpfAssociado)
            .orElseThrow(() -> new RuntimeException("Associado não encontrado"));

        CupomAssociado cupomAssociado = new CupomAssociado(cupom, associado);
        return cupomAssociadoRepository.save(cupomAssociado);
    }

    public CupomAssociado marcarComoUtilizado(String numeroCupom, Long cpfAssociado) {
        CupomAssociado cupomAssociado = cupomAssociadoRepository
            .findByCupom_NumeroAndAssociado_Cpf(numeroCupom, cpfAssociado)
            .orElseThrow(() -> new RuntimeException("Cupom não encontrado para este associado"));

        if (cupomAssociado.isUtilizado()) {
            throw new RuntimeException("Cupom já foi utilizado");
        }

        cupomAssociado.marcarComoUtilizado();
        return cupomAssociadoRepository.save(cupomAssociado);
    }

    public List<CupomDto> listarCuponsParaUsoPorComercio(Long cnpjComercio) {
        return cupomAssociadoRepository.findByCupom_Comercio_Cnpj(cnpjComercio).stream()
            .filter(ca -> !ca.isUtilizado() && ca.getCupom().isAtivo())
            .map(this::toDto)
            .collect(Collectors.toList());
    }

    private CupomDto toDto(CupomAssociado cupomAssociado) {
        Cupom cupom = cupomAssociado.getCupom();
        CupomDto dto = new CupomDto();
        dto.setNumero(cupom.getNumero());
        dto.setTitulo(cupom.getTitulo());
        dto.setNomeComercio(cupom.getComercio().getRazaoSocial());
        dto.setCategoria(cupom.getComercio().getCategoria().getNome());
        dto.setDataEmissao(cupom.getDataEmissao());
        dto.setDataInicio(cupom.getDataInicio());
        dto.setDataTermino(cupom.getDataTermino());
        dto.setPercentualDesconto(cupom.getPercentualDesconto());
        dto.setReservado(true);
        dto.setUtilizado(cupomAssociado.isUtilizado());
        dto.setDataReserva(cupomAssociado.getDataReserva());
        dto.setDataUso(cupomAssociado.getDataUso());
        return dto;
    }
}
