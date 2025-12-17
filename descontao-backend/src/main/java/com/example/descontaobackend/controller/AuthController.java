package com.example.descontaobackend.controller;

import com.example.descontaobackend.dto.*;
import com.example.descontaobackend.entity.Associado;
import com.example.descontaobackend.entity.Comercio;
import com.example.descontaobackend.service.AssociadoService;
import com.example.descontaobackend.service.ComercioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private AssociadoService associadoService;

    @Autowired
    private ComercioService comercioService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        try {
            Long documento = Long.parseLong(request.getDocumento());

            // Tentar login como associado (CPF)
            Optional<Associado> associado = associadoService.findById(documento);
            if (associado.isPresent() && associado.get().getSenha().equals(request.getSenha())) {
                return ResponseEntity.ok(new AuthResponse(
                    "ASSOCIADO",
                    associado.get().getNome(),
                    associado.get().getEmail(),
                    associado.get().getCpf(),
                    "Login realizado com sucesso"
                ));
            }

            // Tentar login como comercio (CNPJ)
            Optional<Comercio> comercio = comercioService.findById(documento);
            if (comercio.isPresent() && comercio.get().getSenha().equals(request.getSenha())) {
                return ResponseEntity.ok(new AuthResponse(
                    "COMERCIO",
                    comercio.get().getRazaoSocial(),
                    comercio.get().getEmail(),
                    comercio.get().getCnpj(),
                    "Login realizado com sucesso"
                ));
            }

            return ResponseEntity.badRequest()
                .body(new MessageResponse("Documento ou senha inválidos"));

        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest()
                .body(new MessageResponse("Documento deve conter apenas números"));
        }
    }

    @PostMapping("/register/associado")
    public ResponseEntity<?> registerAssociado(@Valid @RequestBody AssociadoDto request) {
        try {
            Associado associado = associadoService.save(request);
            return ResponseEntity.ok(new AuthResponse(
                "ASSOCIADO",
                associado.getNome(),
                associado.getEmail(),
                associado.getCpf(),
                "Associado cadastrado com sucesso"
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                .body(new MessageResponse(e.getMessage()));
        } catch (Exception e) {

            String message = e.getMessage();
            if (message != null && (message.contains("Data truncation") || message.contains("Data too long"))) {
                return ResponseEntity.badRequest()
                    .body(new MessageResponse("Dados inválidos: verifique o tamanho dos campos"));
            }
            return ResponseEntity.badRequest()
                .body(new MessageResponse("Erro ao cadastrar associado"));
        }
    }

    @PostMapping("/register/comercio")
    public ResponseEntity<?> registerComercio(@Valid @RequestBody ComercioDto request) {
        try {
            Comercio comercio = comercioService.save(request);
            return ResponseEntity.ok(new AuthResponse(
                "COMERCIO",
                comercio.getRazaoSocial(),
                comercio.getEmail(),
                comercio.getCnpj(),
                "Comércio cadastrado com sucesso"
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                .body(new MessageResponse(e.getMessage()));
        } catch (Exception e) {
            String message = e.getMessage();
            if (message != null && (message.contains("Data truncation") || message.contains("Data too long"))) {
                return ResponseEntity.badRequest()
                    .body(new MessageResponse("Dados inválidos: verifique o tamanho dos campos"));
            }
            return ResponseEntity.badRequest()
                .body(new MessageResponse("Erro ao cadastrar comércio"));
        }
    }
}
