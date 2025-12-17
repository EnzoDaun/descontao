package com.example.descontaobackend.controller;

import com.example.descontaobackend.dto.ConfirmPasswordResetDto;
import com.example.descontaobackend.dto.MessageResponse;
import com.example.descontaobackend.dto.RequestPasswordResetDto;
import com.example.descontaobackend.service.PasswordResetService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/password-reset")
@CrossOrigin(origins = "http://localhost:5173")
public class PasswordResetController {

    @Autowired
    private PasswordResetService passwordResetService;

    @PostMapping("/request")
    public ResponseEntity<MessageResponse> requestPasswordReset(@Valid @RequestBody RequestPasswordResetDto request) {
        try {
            passwordResetService.requestPasswordReset(request);
            return ResponseEntity.ok(new MessageResponse("Email de redefinição de senha enviado com sucesso"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Erro: " + e.getMessage()));
        }
    }

    @PostMapping("/confirm")
    public ResponseEntity<MessageResponse> confirmPasswordReset(@Valid @RequestBody ConfirmPasswordResetDto request) {
        try {
            passwordResetService.confirmPasswordReset(request);
            return ResponseEntity.ok(new MessageResponse("Senha alterada com sucesso"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Erro: " + e.getMessage()));
        }
    }

    @GetMapping("/validate-token")
    public ResponseEntity<MessageResponse> validateToken(@RequestParam String token) {
        try {
            boolean isValid = passwordResetService.validateToken(token);
            if (isValid) {
                return ResponseEntity.ok(new MessageResponse("Token válido"));
            } else {
                return ResponseEntity.badRequest().body(new MessageResponse("Token inválido ou expirado"));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Erro: " + e.getMessage()));
        }
    }
}
