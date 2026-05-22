package com.confisafe.backend.controller;

import com.confisafe.backend.dto.EsqueciSenhaRequest;
import com.confisafe.backend.dto.LoginRequest;
import com.confisafe.backend.dto.LoginResponse;
import com.confisafe.backend.dto.RedefinirSenhaDiretaRequest;
import com.confisafe.backend.security.JwtUtil;
import com.confisafe.backend.service.AuthService;
import com.confisafe.backend.service.RecuperacaoSenhaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private RecuperacaoSenhaService recuperacaoSenhaService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        try {
            LoginResponse response = authService.login(request);
            return ResponseEntity.ok(response);
            
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("erro", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }
    }

    @GetMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String authHeader) {
        try {
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);
                
                if (jwtUtil.validateToken(token) && !jwtUtil.isTokenExpired(token)) {
                    Map<String, Object> response = new HashMap<>();
                    response.put("valido", true);
                    response.put("email", jwtUtil.extractEmail(token));
                    return ResponseEntity.ok(response);
                }
            }
            
            Map<String, Boolean> error = new HashMap<>();
            error.put("valido", false);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
            
        } catch (Exception e) {
            Map<String, Boolean> error = new HashMap<>();
            error.put("valido", false);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }
    }

    /**
     * Verifica se email existe no sistema
     * POST /api/auth/verificar-email
     */
    @PostMapping("/verificar-email")
    public ResponseEntity<?> verificarEmail(@Valid @RequestBody EsqueciSenhaRequest request) {
        try {
            boolean existe = recuperacaoSenhaService.verificarEmailExiste(request.getEmail());
            
            if (existe) {
                Map<String, String> response = new HashMap<>();
                response.put("mensagem", "E-mail verificado com sucesso.");
                return ResponseEntity.ok(response);
            } else {
                Map<String, String> error = new HashMap<>();
                error.put("erro", "E-mail não encontrado.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
            }
            
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("erro", "Erro ao verificar e-mail. Tente novamente.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    /**
     * Redefine a senha diretamente (sem token por email)
     * POST /api/auth/redefinir-senha-direta
     */
    @PostMapping("/redefinir-senha-direta")
    public ResponseEntity<?> redefinirSenhaDireta(@Valid @RequestBody RedefinirSenhaDiretaRequest request) {
        try {
            recuperacaoSenhaService.redefinirSenhaDireta(request.getEmail(), request.getNovaSenha());
            
            Map<String, String> response = new HashMap<>();
            response.put("mensagem", "Senha redefinida com sucesso!");
            return ResponseEntity.ok(response);
            
        } catch (IllegalArgumentException e) {
            Map<String, String> error = new HashMap<>();
            error.put("erro", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
            
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("erro", "Erro ao redefinir senha. Tente novamente.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
}
