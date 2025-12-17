package com.example.descontaobackend.repository;

import com.example.descontaobackend.entity.Comercio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface ComercioRepository extends JpaRepository<Comercio, Long> {

    Optional<Comercio> findByEmail(String email);

    boolean existsByEmail(String email);

    boolean existsByCnpj(Long cnpj);
}
