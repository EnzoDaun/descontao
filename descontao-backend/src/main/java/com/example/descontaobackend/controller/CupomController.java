package com.example.descontaobackend.controller;

import com.example.descontaobackend.dto.CupomDto;
import com.example.descontaobackend.dto.MessageResponse;
import com.example.descontaobackend.entity.Cupom;
import com.example.descontaobackend.service.CupomService;
import com.example.descontaobackend.service.CupomAssociadoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/cupons")
@CrossOrigin(origins = "http://localhost:5173")
public class CupomController {

    @Autowired
    private CupomService cupomService;

    @Autowired
    private CupomAssociadoService cupomAssociadoService;

    @GetMapping("/disponiveis")
    public ResponseEntity<List<CupomDto>> getCuponsDisponiveis() {
        return ResponseEntity.ok(cupomService.findCuponsDisponiveis());
    }

    @GetMapping("/disponiveis/categoria/{categoriaId}")
    public ResponseEntity<List<CupomDto>> getCuponsDisponiveisPorCategoria(@PathVariable Integer categoriaId) {
        return ResponseEntity.ok(cupomService.findCuponsDisponiveisPorCategoria(categoriaId));
    }

    @GetMapping("/comercio/{cnpj}")
    public ResponseEntity<List<CupomDto>> getCuponsComercio(@PathVariable Long cnpj) {
        return ResponseEntity.ok(cupomService.findByComercio(cnpj));
    }

    @GetMapping("/meus/{cpf}")
    public ResponseEntity<List<CupomDto>> getMeusCupons(@PathVariable Long cpf) {
        return ResponseEntity.ok(cupomAssociadoService.findMeusCupons(cpf));
    }

    @GetMapping("/comercio/{cnpj}/reservados")
    public ResponseEntity<List<CupomDto>> getCuponsReservadosComercio(@PathVariable Long cnpj) {
        return ResponseEntity.ok(cupomAssociadoService.findCuponsComercio(cnpj));
    }

    @PostMapping("/criar")
    public ResponseEntity<?> criarCupons(
            @Valid @RequestBody CupomDto cupomDto,
            @RequestParam Long cnpjComercio,
            @RequestParam int quantidade) {
        try {
            List<Cupom> cupons = cupomService.criarCupons(cupomDto, cnpjComercio, quantidade);
            return ResponseEntity.ok(new MessageResponse(
                "Criados " + cupons.size() + " cupons com sucesso"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                .body(new MessageResponse(e.getMessage()));
        }
    }

    @PostMapping("/reservar")
    public ResponseEntity<?> reservarCupom(
            @RequestParam String numeroCupom,
            @RequestParam Long cpfAssociado) {
        try {
            cupomAssociadoService.reservarCupom(numeroCupom, cpfAssociado);
            return ResponseEntity.ok(new MessageResponse("Cupom reservado com sucesso"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                .body(new MessageResponse(e.getMessage()));
        }
    }

    @PostMapping("/utilizar")
    public ResponseEntity<?> utilizarCupom(
            @RequestParam String numeroCupom,
            @RequestParam Long cpfAssociado) {
        try {
            cupomAssociadoService.marcarComoUtilizado(numeroCupom, cpfAssociado);
            return ResponseEntity.ok(new MessageResponse("Cupom utilizado com sucesso"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                .body(new MessageResponse(e.getMessage()));
        }
    }
}
