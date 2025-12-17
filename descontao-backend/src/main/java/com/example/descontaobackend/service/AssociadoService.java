package com.example.descontaobackend.service;

import com.example.descontaobackend.entity.Associado;
import com.example.descontaobackend.dto.AssociadoDto;
import com.example.descontaobackend.repository.AssociadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class AssociadoService {

    @Autowired
    private AssociadoRepository associadoRepository;

    public List<Associado> findAll() {
        return associadoRepository.findAll();
    }

    public Optional<Associado> findById(Long cpf) {
        return associadoRepository.findById(cpf);
    }

    public Optional<Associado> findByEmail(String email) {
        return associadoRepository.findByEmail(email);
    }

    public Associado save(AssociadoDto dto) {
        if (associadoRepository.existsByCpf(dto.getCpf())) {
            throw new RuntimeException("CPF já cadastrado");
        }
        if (associadoRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Email já cadastrado");
        }

        Associado associado = new Associado();
        associado.setCpf(dto.getCpf());
        associado.setNome(dto.getNome());
        associado.setDataNascimento(dto.getDataNascimento());
        associado.setEndereco(dto.getEndereco());
        associado.setBairro(dto.getBairro());
        associado.setCep(dto.getCep());
        associado.setCidade(dto.getCidade());
        associado.setUf(dto.getUf());
        associado.setCelular(dto.getCelular());
        associado.setEmail(dto.getEmail());
        associado.setSenha(dto.getSenha());

        return associadoRepository.save(associado);
    }


    public boolean existsByCpf(Long cpf) {
        return associadoRepository.existsByCpf(cpf);
    }

    public boolean existsByEmail(String email) {
        return associadoRepository.existsByEmail(email);
    }
}
