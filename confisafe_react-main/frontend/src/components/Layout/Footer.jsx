import React from 'react';
import '../../styles/footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-main">
        {/* Left: Brand & Status */}
        <div className="footer-brand">
          <div className="footer-logo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="M9 12l2 2 4-4"/>
            </svg>
            <span className="footer-logo-text">ConfiSafe</span>
          </div>
          <div className="footer-status">
            <span className="status-indicator"></span>
            <span className="status-text">Sistema operacional</span>
          </div>
        </div>

        {/* Center: Quick Links */}
        <nav className="footer-nav">
          <a href="#ajuda" className="footer-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            Ajuda
          </a>
          <span className="footer-divider"></span>
          <a href="#documentacao" className="footer-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
            Documentação
          </a>
          <span className="footer-divider"></span>
          <a href="mailto:suporte@confisafe.com.br" className="footer-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            Suporte
          </a>
          <span className="footer-divider"></span>
          <a href="#privacidade" className="footer-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            Privacidade
          </a>
          <span className="footer-divider"></span>
          <a href="#termos" className="footer-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            LGPD
          </a>
        </nav>

        {/* Right: Info & Badges */}
        <div className="footer-info">
          <div className="footer-badges">
            <span className="badge badge-compliance">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12l2 2 4-4"/>
                <circle cx="12" cy="12" r="10"/>
              </svg>
              NR-33
            </span>
            <span className="badge badge-version">v2.5.0</span>
          </div>
          <p className="footer-copyright">
            © {currentYear} ConfiSafe
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
