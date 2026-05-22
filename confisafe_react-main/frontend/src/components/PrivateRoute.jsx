import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * Componente para proteger rotas que requerem autenticação
 * Redireciona para /login se o usuário não estiver autenticado
 */
const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const token = sessionStorage.getItem('confisafe_token');

  // Se não há token, redireciona para login
  // Salva a rota atual para redirecionar após o login
  if (!token) {
    return (
      <Navigate 
        to="/login" 
        state={{ from: location.pathname }} 
        replace 
      />
    );
  }

  // Se está autenticado, renderiza o conteúdo
  return children;
};

export default PrivateRoute;
