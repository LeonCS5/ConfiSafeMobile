import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import authService from '../services/authService';
import '../styles/login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Pega a rota de origem (se foi redirecionado do PrivateRoute)
  const from = location.state?.from || '/inicial';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!email.trim() || !senha.trim()) {
      setMessage('Por favor, preencha todos os campos.');
      setMessageType('error');
      return;
    }

    setLoading(true);

    try {
      const response = await authService.login(email, senha);
      setMessage('Login realizado com sucesso!');
      setMessageType('success');

      setTimeout(() => {
        navigate(from, { replace: true });
      }, 800);
      
    } catch (error) {
      const errorMessage = error.message || 'E-mail ou senha inválidos.';
      setMessage(errorMessage);
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Lado Esquerdo - Branding */}
      <div className="login-branding">
        <div className="branding-content">
          <div className="brand-logo">
            <div className="logo-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <path d="M9 12l2 2 4-4"/>
              </svg>
            </div>
            <h1><span>Confi</span><span>Safe</span></h1>
          </div>
          
          <h2 className="brand-headline">Sistema de Monitoramento de EPIs com Inteligência Artificial</h2>
          
          <div className="brand-features">
            <div className="feature-item">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                </svg>
              </div>
              <div className="feature-text">
                <h4>Visão Computacional</h4>
                <p>Detecção automática de EPIs em tempo real</p>
              </div>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <div className="feature-text">
                <h4>Segurança Garantida</h4>
                <p>Conformidade com normas regulamentadoras</p>
              </div>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 3v18h18"/>
                  <path d="M18 17V9"/>
                  <path d="M13 17V5"/>
                  <path d="M8 17v-3"/>
                </svg>
              </div>
              <div className="feature-text">
                <h4>Relatórios Inteligentes</h4>
                <p>Análises e métricas em tempo real</p>
              </div>
            </div>
          </div>
          
          <div className="brand-stats">
            <div className="stat-item">
              <span className="stat-number">99.8%</span>
              <span className="stat-label">Precisão IA</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Monitoramento</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">-70%</span>
              <span className="stat-label">Acidentes</span>
            </div>
          </div>
        </div>
        
        <div className="branding-footer">
          <p>Protegendo vidas através da tecnologia</p>
        </div>
      </div>

      {/* Lado Direito - Formulário */}
      <div className="login-form-section">
        <div className="login-card">
          <div className="login-header">
            <div className="mobile-logo">
              <span className="logo-confi">Confi</span>
              <span className="logo-safe">Safe</span>
            </div>
            <h2>Bem-vindo de volta</h2>
            <p>Acesse sua conta corporativa</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <label htmlFor="email">E-mail corporativo</label>
              <div className="input-wrapper">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setMessage(''); }}
                  placeholder="seuemail@empresa.com"
                  required
                  disabled={loading}
                  autoComplete="email"
                  className={message && messageType === 'error' ? 'error' : ''}
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="senha">Senha</label>
              <div className="input-wrapper">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="senha"
                  value={senha}
                  onChange={(e) => { setSenha(e.target.value); setMessage(''); }}
                  placeholder="Digite sua senha"
                  required
                  disabled={loading}
                  autoComplete="current-password"
                  className={message && messageType === 'error' ? 'error' : ''}
                />
                <button 
                  type="button" 
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox-wrapper">
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="checkmark"></span>
                Lembrar-me
              </label>
              <Link to="/esqueci-senha" className="forgot-link">
                Esqueci minha senha
              </Link>
            </div>

            {message && (
              <div className={`message-box ${messageType}`}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  {messageType === 'error' ? (
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                  ) : (
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  )}
                </svg>
                {message}
              </div>
            )}

            <button type="submit" className="btn-login" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Autenticando...
                </>
              ) : (
                <>
                  Entrar
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </>
              )}
            </button>
          </form>

          <div className="login-divider">
            <span>ou</span>
          </div>

          <div className="register-section">
            <p>Primeira vez no ConfiSafe?</p>
            <Link to="/cadastro" className="btn-register">
              Criar conta empresarial
            </Link>
          </div>

          <div className="login-footer">
            <div className="security-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <path d="M9 12l2 2 4-4"/>
              </svg>
              <span>Conexão segura SSL</span>
            </div>
          </div>
        </div>

        <div className="form-section-footer">
          <p>© 2024 ConfiSafe. Todos os direitos reservados.</p>
          <div className="footer-links">
            <Link to="/contato">Suporte</Link>
            <span>•</span>
            <a href="#">Termos de Uso</a>
            <span>•</span>
            <a href="#">Privacidade</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
