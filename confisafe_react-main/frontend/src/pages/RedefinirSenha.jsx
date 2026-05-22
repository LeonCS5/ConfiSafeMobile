import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import api from '../services/api';
import '../styles/login.css';

function RedefinirSenha() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    novaSenha: '',
    confirmarSenha: ''
  });
  const [loading, setLoading] = useState(false);
  const [validating, setValidating] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const token = searchParams.get('token');

  useEffect(() => {
    const validarToken = async () => {
      if (!token) {
        setError('Token de recuperação não fornecido.');
        setValidating(false);
        return;
      }

      try {
        await api.get(`/auth/validar-token-recuperacao?token=${token}`);
        setTokenValid(true);
      } catch (err) {
        setError('Token inválido ou expirado. Solicite uma nova recuperação de senha.');
      } finally {
        setValidating(false);
      }
    };

    validarToken();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const validarSenha = (senha) => {
    if (senha.length < 8) {
      return 'A senha deve ter pelo menos 8 caracteres.';
    }
    if (!/[A-Z]/.test(senha)) {
      return 'A senha deve conter pelo menos uma letra maiúscula.';
    }
    if (!/[a-z]/.test(senha)) {
      return 'A senha deve conter pelo menos uma letra minúscula.';
    }
    if (!/[0-9]/.test(senha)) {
      return 'A senha deve conter pelo menos um número.';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validações
    const erroSenha = validarSenha(formData.novaSenha);
    if (erroSenha) {
      setError(erroSenha);
      return;
    }

    if (formData.novaSenha !== formData.confirmarSenha) {
      setError('As senhas não coincidem.');
      return;
    }

    setLoading(true);

    try {
      await api.post('/auth/redefinir-senha', {
        token: token,
        novaSenha: formData.novaSenha
      });
      setSuccess(true);
    } catch (err) {
      if (err.response?.status === 400) {
        setError(err.response.data || 'Token inválido ou expirado.');
      } else {
        setError('Erro ao redefinir senha. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Estado de carregamento enquanto valida token
  if (validating) {
    return (
      <div className="login-page">
        <div className="login-box forgot-password-box">
          <div className="login-header">
            <h1>ConfiSafe</h1>
          </div>
          <div className="validating-token">
            <div className="spinner"></div>
            <p>Validando token de recuperação...</p>
          </div>
        </div>
      </div>
    );
  }

  // Token inválido
  if (!tokenValid && !validating) {
    return (
      <div className="login-page">
        <div className="login-box forgot-password-box">
          <div className="login-header">
            <h1>ConfiSafe</h1>
          </div>
          <div className="token-invalid">
            <div className="error-icon">✕</div>
            <h2>Link Inválido</h2>
            <p>{error}</p>
            <Link to="/esqueci-senha" className="btn-primary">
              Solicitar nova recuperação
            </Link>
            <Link to="/login" className="back-to-login">
              ← Voltar ao login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Senha redefinida com sucesso
  if (success) {
    return (
      <div className="login-page">
        <div className="login-box forgot-password-box">
          <div className="login-header">
            <h1>ConfiSafe</h1>
          </div>
          <div className="success-container">
            <div className="success-icon">✓</div>
            <h2>Senha Redefinida!</h2>
            <p>
              Sua senha foi alterada com sucesso. 
              Você já pode fazer login com sua nova senha.
            </p>
            <button 
              className="btn-primary"
              onClick={() => navigate('/login')}
            >
              Ir para o Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Formulário de nova senha
  return (
    <div className="login-page">
      <div className="login-box forgot-password-box">
        <div className="login-header">
          <h1>ConfiSafe</h1>
        </div>

        <div className="forgot-password-content">
          <h2>Redefinir Senha</h2>
          <p className="forgot-password-description">
            Digite sua nova senha abaixo. A senha deve conter pelo menos 
            8 caracteres, incluindo letras maiúsculas, minúsculas e números.
          </p>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="novaSenha">Nova Senha</label>
              <input
                type="password"
                id="novaSenha"
                name="novaSenha"
                value={formData.novaSenha}
                onChange={handleChange}
                placeholder="Digite sua nova senha"
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmarSenha">Confirmar Senha</label>
              <input
                type="password"
                id="confirmarSenha"
                name="confirmarSenha"
                value={formData.confirmarSenha}
                onChange={handleChange}
                placeholder="Confirme sua nova senha"
                required
                disabled={loading}
              />
            </div>

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              className="btn-login"
              disabled={loading}
            >
              {loading ? 'Redefinindo...' : 'Redefinir Senha'}
            </button>
          </form>

          <div className="password-requirements">
            <p><strong>Requisitos da senha:</strong></p>
            <ul>
              <li className={formData.novaSenha.length >= 8 ? 'valid' : ''}>
                Mínimo 8 caracteres
              </li>
              <li className={/[A-Z]/.test(formData.novaSenha) ? 'valid' : ''}>
                Uma letra maiúscula
              </li>
              <li className={/[a-z]/.test(formData.novaSenha) ? 'valid' : ''}>
                Uma letra minúscula
              </li>
              <li className={/[0-9]/.test(formData.novaSenha) ? 'valid' : ''}>
                Um número
              </li>
            </ul>
          </div>

          <Link to="/login" className="back-to-login">
            ← Voltar ao login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RedefinirSenha;
