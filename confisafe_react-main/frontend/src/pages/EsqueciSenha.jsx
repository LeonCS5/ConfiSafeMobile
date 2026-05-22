import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/esqueci-senha.css';

const EsqueciSenha = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [formData, setFormData] = useState({
    novaSenha: '',
    confirmarSenha: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Validações em tempo real
  const passwordChecks = {
    length: formData.novaSenha.length >= 8,
    uppercase: /[A-Z]/.test(formData.novaSenha),
    lowercase: /[a-z]/.test(formData.novaSenha),
    number: /[0-9]/.test(formData.novaSenha),
    match: formData.novaSenha && formData.novaSenha === formData.confirmarSenha
  };

  const allChecksPassed = Object.values(passwordChecks).every(Boolean);

  // Step 1: Verificar email
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Por favor, digite seu e-mail.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor, digite um e-mail válido.');
      return;
    }

    setLoading(true);

    try {
      await api.post('/auth/verificar-email', { email: email.toLowerCase().trim() });
      setStep(2);
    } catch (err) {
      if (err.response?.status === 404) {
        setError('E-mail não encontrado. Verifique o endereço digitado.');
      } else {
        setError('Erro ao verificar e-mail. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Redefinir senha
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!allChecksPassed) {
      setError('Por favor, atenda todos os requisitos da senha.');
      return;
    }

    setLoading(true);

    try {
      await api.post('/auth/redefinir-senha-direta', {
        email: email.toLowerCase().trim(),
        novaSenha: formData.novaSenha
      });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.erro || 'Erro ao redefinir senha. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  // Tela de sucesso
  if (success) {
    return (
      <div className="forgot-page">
        <div className="forgot-card success-card">
          <div className="success-animation">
            <div className="success-circle">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          </div>
          <h2>Senha Alterada!</h2>
          <p>Sua senha foi redefinida com sucesso.<br />Use sua nova senha para acessar o sistema.</p>
          <button className="btn-primary" onClick={() => navigate('/login')}>
            Fazer Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="forgot-page">
      <div className="forgot-card">
        {/* Logo */}
        <div className="forgot-logo">
          <span className="logo-confi">Confi</span>
          <span className="logo-safe">Safe</span>
        </div>

        {/* Progress Steps */}
        <div className="progress-steps">
          <div className={`step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
            <div className="step-circle">
              {step > 1 ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              ) : '1'}
            </div>
            <span>Verificar</span>
          </div>
          <div className={`step-line ${step > 1 ? 'active' : ''}`}></div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}>
            <div className="step-circle">2</div>
            <span>Nova Senha</span>
          </div>
        </div>

        {step === 1 ? (
          // Step 1: Email
          <div className="step-content">
            <div className="step-icon email-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <h2>Recuperar Senha</h2>
            <p className="step-description">
              Digite o e-mail cadastrado para verificar sua identidade.
            </p>

            <form onSubmit={handleEmailSubmit}>
              <div className="input-group">
                <label htmlFor="email">E-mail corporativo</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  placeholder="seuemail@empresa.com"
                  required
                  disabled={loading}
                  autoFocus
                  className={error ? 'error' : ''}
                />
              </div>

              {error && (
                <div className="error-box">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                  </svg>
                  {error}
                </div>
              )}

              <button type="submit" className="btn-primary" disabled={loading || !email.trim()}>
                {loading ? <><span className="spinner"></span> Verificando...</> : 'Continuar'}
              </button>
            </form>
          </div>
        ) : (
          // Step 2: Nova Senha
          <div className="step-content">
            <div className="step-icon lock-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <h2>Criar Nova Senha</h2>
            
            <div className="verified-badge">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <span>{email}</span>
            </div>

            <form onSubmit={handlePasswordSubmit}>
              <div className="input-group">
                <label htmlFor="novaSenha">Nova senha</label>
                <div className="password-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="novaSenha"
                    name="novaSenha"
                    value={formData.novaSenha}
                    onChange={handleChange}
                    placeholder="Digite sua nova senha"
                    required
                    disabled={loading}
                    autoFocus
                  />
                  <button type="button" className="toggle-btn" onClick={() => setShowPassword(!showPassword)} tabIndex={-1}>
                    {showPassword ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="confirmarSenha">Confirmar senha</label>
                <div className="password-wrapper">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmarSenha"
                    name="confirmarSenha"
                    value={formData.confirmarSenha}
                    onChange={handleChange}
                    placeholder="Confirme sua nova senha"
                    required
                    disabled={loading}
                    className={formData.confirmarSenha && !passwordChecks.match ? 'error' : ''}
                  />
                  <button type="button" className="toggle-btn" onClick={() => setShowConfirmPassword(!showConfirmPassword)} tabIndex={-1}>
                    {showConfirmPassword ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Password Checklist */}
              <div className="password-checklist">
                <div className={`check-item ${passwordChecks.length ? 'valid' : ''}`}>
                  <span className="check-icon">{passwordChecks.length ? '✓' : '○'}</span>
                  Mínimo 8 caracteres
                </div>
                <div className={`check-item ${passwordChecks.uppercase ? 'valid' : ''}`}>
                  <span className="check-icon">{passwordChecks.uppercase ? '✓' : '○'}</span>
                  Uma letra maiúscula
                </div>
                <div className={`check-item ${passwordChecks.lowercase ? 'valid' : ''}`}>
                  <span className="check-icon">{passwordChecks.lowercase ? '✓' : '○'}</span>
                  Uma letra minúscula
                </div>
                <div className={`check-item ${passwordChecks.number ? 'valid' : ''}`}>
                  <span className="check-icon">{passwordChecks.number ? '✓' : '○'}</span>
                  Um número
                </div>
                <div className={`check-item ${passwordChecks.match ? 'valid' : ''}`}>
                  <span className="check-icon">{passwordChecks.match ? '✓' : '○'}</span>
                  Senhas coincidem
                </div>
              </div>

              {error && (
                <div className="error-box">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                  </svg>
                  {error}
                </div>
              )}

              <button type="submit" className="btn-primary" disabled={loading || !allChecksPassed}>
                {loading ? <><span className="spinner"></span> Redefinindo...</> : 'Redefinir Senha'}
              </button>

              <button type="button" className="btn-secondary" onClick={() => { setStep(1); setError(''); setFormData({ novaSenha: '', confirmarSenha: '' }); }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                Usar outro e-mail
              </button>
            </form>
          </div>
        )}

        <Link to="/login" className="back-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Voltar ao login
        </Link>
      </div>
    </div>
  );
};

export default EsqueciSenha;
