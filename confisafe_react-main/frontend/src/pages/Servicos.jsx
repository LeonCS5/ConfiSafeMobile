import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderPublico from '../components/Layout/HeaderPublico';
import '../styles/servicos.css';

function Servicos() {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const servicos = [
    {
      id: 1,
      icone: 'camera',
      titulo: 'Monitoramento Inteligente',
      descricao: 'Sistema de câmeras com IA para detecção automática de EPIs em tempo real.',
      recursos: ['Detecção automática', 'Alertas em tempo real', 'Gravação em nuvem']
    },
    {
      id: 2,
      icone: 'clipboard',
      titulo: 'Gestão de EPIs',
      descricao: 'Plataforma completa para gerenciamento de equipamentos de proteção.',
      recursos: ['Controle de validade', 'Gestão de estoque', 'Rastreabilidade']
    },
    {
      id: 3,
      icone: 'graduacao',
      titulo: 'Treinamentos',
      descricao: 'Programas de capacitação personalizados com certificação digital.',
      recursos: ['Cursos online', 'Certificação digital', 'Relatórios de progresso']
    },
    {
      id: 4,
      icone: 'grafico',
      titulo: 'Consultoria em Segurança',
      descricao: 'Consultoria especializada em normas regulamentadoras.',
      recursos: ['Diagnóstico completo', 'Adequação às NRs', 'Auditorias periódicas']
    },
    {
      id: 5,
      icone: 'dashboard',
      titulo: 'Dashboard Analítico',
      descricao: 'Painel de controle com métricas e KPIs para tomada de decisão.',
      recursos: ['KPIs em tempo real', 'Relatórios customizados', 'Integração com BI']
    },
    {
      id: 6,
      icone: 'usuarios',
      titulo: 'Gestão de Funcionários',
      descricao: 'Sistema completo para gestão de colaboradores e certificações.',
      recursos: ['Cadastro completo', 'Histórico individual', 'Controle de acessos']
    }
  ];

  const faqs = [
    {
      pergunta: 'Como funciona a implementação?',
      resposta: 'Nossa equipe realiza diagnóstico inicial, instalação, configuração e treinamento completo em 2 a 4 semanas.'
    },
    {
      pergunta: 'O sistema atende às NRs?',
      resposta: 'Sim, desenvolvido em conformidade com NR-6, NR-12 e NR-35.'
    },
    {
      pergunta: 'Oferecem suporte técnico?',
      resposta: 'Suporte 24/7 via telefone, chat, e-mail e atendimento presencial.'
    },
    {
      pergunta: 'É possível integrar com outros sistemas?',
      resposta: 'Sim, possuímos API aberta para integração com ERPs e sistemas de RH.'
    }
  ];

  const renderIcone = (tipo) => {
    const icones = {
      camera: <><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2"/></>,
      clipboard: <><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M9 14l2 2 4-4"/></>,
      graduacao: <><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></>,
      grafico: <><path d="M21 21H3V3"/><path d="M21 9l-6 6-4-4-5 5"/></>,
      dashboard: <><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></>,
      usuarios: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>
    };
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        {icones[tipo]}
      </svg>
    );
  };

  return (
    <div className="servicos-page-simple">
      <HeaderPublico />

      {/* Hero Simples */}
      <section className="hero-simple">
        <div className="hero-simple-content">
          <h1>Nossos Serviços</h1>
          <p>Soluções completas em segurança do trabalho para sua empresa</p>
        </div>
      </section>

      {/* Grid de Serviços */}
      <section className="servicos-section">
        <div className="servicos-container">
          <div className="servicos-grid-simple">
            {servicos.map(servico => (
              <div key={servico.id} className="servico-card-simple">
                <div className="card-icon-simple">
                  {renderIcone(servico.icone)}
                </div>
                <h3>{servico.titulo}</h3>
                <p>{servico.descricao}</p>
                <ul>
                  {servico.recursos.map((recurso, idx) => (
                    <li key={idx}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      {recurso}
                    </li>
                  ))}
                </ul>
                <Link to="/contato" className="btn-simple">
                  Solicitar Proposta
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="diferenciais-simple">
        <div className="diferenciais-container-simple">
          <h2>Por que escolher a ConfiSafe?</h2>
          <div className="diferenciais-grid-simple">
            <div className="diferencial-item">
              <span className="diferencial-numero">500+</span>
              <span className="diferencial-texto">Empresas Atendidas</span>
            </div>
            <div className="diferencial-item">
              <span className="diferencial-numero">99.8%</span>
              <span className="diferencial-texto">Satisfação</span>
            </div>
            <div className="diferencial-item">
              <span className="diferencial-numero">24/7</span>
              <span className="diferencial-texto">Suporte</span>
            </div>
            <div className="diferencial-item">
              <span className="diferencial-numero">70%</span>
              <span className="diferencial-texto">Redução de Acidentes</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-simple">
        <div className="faq-container-simple">
          <h2>Perguntas Frequentes</h2>
          <div className="faq-list-simple">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`faq-item-simple ${expandedFaq === index ? 'expanded' : ''}`}
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
              >
                <div className="faq-question-simple">
                  <span>{faq.pergunta}</span>
                  <span className="faq-icon">{expandedFaq === index ? '−' : '+'}</span>
                </div>
                {expandedFaq === index && (
                  <div className="faq-answer-simple">
                    <p>{faq.resposta}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-simple">
        <div className="cta-container-simple">
          <h2>Pronto para começar?</h2>
          <p>Entre em contato e solicite uma demonstração gratuita.</p>
          <div className="cta-buttons-simple">
            <Link to="/contato" className="btn-primary-simple">Falar com Consultor</Link>
            <Link to="/cadastro" className="btn-secondary-simple">Criar Conta</Link>
          </div>
        </div>
      </section>

      {/* Footer Profissional */}
      <footer className="footer-pro">
        <div className="footer-pro-container">
          <div className="footer-pro-grid">
            {/* Coluna 1 - Marca */}
            <div className="footer-pro-col">
              <span className="footer-logo">
                <span style={{color: '#1a365d'}}>Confi</span>
                <span style={{color: '#00a454'}}>Safe</span>
              </span>
              <p className="footer-desc">Soluções completas em gestão de segurança do trabalho para empresas que valorizam suas equipes.</p>
              <div className="footer-social">
                <a href="#" aria-label="LinkedIn" className="social-link">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <a href="#" aria-label="Instagram" className="social-link">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              </div>
            </div>

            {/* Coluna 2 - Links */}
            <div className="footer-pro-col">
              <h4>Navegação</h4>
              <ul>
                <li><Link to="/inicial">Início</Link></li>
                <li><Link to="/servicos">Serviços</Link></li>
                <li><Link to="/contato">Contato</Link></li>
                <li><Link to="/cadastro">Cadastro</Link></li>
              </ul>
            </div>

            {/* Coluna 3 - Soluções */}
            <div className="footer-pro-col">
              <h4>Soluções</h4>
              <ul>
                <li><Link to="/servicos">Gestão de EPIs</Link></li>
                <li><Link to="/servicos">Controle de Acesso</Link></li>
                <li><Link to="/servicos">Treinamentos</Link></li>
                <li><Link to="/servicos">Relatórios</Link></li>
              </ul>
            </div>

            {/* Coluna 4 - Contato */}
            <div className="footer-pro-col">
              <h4>Contato</h4>
              <ul className="contact-list">
                <li>
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  contato@confisafe.com.br
                </li>
                <li>
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                  (11) 4000-0000
                </li>
                <li>
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  São Paulo, SP
                </li>
              </ul>
            </div>
          </div>

          {/* Linha divisória e copyright */}
          <div className="footer-bottom">
            <p>© 2025 ConfiSafe. Todos os direitos reservados.</p>
            <div className="footer-legal">
              <a href="#">Política de Privacidade</a>
              <a href="#">Termos de Uso</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Servicos;
