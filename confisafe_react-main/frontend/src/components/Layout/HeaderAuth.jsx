import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const HeaderAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const handleLogout = () => {
    if (window.confirm('Deseja realmente sair do sistema?')) {
      sessionStorage.clear();
      localStorage.clear();
      navigate('/login');
    }
  };

  return (
    <header className="navbar">
      <h1 className="logo">
        <Link to="/inicial">
          <span className="conf">Confi</span>
          <span className="safe">Safe</span>
        </Link>
      </h1>

      <nav className="menu">
        <Link 
          to="/inicial" 
          className={location.pathname === '/inicial' ? 'active' : ''}
        >
          Início
        </Link>
        <Link 
          to="/configuracoes" 
          className={location.pathname === '/configuracoes' ? 'active' : ''}
        >
          Configurações
        </Link>
        <button className="btn-logout" onClick={handleLogout}>
          Sair
        </button>
      </nav>

      <button 
        className="menu-toggle" 
        id="menuToggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>
  );
};

export default HeaderAuth;
