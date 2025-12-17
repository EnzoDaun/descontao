package com.example.descontaobackend.service;

import com.example.descontaobackend.entity.Comercio;
import com.example.descontaobackend.entity.Categoria;
import com.example.descontaobackend.dto.ComercioDto;
import com.example.descontaobackend.repository.ComercioRepository;
import com.example.descontaobackend.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ComercioService {

    @Autowired
    private ComercioRepository comercioRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    public List<Comercio> findAll() {
        return comercioRepository.findAll();
    }

    public Optional<Comercio> findById(Long cnpj) {
        return comercioRepository.findById(cnpj);
    }

    public Optional<Comercio> findByEmail(String email) {
        return comercioRepository.findByEmail(email);
    }

    public Comercio save(ComercioDto dto) {
        if (comercioRepository.existsByCnpj(dto.getCnpj())) {
            throw new RuntimeException("CNPJ já cadastrado");
        }
        if (comercioRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Email já cadastrado");
        }

        Categoria categoria = categoriaRepository.findById(dto.getCategoriaId())
            .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));

        Comercio comercio = new Comercio();
        comercio.setCnpj(dto.getCnpj());
        comercio.setCategoria(categoria);
        comercio.setRazaoSocial(dto.getRazaoSocial());
        comercio.setNomeFantasia(dto.getNomeFantasia());
        comercio.setEndereco(dto.getEndereco());
        comercio.setBairro(dto.getBairro());
        comercio.setCep(dto.getCep());
        comercio.setCidade(dto.getCidade());
        comercio.setUf(dto.getUf());
        comercio.setContato(dto.getContato());
        comercio.setEmail(dto.getEmail());
        comercio.setSenha(dto.getSenha());

        return comercioRepository.save(comercio);
    }

    public Comercio update(Long cnpj, ComercioDto dto) {
        Comercio comercio = comercioRepository.findById(cnpj)
            .orElseThrow(() -> new RuntimeException("Comércio não encontrado"));

        if (dto.getCategoriaId() != null) {
            Categoria categoria = categoriaRepository.findById(dto.getCategoriaId())
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));
            comercio.setCategoria(categoria);
        }

        comercio.setRazaoSocial(dto.getRazaoSocial());
        comercio.setNomeFantasia(dto.getNomeFantasia());
        comercio.setEndereco(dto.getEndereco());
        comercio.setBairro(dto.getBairro());
        comercio.setCep(dto.getCep());
        comercio.setCidade(dto.getCidade());
        comercio.setUf(dto.getUf());
        comercio.setContato(dto.getContato());

        return comercioRepository.save(comercio);
    }

    public void delete(Long cnpj) {
        comercioRepository.deleteById(cnpj);
    }

    public boolean existsByCnpj(Long cnpj) {
        return comercioRepository.existsByCnpj(cnpj);
    }

    public boolean existsByEmail(String email) {
        return comercioRepository.existsByEmail(email);
    }
}
