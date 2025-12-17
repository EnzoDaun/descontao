package com.example.descontaobackend.repository;

import com.example.descontaobackend.entity.PasswordResetToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {

    Optional<PasswordResetToken> findByToken(String token);

    Optional<PasswordResetToken> findByEmailAndUserType(String email, String userType);

    void deleteByExpiryDateBefore(LocalDateTime dateTime);

    void deleteByEmailAndUserType(String email, String userType);
}
