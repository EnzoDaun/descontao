package com.example.descontaobackend.repository;

import com.example.descontaobackend.entity.Associado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface AssociadoRepository extends JpaRepository<Associado, Long> {

    Optional<Associado> findByEmail(String email);

    boolean existsByEmail(String email);

    boolean existsByCpf(Long cpf);
}
