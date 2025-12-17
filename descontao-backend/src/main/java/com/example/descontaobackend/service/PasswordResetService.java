package com.example.descontaobackend.service;

import com.example.descontaobackend.dto.ConfirmPasswordResetDto;
import com.example.descontaobackend.dto.RequestPasswordResetDto;
import com.example.descontaobackend.entity.Associado;
import com.example.descontaobackend.entity.Comercio;
import com.example.descontaobackend.entity.PasswordResetToken;
import com.example.descontaobackend.repository.AssociadoRepository;
import com.example.descontaobackend.repository.ComercioRepository;
import com.example.descontaobackend.repository.PasswordResetTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class PasswordResetService {

    @Autowired
    private PasswordResetTokenRepository tokenRepository;

    @Autowired
    private AssociadoRepository associadoRepository;

    @Autowired
    private ComercioRepository comercioRepository;

    @Autowired
    private EmailService emailService;

    @Transactional
    public void requestPasswordReset(RequestPasswordResetDto request) {
        String email = request.getEmail();
        String userType = request.getUserType();

        // Verificar se o usuário existe
        String userName = validateUserExists(email, userType);
        if (userName == null) {
            throw new RuntimeException("Usuário não encontrado com este email");
        }

        // Remover tokens antigos para este email e tipo de usuário
        tokenRepository.deleteByEmailAndUserType(email, userType);

        // Gerar token aleatório
        String token = generateRandomToken();

        // Criar novo token com expiração de 1 hora
        PasswordResetToken resetToken = new PasswordResetToken(
            token,
            email,
            userType,
            LocalDateTime.now().plusHours(1)
        );

        tokenRepository.save(resetToken);

        emailService.sendPasswordResetEmail(email, token, userName);
    }

    @Transactional
    public void confirmPasswordReset(ConfirmPasswordResetDto request) {
        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            throw new RuntimeException("As senhas não coincidem");
        }

        // Buscar token
        Optional<PasswordResetToken> optionalToken = tokenRepository.findByToken(request.getToken());
        if (!optionalToken.isPresent()) {
            throw new RuntimeException("Token inválido");
        }

        PasswordResetToken token = optionalToken.get();

        // Validar token
        if (!token.isValid()) {
            throw new RuntimeException("Token expirado ou já utilizado");
        }

        // Buscar usuário e atualizar senha
        String userName = updateUserPassword(token.getEmail(), token.getUserType(), request.getNewPassword());

        // Marcar token como usado
        token.setUsed(true);
        tokenRepository.save(token);

        // Enviar email de confirmação
        emailService.sendPasswordChangeConfirmationEmail(token.getEmail(), userName);
    }

    public boolean validateToken(String token) {
        Optional<PasswordResetToken> optionalToken = tokenRepository.findByToken(token);
        return optionalToken.isPresent() && optionalToken.get().isValid();
    }

    private String validateUserExists(String email, String userType) {
        if ("ASSOCIADO".equals(userType)) {
            Optional<Associado> associado = associadoRepository.findByEmail(email);
            return associado.map(Associado::getNome).orElse(null);
        } else if ("COMERCIO".equals(userType)) {
            Optional<Comercio> comercio = comercioRepository.findByEmail(email);
            return comercio.map(c -> c.getNomeFantasia() != null ? c.getNomeFantasia() : c.getRazaoSocial()).orElse(null);
        }
        return null;
    }

    private String updateUserPassword(String email, String userType, String newPassword) {
        if ("ASSOCIADO".equals(userType)) {
            Optional<Associado> optionalAssociado = associadoRepository.findByEmail(email);
            if (optionalAssociado.isPresent()) {
                Associado associado = optionalAssociado.get();
                associado.setSenha(newPassword);
                associadoRepository.save(associado);
                return associado.getNome();
            }
        } else if ("COMERCIO".equals(userType)) {
            Optional<Comercio> optionalComercio = comercioRepository.findByEmail(email);
            if (optionalComercio.isPresent()) {
                Comercio comercio = optionalComercio.get();
                comercio.setSenha(newPassword);
                comercioRepository.save(comercio);
                return comercio.getNomeFantasia() != null ? comercio.getNomeFantasia() : comercio.getRazaoSocial();
            }
        }

        throw new RuntimeException("Usuário não encontrado");
    }

    private String generateRandomToken() {
        SecureRandom random = new SecureRandom();
        StringBuilder token = new StringBuilder();
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (int i = 0; i < 32; i++) {
            token.append(chars.charAt(random.nextInt(chars.length())));
        }

        return token.toString();
    }

    @Transactional
    public void cleanupExpiredTokens() {
        tokenRepository.deleteByExpiryDateBefore(LocalDateTime.now());
    }
}
