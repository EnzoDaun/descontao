package com.example.descontaobackend.controller;

import com.example.descontaobackend.entity.Comercio;
import com.example.descontaobackend.dto.ComercioDto;
import com.example.descontaobackend.service.ComercioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/comercios")
@CrossOrigin(origins = "http://localhost:5173")
public class ComercioController {

    @Autowired
    private ComercioService comercioService;

    @GetMapping
    public ResponseEntity<List<Comercio>> getAllComercios() {
        return ResponseEntity.ok(comercioService.findAll());
    }

    @GetMapping("/{cnpj}")
    public ResponseEntity<Comercio> getComercio(@PathVariable Long cnpj) {
        return comercioService.findById(cnpj)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{cnpj}")
    public ResponseEntity<Comercio> updateComercio(@PathVariable Long cnpj, @Valid @RequestBody ComercioDto dto) {
        try {
            Comercio comercio = comercioService.update(cnpj, dto);
            return ResponseEntity.ok(comercio);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{cnpj}")
    public ResponseEntity<Void> deleteComercio(@PathVariable Long cnpj) {
        comercioService.delete(cnpj);
        return ResponseEntity.noContent().build();
    }
}
