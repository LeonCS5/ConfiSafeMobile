import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  const userEmail = sessionStorage.getItem('confisafe_logged_email') || 'Usuário';
  const userName = userEmail.split('@')[0] || 'Usuário';

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/inicial', label: 'Painel Inicial', icon: 'home' },
    { path: '/controle-acesso', label: 'Controle de Acesso', icon: 'lock' },
    { path: '/epis', label: 'Monitoramento EPIs', icon: 'shield' },
    { path: '/treinamento', label: 'Treinamentos', icon: 'book' },
    { path: '/relatorio', label: 'Relatórios', icon: 'chart' },
  ];

  const getIcon = (iconName) => {
    const icons = {
      home: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>,
      lock: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>,
      shield: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"></path></svg>,
      box: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>,
      users: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-3-3.87"></path><path d="M7 21v-2a4 4 0 0 1 3-3.87"></path><circle cx="12" cy="7" r="4"></circle></svg>,
      book: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>,
      chart: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>,
    };
    return icons[iconName] || null;
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="user-info">
        <img src="https://via.placeholder.com/70" alt="Foto de perfil" className="user-avatar" />
        <h2 className="user-name">{userName}</h2>
        <p className="user-role">Administrador</p>
      </div>

      <nav className="sidebar-nav">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
          >
            {getIcon(link.icon)}
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
