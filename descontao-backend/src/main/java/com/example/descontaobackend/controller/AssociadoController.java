package com.example.descontaobackend.controller;

import com.example.descontaobackend.entity.Associado;
import com.example.descontaobackend.dto.AssociadoDto;
import com.example.descontaobackend.service.AssociadoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/associados")
@CrossOrigin(origins = "http://localhost:5173")
public class AssociadoController {

    @Autowired
    private AssociadoService associadoService;

    @GetMapping
    public ResponseEntity<List<Associado>> getAllAssociados() {
        return ResponseEntity.ok(associadoService.findAll());
    }

    @GetMapping("/{cpf}")
    public ResponseEntity<Associado> getAssociado(@PathVariable Long cpf) {
        return associadoService.findById(cpf)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{cpf}")
    public ResponseEntity<Associado> updateAssociado(@PathVariable Long cpf, @Valid @RequestBody AssociadoDto dto) {
        try {
            Associado associado = associadoService.update(cpf, dto);
            return ResponseEntity.ok(associado);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{cpf}")
    public ResponseEntity<Void> deleteAssociado(@PathVariable Long cpf) {
        associadoService.delete(cpf);
        return ResponseEntity.noContent().build();
    }
}
