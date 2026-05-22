import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ showLoginButton = true }) => {
  return (
    <header className="navbar">
      <div className="logo">
        <span className="conf">Confi</span>
        <span className="safe">Safe</span>
      </div>
      <nav className="menu">
        <Link to="/">Serviços</Link>
        <Link to="/contato">Contato</Link>
        {showLoginButton && <Link to="/login" className="btn-login">Login</Link>}
      </nav>
    </header>
  );
};

export default Header;
