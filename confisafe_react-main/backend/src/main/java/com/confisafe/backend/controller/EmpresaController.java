package com.confisafe.backend.controller;

import com.confisafe.backend.dto.CadastroEmpresaRequest;
import com.confisafe.backend.model.Empresa;
import com.confisafe.backend.service.EmpresaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/empresas")
public class EmpresaController {

    @Autowired
    private EmpresaService empresaService;

    @PostMapping
    public ResponseEntity<?> cadastrar(@Valid @RequestBody CadastroEmpresaRequest request) {
        try {
            Empresa empresa = empresaService.cadastrar(request);
            
            Map<String, Object> response = new HashMap<>();
            response.put("mensagem", "Empresa cadastrada com sucesso!");
            response.put("empresaId", empresa.getId());
            
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
            
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("erro", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }
}
