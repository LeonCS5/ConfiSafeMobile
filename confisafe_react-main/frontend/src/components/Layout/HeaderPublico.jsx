import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/header-publico.css';

const HeaderPublico = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <header className="header-publico">
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
          <Link to="/servicos" className={isActive('/servicos')}>Início</Link>
          <Link to="/contato" className={isActive('/contato')}>Contato</Link>
        </nav>
        
        <div className="header-actions">
          <Link to="/login" className={`btn-header-secondary ${isActive('/login')}`}>Entrar</Link>
          <Link to="/cadastro" className={`btn-header-primary ${isActive('/cadastro')}`}>Começar Agora</Link>
        </div>

        {/* Menu Mobile */}
        <button className="mobile-menu-btn" aria-label="Menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default HeaderPublico;
