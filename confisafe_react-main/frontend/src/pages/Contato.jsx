import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/contato.css';

const Contato = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    empresa: '',
    telefone: '',
    motivo: '',
    mensagem: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setMessage({ type: '', text: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nome.trim() || !formData.email.trim() || !formData.motivo || !formData.mensagem.trim()) {
      setMessage({ type: 'error', text: 'Por favor, preencha todos os campos obrigatórios.' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitted(true);
      setFormData({ nome: '', email: '', empresa: '', telefone: '', motivo: '', mensagem: '' });
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      setMessage({ type: 'error', text: 'Erro ao enviar mensagem. Tente novamente.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contato-page">
      {/* Header */}
      <header className="contato-header">
        <div className="header-container">
          <Link to="/servicos" className="header-logo">
            <div className="logo-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <h1><span>Confi</span><span>Safe</span></h1>
          </Link>
          
          <nav className="header-nav">
            <Link to="/servicos">Início</Link>
            <Link to="/contato" className="active">Contato</Link>
          </nav>
          
          <div className="header-actions">
            <Link to="/login" className="btn-header-secondary">Entrar</Link>
            <Link to="/cadastro" className="btn-header-primary">Começar Agora</Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="contato-hero">
        <div className="hero-background">
          <div className="hero-pattern"></div>
        </div>
        <div className="hero-content">
          <div className="hero-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <span>Estamos aqui para ajudar</span>
          </div>
          <h1>Entre em Contato</h1>
          <p>Nossa equipe está pronta para atender você. Escolha o melhor canal ou envie sua mensagem.</p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="contato-cards">
        <div className="cards-container">
          <div className="contact-card">
            <div className="card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </div>
            <h3>Telefone</h3>
            <p>Atendimento comercial</p>
            <a href="tel:+551140028922" className="card-link">(11) 4002-8922</a>
            <span className="card-info">Seg - Sex, 9h às 18h</span>
          </div>

          <div className="contact-card highlight">
            <div className="card-badge">Resposta Rápida</div>
            <div className="card-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <h3>WhatsApp</h3>
            <p>Suporte instantâneo</p>
            <a href="https://wa.me/5511999999999" target="_blank" rel="noreferrer" className="card-link btn-whatsapp">
              Iniciar Conversa
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
            <span className="card-info">Resposta em até 2h</span>
          </div>

          <div className="contact-card">
            <div className="card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <h3>E-mail</h3>
            <p>Para assuntos gerais</p>
            <a href="mailto:contato@confisafe.com.br" className="card-link">contato@confisafe.com.br</a>
            <span className="card-info">Resposta em até 24h</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="contato-main">
        <div className="main-container">
          {/* Form Side */}
          <div className="form-section">
            {!submitted ? (
              <>
                <div className="form-header">
                  <h2>Envie sua Mensagem</h2>
                  <p>Preencha o formulário e nossa equipe entrará em contato</p>
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

                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-row two-cols">
                    <div className="input-group">
                      <label htmlFor="nome">Nome completo *</label>
                      <div className="input-wrapper">
                        <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                          <circle cx="12" cy="7" r="4"/>
                        </svg>
                        <input
                          type="text"
                          id="nome"
                          name="nome"
                          placeholder="Seu nome"
                          value={formData.nome}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="input-group">
                      <label htmlFor="email">E-mail *</label>
                      <div className="input-wrapper">
                        <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                          <polyline points="22,6 12,13 2,6"/>
                        </svg>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          placeholder="seu@email.com"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-row two-cols">
                    <div className="input-group">
                      <label htmlFor="empresa">Empresa</label>
                      <div className="input-wrapper">
                        <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M3 21h18"/>
                          <path d="M5 21V7l8-4v18"/>
                          <path d="M19 21V11l-6-4"/>
                        </svg>
                        <input
                          type="text"
                          id="empresa"
                          name="empresa"
                          placeholder="Nome da empresa"
                          value={formData.empresa}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="input-group">
                      <label htmlFor="telefone">Telefone</label>
                      <div className="input-wrapper">
                        <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72"/>
                        </svg>
                        <input
                          type="tel"
                          id="telefone"
                          name="telefone"
                          placeholder="(00) 00000-0000"
                          value={formData.telefone}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="input-group">
                      <label htmlFor="motivo">Assunto *</label>
                      <div className="input-wrapper select-wrapper">
                        <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"/>
                          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                          <line x1="12" y1="17" x2="12.01" y2="17"/>
                        </svg>
                        <select
                          id="motivo"
                          name="motivo"
                          value={formData.motivo}
                          onChange={handleInputChange}
                        >
                          <option value="">Selecione o assunto...</option>
                          <option value="comercial">💼 Informações Comerciais</option>
                          <option value="demonstracao">🎯 Solicitar Demonstração</option>
                          <option value="suporte">🔧 Suporte Técnico</option>
                          <option value="parceria">🤝 Proposta de Parceria</option>
                          <option value="feedback">💬 Feedback / Sugestão</option>
                          <option value="outros">📋 Outros Assuntos</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="input-group">
                      <label htmlFor="mensagem">Mensagem *</label>
                      <div className="input-wrapper textarea-wrapper">
                        <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                        </svg>
                        <textarea
                          id="mensagem"
                          name="mensagem"
                          placeholder="Descreva detalhadamente sua solicitação..."
                          rows="5"
                          value={formData.mensagem}
                          onChange={handleInputChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="btn-submit" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="spinner"></span>
                        Enviando...
                      </>
                    ) : (
                      <>
                        Enviar Mensagem
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="22" y1="2" x2="11" y2="13"/>
                          <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              </>
            ) : (
              <div className="success-state">
                <div className="success-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <h2>Mensagem Enviada!</h2>
                <p>Obrigado pelo seu contato. Nossa equipe responderá em até 24 horas úteis.</p>
                <button className="btn-new-message" onClick={() => setSubmitted(false)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  Enviar nova mensagem
                </button>
              </div>
            )}
          </div>

          {/* Info Side */}
          <div className="info-section">
            <div className="info-card">
              <h3>Informações</h3>
              
              <div className="info-item">
                <div className="info-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div className="info-content">
                  <h4>Endereço</h4>
                  <p>Av. Paulista, 1000 - 10º andar<br/>Bela Vista, São Paulo - SP<br/>CEP: 01310-100</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div className="info-content">
                  <h4>Horário de Atendimento</h4>
                  <p>Segunda a Sexta: 9h às 18h<br/>Sábado: 9h às 13h</p>
                </div>
              </div>

              <div className="info-divider"></div>

              <div className="social-section">
                <h4>Siga-nos</h4>
                <div className="social-links">
                  <a href="#linkedin" className="social-link" aria-label="LinkedIn">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href="#instagram" className="social-link" aria-label="Instagram">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a href="#youtube" className="social-link" aria-label="YouTube">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* FAQ Preview */}
            <div className="faq-preview">
              <h3>Perguntas Frequentes</h3>
              <div className="faq-item">
                <h4>Quanto tempo leva para implementar?</h4>
                <p>A implementação completa leva de 2 a 4 semanas, dependendo do porte da empresa.</p>
              </div>
              <div className="faq-item">
                <h4>Vocês oferecem período de teste?</h4>
                <p>Sim! Oferecemos 14 dias gratuitos para você conhecer todas as funcionalidades.</p>
              </div>
              <Link to="/servicos" className="faq-link">
                Ver todas as perguntas
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="contato-map">
        <div className="map-container">
          <div className="map-overlay">
            <div className="map-card">
              <h3>Visite nosso Escritório</h3>
              <p>Av. Paulista, 1000 - 10º andar<br/>Bela Vista, São Paulo - SP</p>
              <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="btn-directions">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="3 11 22 2 13 21 11 13 3 11"/>
                </svg>
                Como Chegar
              </a>
            </div>
          </div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.0976951333286!2d-46.65512668502264!3d-23.56509798468095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1639665844456!5m2!1spt-BR!2sbr"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Localização ConfiSafe"
          ></iframe>
        </div>
      </section>

      {/* Footer */}
      <footer className="contato-footer">
        <div className="footer-container">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="logo-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <span><strong>Confi</strong>Safe</span>
            </div>
            <p>Protegendo vidas através da tecnologia.</p>
          </div>
          <div className="footer-copyright">
            <p>© 2025 ConfiSafe. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contato;
