import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import empresaService from '../services/empresaService';
import '../styles/cadastro.css';

const Cadastro = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    razaoSocial: '',
    cnpj: '',
    emailCorporativo: '',
    telefone: '',
    nomeResponsavel: '',
    cpf: '',
    cargo: '',
    departamento: 'seguranca',
    ramal: '',
    senha: '',
    confirmarSenha: '',
    termos: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    setMessage({ type: '', text: '' });
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.razaoSocial.trim()) newErrors.razaoSocial = 'Razão Social é obrigatória';
      if (!formData.cnpj.trim()) newErrors.cnpj = 'CNPJ é obrigatório';
      if (!formData.emailCorporativo.trim()) newErrors.emailCorporativo = 'E-mail é obrigatório';
      if (!formData.telefone.trim()) newErrors.telefone = 'Telefone é obrigatório';
    } else if (step === 2) {
      if (!formData.nomeResponsavel.trim()) newErrors.nomeResponsavel = 'Nome é obrigatório';
      if (!formData.cpf.trim()) newErrors.cpf = 'CPF é obrigatório';
      if (!formData.cargo.trim()) newErrors.cargo = 'Cargo é obrigatório';
    } else if (step === 3) {
      if (formData.senha.length < 8) newErrors.senha = 'Mínimo 8 caracteres';
      if (formData.senha !== formData.confirmarSenha) newErrors.confirmarSenha = 'Senhas não conferem';
      if (!formData.termos) newErrors.termos = 'Aceite os termos para continuar';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const empresaData = {
        razaoSocial: formData.razaoSocial,
        cnpj: formData.cnpj,
        emailCorporativo: formData.emailCorporativo,
        telefone: formData.telefone,
        nomeResponsavel: formData.nomeResponsavel,
        cpf: formData.cpf,
        cargo: formData.cargo,
        senha: formData.senha,
        departamento: formData.departamento,
        ramal: formData.ramal
      };

      await empresaService.cadastrar(empresaData);
      setMessage({ type: 'success', text: 'Conta criada com sucesso! Redirecionando...' });
      
      setTimeout(() => navigate('/login'), 2000);
      
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      
      if (error.cnpj) setErrors(prev => ({ ...prev, cnpj: error.cnpj }));
      if (error.emailCorporativo) setErrors(prev => ({ ...prev, emailCorporativo: error.emailCorporativo }));
      if (error.cpf) setErrors(prev => ({ ...prev, cpf: error.cpf }));
      
      setMessage({ type: 'error', text: error.message || 'Erro ao cadastrar. Tente novamente.' });
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = () => {
    const { senha } = formData;
    let strength = 0;
    if (senha.length >= 8) strength++;
    if (/[A-Z]/.test(senha)) strength++;
    if (/[0-9]/.test(senha)) strength++;
    if (/[^A-Za-z0-9]/.test(senha)) strength++;
    return strength;
  };

  const getStrengthLabel = () => {
    const strength = passwordStrength();
    if (strength === 0) return { label: '', color: '' };
    if (strength === 1) return { label: 'Fraca', color: '#ef4444' };
    if (strength === 2) return { label: 'Média', color: '#f59e0b' };
    if (strength === 3) return { label: 'Boa', color: '#22c55e' };
    return { label: 'Forte', color: '#10b981' };
  };

  return (
    <div className="cadastro-page">
      {/* Lado Esquerdo - Branding */}
      <div className="cadastro-branding">
        <div className="branding-content">
          <Link to="/servicos" className="brand-logo">
            <div className="logo-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <path d="M9 12l2 2 4-4"/>
              </svg>
            </div>
            <h1><span>Confi</span><span>Safe</span></h1>
          </Link>

          <div className="branding-text">
            <h2>Comece a proteger sua equipe hoje</h2>
            <p>Junte-se a mais de 500 empresas que confiam no ConfiSafe para garantir a segurança dos seus colaboradores.</p>
          </div>

          <div className="benefits-list">
            <div className="benefit-item">
              <div className="benefit-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <div className="benefit-text">
                <strong>14 dias grátis</strong>
                <span>Teste todas as funcionalidades sem compromisso</span>
              </div>
            </div>
            
            <div className="benefit-item">
              <div className="benefit-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <div className="benefit-text">
                <strong>Sem cartão de crédito</strong>
                <span>Comece agora, pague depois se quiser</span>
              </div>
            </div>
            
            <div className="benefit-item">
              <div className="benefit-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <div className="benefit-text">
                <strong>Suporte dedicado</strong>
                <span>Equipe especializada para ajudar na implantação</span>
              </div>
            </div>
          </div>

          <div className="trust-badges">
            <div className="badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <span>SSL Seguro</span>
            </div>
            <div className="badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <span>LGPD Compliant</span>
            </div>
          </div>
        </div>

        <div className="branding-footer">
          <p>© 2025 ConfiSafe. Todos os direitos reservados.</p>
        </div>
      </div>

      {/* Lado Direito - Formulário */}
      <div className="cadastro-form-section">
        <div className="form-container">
          {/* Mobile Logo */}
          <Link to="/servicos" className="mobile-logo">
            <span className="logo-confi">Confi</span>
            <span className="logo-safe">Safe</span>
          </Link>

          {/* Progress Steps */}
          <div className="progress-steps">
            <div className={`step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
              <div className="step-number">
                {currentStep > 1 ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                ) : '1'}
              </div>
              <span className="step-label">Empresa</span>
            </div>
            <div className="step-line"></div>
            <div className={`step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
              <div className="step-number">
                {currentStep > 2 ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                ) : '2'}
              </div>
              <span className="step-label">Responsável</span>
            </div>
            <div className="step-line"></div>
            <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
              <div className="step-number">3</div>
              <span className="step-label">Acesso</span>
            </div>
          </div>

          <div className="form-header">
            <h2>
              {currentStep === 1 && 'Dados da Empresa'}
              {currentStep === 2 && 'Dados do Responsável'}
              {currentStep === 3 && 'Criar Acesso'}
            </h2>
            <p>
              {currentStep === 1 && 'Informe os dados da sua empresa'}
              {currentStep === 2 && 'Informe seus dados pessoais'}
              {currentStep === 3 && 'Defina sua senha de acesso'}
            </p>
          </div>

          {message.text && (
            <div className={`message-box ${message.type}`}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                {message.type === 'error' ? (
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                ) : (
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                )}
              </svg>
              <span>{message.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Step 1 - Dados da Empresa */}
            <div className={`form-step ${currentStep === 1 ? 'active' : ''}`}>
              <div className="input-row">
                <div className="input-group">
                  <label htmlFor="razaoSocial">Razão Social *</label>
                  <div className="input-wrapper">
                    <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 21h18"/>
                      <path d="M5 21V7l8-4v18"/>
                      <path d="M19 21V11l-6-4"/>
                      <path d="M9 9v.01"/>
                      <path d="M9 12v.01"/>
                      <path d="M9 15v.01"/>
                      <path d="M9 18v.01"/>
                    </svg>
                    <input
                      type="text"
                      id="razaoSocial"
                      name="razaoSocial"
                      placeholder="Nome completo da empresa"
                      value={formData.razaoSocial}
                      onChange={handleInputChange}
                      className={errors.razaoSocial ? 'error' : ''}
                    />
                  </div>
                  {errors.razaoSocial && <span className="error-text">{errors.razaoSocial}</span>}
                </div>
              </div>

              <div className="input-row">
                <div className="input-group">
                  <label htmlFor="cnpj">CNPJ *</label>
                  <div className="input-wrapper">
                    <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    <input
                      type="text"
                      id="cnpj"
                      name="cnpj"
                      placeholder="00.000.000/0000-00"
                      value={formData.cnpj}
                      onChange={handleInputChange}
                      maxLength="18"
                      className={errors.cnpj ? 'error' : ''}
                    />
                  </div>
                  {errors.cnpj && <span className="error-text">{errors.cnpj}</span>}
                </div>
              </div>

              <div className="input-row two-cols">
                <div className="input-group">
                  <label htmlFor="emailCorporativo">E-mail Corporativo *</label>
                  <div className="input-wrapper">
                    <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                    <input
                      type="email"
                      id="emailCorporativo"
                      name="emailCorporativo"
                      placeholder="contato@empresa.com.br"
                      value={formData.emailCorporativo}
                      onChange={handleInputChange}
                      className={errors.emailCorporativo ? 'error' : ''}
                    />
                  </div>
                  {errors.emailCorporativo && <span className="error-text">{errors.emailCorporativo}</span>}
                </div>

                <div className="input-group">
                  <label htmlFor="telefone">Telefone *</label>
                  <div className="input-wrapper">
                    <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                    <input
                      type="tel"
                      id="telefone"
                      name="telefone"
                      placeholder="(00) 00000-0000"
                      value={formData.telefone}
                      onChange={handleInputChange}
                      maxLength="15"
                      className={errors.telefone ? 'error' : ''}
                    />
                  </div>
                  {errors.telefone && <span className="error-text">{errors.telefone}</span>}
                </div>
              </div>
            </div>

            {/* Step 2 - Dados do Responsável */}
            <div className={`form-step ${currentStep === 2 ? 'active' : ''}`}>
              <div className="input-row">
                <div className="input-group">
                  <label htmlFor="nomeResponsavel">Nome Completo *</label>
                  <div className="input-wrapper">
                    <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    <input
                      type="text"
                      id="nomeResponsavel"
                      name="nomeResponsavel"
                      placeholder="Seu nome completo"
                      value={formData.nomeResponsavel}
                      onChange={handleInputChange}
                      className={errors.nomeResponsavel ? 'error' : ''}
                    />
                  </div>
                  {errors.nomeResponsavel && <span className="error-text">{errors.nomeResponsavel}</span>}
                </div>
              </div>

              <div className="input-row two-cols">
                <div className="input-group">
                  <label htmlFor="cpf">CPF *</label>
                  <div className="input-wrapper">
                    <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    <input
                      type="text"
                      id="cpf"
                      name="cpf"
                      placeholder="000.000.000-00"
                      value={formData.cpf}
                      onChange={handleInputChange}
                      maxLength="14"
                      className={errors.cpf ? 'error' : ''}
                    />
                  </div>
                  {errors.cpf && <span className="error-text">{errors.cpf}</span>}
                </div>

                <div className="input-group">
                  <label htmlFor="cargo">Cargo *</label>
                  <div className="input-wrapper">
                    <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                    </svg>
                    <input
                      type="text"
                      id="cargo"
                      name="cargo"
                      placeholder="Ex: Gerente de Segurança"
                      value={formData.cargo}
                      onChange={handleInputChange}
                      className={errors.cargo ? 'error' : ''}
                    />
                  </div>
                  {errors.cargo && <span className="error-text">{errors.cargo}</span>}
                </div>
              </div>

              <div className="input-row two-cols">
                <div className="input-group">
                  <label htmlFor="departamento">Departamento</label>
                  <div className="input-wrapper select-wrapper">
                    <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 3h7v7H3z"/>
                      <path d="M14 3h7v7h-7z"/>
                      <path d="M14 14h7v7h-7z"/>
                      <path d="M3 14h7v7H3z"/>
                    </svg>
                    <select
                      id="departamento"
                      name="departamento"
                      value={formData.departamento}
                      onChange={handleInputChange}
                    >
                      <option value="seguranca">Segurança do Trabalho</option>
                      <option value="producao">Produção</option>
                      <option value="manutencao">Manutenção</option>
                      <option value="administrativo">Administrativo</option>
                      <option value="rh">Recursos Humanos</option>
                    </select>
                  </div>
                </div>

                <div className="input-group">
                  <label htmlFor="ramal">Ramal (opcional)</label>
                  <div className="input-wrapper">
                    <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72"/>
                    </svg>
                    <input
                      type="text"
                      id="ramal"
                      name="ramal"
                      placeholder="0000"
                      value={formData.ramal}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 - Criar Acesso */}
            <div className={`form-step ${currentStep === 3 ? 'active' : ''}`}>
              <div className="input-row">
                <div className="input-group">
                  <label htmlFor="senha">Senha *</label>
                  <div className="input-wrapper">
                    <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="senha"
                      name="senha"
                      placeholder="Mínimo 8 caracteres"
                      value={formData.senha}
                      onChange={handleInputChange}
                      className={errors.senha ? 'error' : ''}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
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
                  {errors.senha && <span className="error-text">{errors.senha}</span>}
                  
                  {formData.senha && (
                    <div className="password-strength">
                      <div className="strength-bars">
                        {[1, 2, 3, 4].map((level) => (
                          <div
                            key={level}
                            className={`strength-bar ${passwordStrength() >= level ? 'active' : ''}`}
                            style={{ backgroundColor: passwordStrength() >= level ? getStrengthLabel().color : '' }}
                          />
                        ))}
                      </div>
                      <span style={{ color: getStrengthLabel().color }}>{getStrengthLabel().label}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="input-row">
                <div className="input-group">
                  <label htmlFor="confirmarSenha">Confirmar Senha *</label>
                  <div className="input-wrapper">
                    <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmarSenha"
                      name="confirmarSenha"
                      placeholder="Digite a senha novamente"
                      value={formData.confirmarSenha}
                      onChange={handleInputChange}
                      className={errors.confirmarSenha ? 'error' : ''}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
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
                  {errors.confirmarSenha && <span className="error-text">{errors.confirmarSenha}</span>}
                  {formData.confirmarSenha && formData.senha === formData.confirmarSenha && (
                    <span className="success-text">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      Senhas conferem
                    </span>
                  )}
                </div>
              </div>

              <div className="checkbox-wrapper">
                <label className="custom-checkbox">
                  <input
                    type="checkbox"
                    name="termos"
                    checked={formData.termos}
                    onChange={handleInputChange}
                  />
                  <span className="checkmark"></span>
                  <span className="checkbox-text">
                    Li e aceito os <Link to="#">Termos de Uso</Link> e a <Link to="#">Política de Privacidade</Link>
                  </span>
                </label>
                {errors.termos && <span className="error-text">{errors.termos}</span>}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="form-actions">
              {currentStep > 1 && (
                <button type="button" className="btn-secondary" onClick={prevStep}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="19" y1="12" x2="5" y2="12"/>
                    <polyline points="12 19 5 12 12 5"/>
                  </svg>
                  Voltar
                </button>
              )}
              
              {currentStep < 3 ? (
                <button type="button" className="btn-primary" onClick={nextStep}>
                  Continuar
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </button>
              ) : (
                <button type="submit" className="btn-primary btn-submit" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="spinner"></span>
                      Criando conta...
                    </>
                  ) : (
                    <>
                      Criar Conta Gratuita
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                        <polyline points="22 4 12 14.01 9 11.01"/>
                      </svg>
                    </>
                  )}
                </button>
              )}
            </div>
          </form>

          <div className="form-footer">
            <p>Já possui uma conta? <Link to="/login">Faça login</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
