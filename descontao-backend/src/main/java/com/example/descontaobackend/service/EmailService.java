package com.example.descontaobackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Value("${app.frontend.url}")
    private String frontendUrl;

    public void sendPasswordResetEmail(String toEmail, String token, String userName) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);
            message.setFrom(fromEmail);
            message.setSubject("Redefinição de Senha - Sistema de Cupons");

            String resetLink = frontendUrl + "/reset-password?token=" + token;

            String body = String.format(
                "Olá %s,\n\n" +
                "Você solicitou a redefinição da sua senha no nosso sistema Descontão.\n\n" +
                "Clique no link abaixo para criar uma nova senha:\n" +
                "%s\n\n" +
                "Este link é válido por 1 hora.\n\n" +
                "Se você não solicitou esta redefinição, ignore este email.\n\n" +
                "Atenciosamente,\n" +
                "Equipe da Descontão",
                userName, resetLink
            );

            message.setText(body);
            mailSender.send(message);

        } catch (Exception e) {
            throw new RuntimeException("Erro ao enviar email: " + e.getMessage());
        }
    }

    public void sendPasswordChangeConfirmationEmail(String toEmail, String userName) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);
            message.setFrom(fromEmail);
            message.setSubject("Senha Alterada com Sucesso - Sistema de Cupons");

            String body = String.format(
                "Olá %s,\n\n" +
                "Sua senha foi alterada com sucesso no nosso sistema Descontão.\n\n" +
                "Se você não fez esta alteração, entre em contato conosco imediatamente.\n\n" +
                "Data da alteração: %s\n\n" +
                "Atenciosamente,\n" +
                "Equipe da Descontão",
                userName, java.time.LocalDateTime.now().format(java.time.format.DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm"))
            );

            message.setText(body);
            mailSender.send(message);

        } catch (Exception e) {
            throw new RuntimeException("Erro ao enviar email de confirmação: " + e.getMessage());
        }
    }
}
