package com.example.descontaobackend.repository;

import com.example.descontaobackend.entity.Cupom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface CupomRepository extends JpaRepository<Cupom, String> {

    List<Cupom> findByComercio_Cnpj(Long cnpj);

    @Query("SELECT c FROM Cupom c WHERE c.dataInicio <= :hoje AND c.dataTermino >= :hoje " +
           "AND c NOT IN (SELECT ca.cupom FROM CupomAssociado ca)")
    List<Cupom> findCuponsDisponiveis(@Param("hoje") LocalDate hoje);

    @Query("SELECT c FROM Cupom c WHERE c.comercio.categoria.id = :categoriaId " +
           "AND c.dataInicio <= :hoje AND c.dataTermino >= :hoje " +
           "AND c NOT IN (SELECT ca.cupom FROM CupomAssociado ca)")
    List<Cupom> findCuponsDisponiveisPorCategoria(@Param("categoriaId") Integer categoriaId,
                                                   @Param("hoje") LocalDate hoje);
}
