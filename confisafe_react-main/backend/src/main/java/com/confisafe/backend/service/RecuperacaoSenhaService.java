package com.confisafe.backend.service;

import com.confisafe.backend.model.Empresa;
import com.confisafe.backend.model.Usuario;
import com.confisafe.backend.repository.EmpresaRepository;
import com.confisafe.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class RecuperacaoSenhaService {

    @Autowired
    private EmpresaRepository empresaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    /**
     * Verifica se o email existe no sistema (empresa ou usuário)
     */
    public boolean verificarEmailExiste(String email) {
        String emailNormalizado = email.toLowerCase().trim();
        return empresaRepository.existsByEmailCorporativo(emailNormalizado) || 
               usuarioRepository.existsByEmail(emailNormalizado);
    }

    /**
     * Redefine a senha diretamente (sem token por email)
     * Usado quando o usuário já verificou que o email existe
     */
    @Transactional
    public void redefinirSenhaDireta(String email, String novaSenha) {
        String emailNormalizado = email.toLowerCase().trim();
        String novaSenhaEncriptada = passwordEncoder.encode(novaSenha);

        // Tenta atualizar na tabela de empresas
        Optional<Empresa> empresa = empresaRepository.findByEmailCorporativo(emailNormalizado);
        if (empresa.isPresent()) {
            Empresa e = empresa.get();
            e.setSenha(novaSenhaEncriptada);
            empresaRepository.save(e);
            System.out.println("Senha redefinida com sucesso para empresa: " + emailNormalizado);
            return;
        }

        // Tenta atualizar na tabela de usuários
        Optional<Usuario> usuario = usuarioRepository.findByEmail(emailNormalizado);
        if (usuario.isPresent()) {
            Usuario u = usuario.get();
            u.setSenha(novaSenhaEncriptada);
            usuarioRepository.save(u);
            System.out.println("Senha redefinida com sucesso para usuário: " + emailNormalizado);
            return;
        }

        throw new IllegalArgumentException("E-mail não encontrado no sistema.");
    }
}
