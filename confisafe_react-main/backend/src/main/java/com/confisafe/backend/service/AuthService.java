package com.confisafe.backend.service;

import com.confisafe.backend.dto.LoginRequest;
import com.confisafe.backend.dto.LoginResponse;
import com.confisafe.backend.dto.UsuarioDTO;
import com.confisafe.backend.model.Empresa;
import com.confisafe.backend.model.Usuario;
import com.confisafe.backend.repository.EmpresaRepository;
import com.confisafe.backend.repository.UsuarioRepository;
import com.confisafe.backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private EmpresaRepository empresaRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public LoginResponse login(LoginRequest request) {
        // Tentar buscar como Empresa primeiro
        Optional<Empresa> empresaOpt = empresaRepository.findByEmailCorporativo(request.getEmail());
        if (empresaOpt.isPresent()) {
            Empresa empresa = empresaOpt.get();
            if (passwordEncoder.matches(request.getSenha(), empresa.getSenha())) {
                String token = jwtUtil.generateToken(empresa.getEmailCorporativo());
                
                UsuarioDTO dto = new UsuarioDTO();
                dto.setId(empresa.getId());
                dto.setEmail(empresa.getEmailCorporativo());
                dto.setNomeCompleto(empresa.getNomeResponsavel());
                dto.setCargo(empresa.getCargo());
                dto.setDepartamento(empresa.getDepartamento());
                dto.setTelefone(empresa.getTelefone());
                
                return new LoginResponse(token, dto, "Login realizado com sucesso");
            }
        }

        // Tentar buscar como Usuario
        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(request.getEmail());
        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            if (passwordEncoder.matches(request.getSenha(), usuario.getSenha())) {
                String token = jwtUtil.generateToken(usuario.getEmail());
                
                UsuarioDTO dto = new UsuarioDTO();
                dto.setId(usuario.getId());
                dto.setEmail(usuario.getEmail());
                dto.setNomeCompleto(usuario.getNomeCompleto());
                dto.setCargo(usuario.getCargo());
                dto.setDepartamento(usuario.getDepartamento());
                dto.setTelefone(usuario.getTelefone());
                
                return new LoginResponse(token, dto, "Login realizado com sucesso");
            }
        }

        throw new RuntimeException("E-mail ou senha inválidos");
    }
}
