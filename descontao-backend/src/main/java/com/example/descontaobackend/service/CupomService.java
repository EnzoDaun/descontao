package com.example.descontaobackend.service;

import com.example.descontaobackend.entity.Cupom;
import com.example.descontaobackend.entity.Comercio;
import com.example.descontaobackend.dto.CupomDto;
import com.example.descontaobackend.repository.CupomRepository;
import com.example.descontaobackend.repository.ComercioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.security.MessageDigest;
import java.util.stream.Collectors;

@Service
public class CupomService {

    @Autowired
    private CupomRepository cupomRepository;

    @Autowired
    private ComercioRepository comercioRepository;

    public List<CupomDto> findCuponsDisponiveis() {
        return cupomRepository.findCuponsDisponiveis(LocalDate.now()).stream()
            .map(this::toDto)
            .collect(Collectors.toList());
    }

    public List<CupomDto> findCuponsDisponiveisPorCategoria(Integer categoriaId) {
        return cupomRepository.findCuponsDisponiveisPorCategoria(categoriaId, LocalDate.now()).stream()
            .map(this::toDto)
            .collect(Collectors.toList());
    }

    public List<CupomDto> findByComercio(Long cnpj) {
        return cupomRepository.findByComercio_Cnpj(cnpj).stream()
            .map(this::toDto)
            .collect(Collectors.toList());
    }

    public Optional<Cupom> findById(String numero) {
        return cupomRepository.findById(numero);
    }

    public List<Cupom> criarCupons(CupomDto dto, Long cnpjComercio, int quantidade) {
        Comercio comercio = comercioRepository.findById(cnpjComercio)
            .orElseThrow(() -> new RuntimeException("Comércio não encontrado"));

        List<Cupom> cupons = new java.util.ArrayList<>();

        for (int i = 0; i < quantidade; i++) {
            String numeroCupom = gerarNumeroCupom(dto.getTitulo(), i);

            Cupom cupom = new Cupom();
            cupom.setNumero(numeroCupom);
            cupom.setTitulo(dto.getTitulo());
            cupom.setComercio(comercio);
            cupom.setDataEmissao(LocalDate.now());
            cupom.setDataInicio(dto.getDataInicio());
            cupom.setDataTermino(dto.getDataTermino());
            cupom.setPercentualDesconto(dto.getPercentualDesconto());

            cupons.add(cupomRepository.save(cupom));
        }

        return cupons;
    }

    private String gerarNumeroCupom(String titulo, int sequencial) {
        try {
            String input = titulo + LocalDate.now().toString() + sequencial;
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] hash = md.digest(input.getBytes());

            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) {
                    hexString.append('0');
                }
                hexString.append(hex);
            }

            return hexString.toString().substring(0, 12).toUpperCase();
        } catch (Exception e) {
            return String.valueOf(System.currentTimeMillis()).substring(0, 12);
        }
    }

    private CupomDto toDto(Cupom cupom) {
        CupomDto dto = new CupomDto();
        dto.setNumero(cupom.getNumero());
        dto.setTitulo(cupom.getTitulo());
        dto.setNomeComercio(cupom.getComercio().getRazaoSocial());
        dto.setCategoria(cupom.getComercio().getCategoria().getNome());
        dto.setDataEmissao(cupom.getDataEmissao());
        dto.setDataInicio(cupom.getDataInicio());
        dto.setDataTermino(cupom.getDataTermino());
        dto.setPercentualDesconto(cupom.getPercentualDesconto());
        return dto;
    }
}
