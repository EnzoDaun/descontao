package com.example.descontaobackend.service;

import com.example.descontaobackend.entity.Categoria;
import com.example.descontaobackend.dto.CategoriaDto;
import com.example.descontaobackend.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    public List<CategoriaDto> findAll() {
        return categoriaRepository.findAll().stream()
            .map(this::toDto)
            .collect(Collectors.toList());
    }

    public CategoriaDto findById(Integer id) {
        Categoria categoria = categoriaRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));
        return toDto(categoria);
    }

    private CategoriaDto toDto(Categoria categoria) {
        return new CategoriaDto(categoria.getId(), categoria.getNome());
    }
}
