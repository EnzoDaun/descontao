package com.example.descontaobackend.config;

import com.example.descontaobackend.service.PasswordResetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@EnableScheduling
public class ScheduledTasks {

    @Autowired
    private PasswordResetService passwordResetService;

    // Executa a limpeza de tokens expirados a cada 6 horas
    @Scheduled(fixedRate = 21600000)
    public void cleanupExpiredTokens() {
        passwordResetService.cleanupExpiredTokens();
    }
}
