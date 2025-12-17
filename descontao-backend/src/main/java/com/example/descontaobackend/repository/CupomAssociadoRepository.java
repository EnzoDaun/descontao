package com.example.descontaobackend.repository;

import com.example.descontaobackend.entity.CupomAssociado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface CupomAssociadoRepository extends JpaRepository<CupomAssociado, Integer> {

    List<CupomAssociado> findByAssociado_Cpf(Long cpf);

    List<CupomAssociado> findByCupom_Comercio_Cnpj(Long cnpj);

    Optional<CupomAssociado> findByCupom_NumeroAndAssociado_Cpf(String numeroCupom, Long cpf);

    boolean existsByCupom_Numero(String numeroCupom);
}
