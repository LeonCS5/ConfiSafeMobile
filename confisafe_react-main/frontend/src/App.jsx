import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import PrivateRoute from './components/PrivateRoute';

// =============================================================================
// IMPORTAÇÃO DE TODOS OS CSS (carrega tudo de uma vez para evitar flash sem estilo)
// =============================================================================
import './styles/tokens.css';
import './styles/base.css';
import './styles/components.css';
import './styles/layout.css';
import './styles/header.css';
import './styles/header-publico.css';
import './styles/sidebar.css';
import './styles/footer.css';
import './styles/login.css';
import './styles/cadastro.css';
import './styles/servicos.css';
import './styles/contato.css';
import './styles/esqueci-senha.css';
import './styles/inicial.css';
import './styles/epis.css';
import './styles/controle-acesso.css';
import './styles/treinamento.css';
import './styles/relatorio.css';
import './styles/configuracoes.css';

// =============================================================================
// LAZY LOADING - Carrega cada página apenas quando o usuário acessa
// Isso melhora MUITO a performance do carregamento inicial do site
// =============================================================================
const Login = lazy(() => import('./pages/Login'));
const Cadastro = lazy(() => import('./pages/Cadastro'));
const Contato = lazy(() => import('./pages/Contato'));
const Inicial = lazy(() => import('./pages/Inicial'));
const EPIs = lazy(() => import('./pages/EPIs'));
const ControleAcesso = lazy(() => import('./pages/ControleAcesso'));
const Treinamento = lazy(() => import('./pages/Treinamento'));
const Relatorio = lazy(() => import('./pages/Relatorio'));
const Configuracoes = lazy(() => import('./pages/Configuracoes'));
const EsqueciSenha = lazy(() => import('./pages/EsqueciSenha'));
const Servicos = lazy(() => import('./pages/Servicos'));

// Componente de loading simples enquanto a página carrega
const PageLoader = () => (
  <div className="page-loader">
    <div className="page-loader-spinner"></div>
    <span>Carregando...</span>
  </div>
);

function App() {
  return (
    <Router>
      {/* Toast Notifications - Aparece em todas as páginas */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1a202c',
            color: '#fff',
            borderRadius: '12px',
            padding: '16px',
            fontSize: '14px',
          },
          success: {
            iconTheme: { primary: '#00a454', secondary: '#fff' },
            style: { background: '#0d3320', border: '1px solid #00a454' },
          },
          error: {
            iconTheme: { primary: '#ef4444', secondary: '#fff' },
            style: { background: '#3b1219', border: '1px solid #ef4444' },
          },
        }}
      />
      
      {/* Suspense envolve as rotas e mostra o PageLoader enquanto carrega */}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Rotas Públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/esqueci-senha" element={<EsqueciSenha />} />
          <Route path="/servicos" element={<Servicos />} />
          
          {/* Rotas Protegidas - Requerem autenticação */}
          <Route path="/inicial" element={<PrivateRoute><Inicial /></PrivateRoute>} />
          <Route path="/epis" element={<PrivateRoute><EPIs /></PrivateRoute>} />
          <Route path="/controle-acesso" element={<PrivateRoute><ControleAcesso /></PrivateRoute>} />
          <Route path="/treinamento" element={<PrivateRoute><Treinamento /></PrivateRoute>} />
          <Route path="/relatorio" element={<PrivateRoute><Relatorio /></PrivateRoute>} />
          <Route path="/configuracoes" element={<PrivateRoute><Configuracoes /></PrivateRoute>} />
          
          {/* Rota padrão */}
          <Route path="/" element={<Navigate to="/servicos" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
