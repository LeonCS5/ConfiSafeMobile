package com.confisafe.backend.repository;

import com.confisafe.backend.model.Empresa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmpresaRepository extends JpaRepository<Empresa, Long> {
    Optional<Empresa> findByCnpj(String cnpj);
    Optional<Empresa> findByEmailCorporativo(String email);
    Optional<Empresa> findByCpf(String cpf);
    boolean existsByCnpj(String cnpj);
    boolean existsByEmailCorporativo(String email);
    boolean existsByCpf(String cpf);
}
