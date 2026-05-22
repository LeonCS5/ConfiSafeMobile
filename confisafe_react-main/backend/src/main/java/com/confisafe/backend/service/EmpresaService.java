package com.confisafe.backend.service;

import com.confisafe.backend.dto.CadastroEmpresaRequest;
import com.confisafe.backend.model.Empresa;
import com.confisafe.backend.repository.EmpresaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EmpresaService {

    @Autowired
    private EmpresaRepository empresaRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public Empresa cadastrar(CadastroEmpresaRequest request) {
        // Validar CNPJ duplicado
        if (empresaRepository.existsByCnpj(request.getCnpj())) {
            throw new RuntimeException("CNPJ já cadastrado");
        }

        // Validar e-mail duplicado
        if (empresaRepository.existsByEmailCorporativo(request.getEmailCorporativo())) {
            throw new RuntimeException("E-mail já cadastrado");
        }

        // Validar CPF duplicado
        if (empresaRepository.existsByCpf(request.getCpf())) {
            throw new RuntimeException("CPF já cadastrado");
        }

        // Criar entidade Empresa
        Empresa empresa = new Empresa();
        empresa.setRazaoSocial(request.getRazaoSocial());
        empresa.setCnpj(request.getCnpj());
        empresa.setEmailCorporativo(request.getEmailCorporativo());
        empresa.setTelefone(request.getTelefone());
        empresa.setNomeResponsavel(request.getNomeResponsavel());
        empresa.setCpf(request.getCpf());
        empresa.setCargo(request.getCargo());
        empresa.setDepartamento(request.getDepartamento());
        empresa.setRamal(request.getRamal());

        // Criptografar senha com BCrypt
        empresa.setSenha(passwordEncoder.encode(request.getSenha()));

        return empresaRepository.save(empresa);
    }
}
