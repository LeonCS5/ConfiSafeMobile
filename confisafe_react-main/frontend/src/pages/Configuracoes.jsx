import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import HeaderAuth from '../components/Layout/HeaderAuth';
import Sidebar from '../components/Layout/Sidebar';
import Footer from '../components/Layout/Footer';
import '../styles/configuracoes.css';

const Configuracoes = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('perfil');
  const [avatar, setAvatar] = useState('👤');

  const [perfil, setPerfil] = useState({
    fullName: 'Michael Coutinho',
    email: 'michael.coutinho@confisafe.com',
    role: 'Técnico de Segurança',
    department: 'seguranca',
    phone: '(11) 98765-4321',
    ramal: '2345'
  });

  const [notificacoes, setNotificacoes] = useState({
    emailAlertas: true,
    emailRelatorios: true,
    emailTreinamentos: true,
    pushNotifications: true,
    soundAlerts: false
  });

  const [seguranca, setSeguranca] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [sistema, setSistema] = useState({
    theme: 'light',
    language: 'pt-BR',
    timezone: 'America/Sao_Paulo'
  });

  const [sessions] = useState([
    {
      id: 1,
      name: 'Navegador Atual',
      device: 'Chrome 120 - Windows 10',
      location: 'Campinas, SP',
      time: 'Agora',
      status: 'Ativa',
      icon: '💻'
    },
    {
      id: 2,
      name: 'Dispositivo Móvel',
      device: 'Safari - iPhone 13',
      location: 'Campinas, SP',
      time: 'Há 2 horas',
      status: 'Ativa',
      icon: '📱'
    }
  ]);

  // Handlers Perfil
  const handlePerfilChange = (e) => {
    const { name, value } = e.target;
    setPerfil(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = document.getElementById('avatarPreview');
        if (img) img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSavePerfil = () => {
    toast.success('Perfil salvo com sucesso!');
  };

  const handleCancelPerfil = () => {
    setPerfil({
      fullName: 'Michael Coutinho',
      email: 'michael.coutinho@confisafe.com',
      role: 'Técnico de Segurança',
      department: 'seguranca',
      phone: '(11) 98765-4321',
      ramal: '2345'
    });
  };

  // Handlers Notificações
  const handleToggleNotificacao = (key) => {
    setNotificacoes(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveNotificacoes = () => {
    toast.success('Preferências de notificação salvas!');
  };

  // Handlers Segurança
  const handleSegurancaChange = (e) => {
    const { name, value } = e.target;
    setSeguranca(prev => ({ ...prev, [name]: value }));
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (seguranca.newPassword !== seguranca.confirmPassword) {
      toast.error('As senhas não conferem!');
      return;
    }
    if (seguranca.newPassword.length < 8) {
      toast.error('A senha deve ter no mínimo 8 caracteres!');
      return;
    }
    toast.success('Senha alterada com sucesso!');
    setSeguranca({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleEnable2FA = () => {
    toast.success('Autenticação em dois fatores ativada!');
  };

  const handleRevokeSession = (id) => {
    toast.success(`Sessão #${id} encerrada!`);
  };

  // Handlers Sistema
  const handleSistemaChange = (e) => {
    const { name, value } = e.target;
    setSistema(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveSistema = () => {
    toast.success('Preferências do sistema salvas!');
  };

  const handleExportData = () => {
    toast.success('Seus dados foram exportados para download!');
  };

  const handleDeactivateAccount = () => {
    if (window.confirm('Tem certeza que deseja desativar sua conta? Você poderá reativá-la a qualquer momento.')) {
      toast.success('Conta desativada com sucesso!');
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm('AVISO: Esta ação é irreversível e excluirá todos os seus dados. Tem certeza?')) {
      if (window.confirm('Esta é sua última chance. Seus dados serão permanentemente deletados.')) {
        toast.success('Sua conta foi excluída permanentemente.');
        navigate('/login');
      }
    }
  };

  return (
    <div className="page-configuracoes">
      <HeaderAuth />
      <div className="layout">
        <Sidebar />
        <main className="main-content">
          {/* Page Header */}
          <div className="page-header">
            <h2>Configurações do Sistema</h2>
            <p>Personalize suas preferências e gerencie sua conta</p>
          </div>

          {/* Tabs */}
          <div className="tabs-section">
            <div className="tabs-header">
              <button
                className={`tab-btn ${activeTab === 'perfil' ? 'active' : ''}`}
                onClick={() => setActiveTab('perfil')}
              >
                Perfil
              </button>
              <button
                className={`tab-btn ${activeTab === 'notificacoes' ? 'active' : ''}`}
                onClick={() => setActiveTab('notificacoes')}
              >
                Notificações
              </button>
              <button
                className={`tab-btn ${activeTab === 'seguranca' ? 'active' : ''}`}
                onClick={() => setActiveTab('seguranca')}
              >
                Segurança
              </button>
              <button
                className={`tab-btn ${activeTab === 'sistema' ? 'active' : ''}`}
                onClick={() => setActiveTab('sistema')}
              >
                Sistema
              </button>
            </div>

            {/* Tab: Perfil */}
            {activeTab === 'perfil' && (
              <div className="tab-content active">
                {/* Informações Pessoais */}
                <div className="config-section">
                  <h3 className="section-title">Informações Pessoais</h3>
                  <form className="config-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="fullName">Nome Completo</label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={perfil.fullName}
                          onChange={handlePerfilChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">E-mail</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={perfil.email}
                          onChange={handlePerfilChange}
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="role">Cargo</label>
                        <input
                          type="text"
                          id="role"
                          name="role"
                          value={perfil.role}
                          readOnly
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="department">Departamento</label>
                        <select
                          id="department"
                          name="department"
                          value={perfil.department}
                          onChange={handlePerfilChange}
                        >
                          <option value="seguranca">Segurança do Trabalho</option>
                          <option value="producao">Produção</option>
                          <option value="manutencao">Manutenção</option>
                          <option value="administrativo">Administrativo</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="phone">Telefone</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={perfil.phone}
                          onChange={handlePerfilChange}
                          maxLength="15"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="ramal">Ramal</label>
                        <input
                          type="text"
                          id="ramal"
                          name="ramal"
                          value={perfil.ramal}
                          onChange={handlePerfilChange}
                        />
                      </div>
                    </div>

                    <div className="form-actions">
                      <button type="button" className="btn-secondary" onClick={handleCancelPerfil}>
                        Cancelar
                      </button>
                      <button type="button" className="btn-warning" onClick={() => alert('Modal de alteração de senha')}>
                        🔐 Alterar Senha
                      </button>
                      <button type="button" className="btn-primary" onClick={handleSavePerfil}>
                        Salvar Alterações
                      </button>
                    </div>
                  </form>
                </div>

                {/* Foto de Perfil */}
                <div className="config-section">
                  <h3 className="section-title">Foto de Perfil</h3>
                  <div className="avatar-upload">
                    <img
                      id="avatarPreview"
                      src="https://via.placeholder.com/120"
                      alt="Avatar"
                      className="avatar-preview"
                    />
                    <div className="avatar-actions">
                      <label htmlFor="avatarInput" className="btn-secondary">
                        Escolher Imagem
                      </label>
                      <input
                        type="file"
                        id="avatarInput"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        style={{ display: 'none' }}
                      />
                      <button type="button" className="btn-danger btn-small" onClick={() => alert('Avatar removido')}>
                        Remover
                      </button>
                      <p className="avatar-hint">PNG, JPG ou JPEG. Máximo 2MB.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Notificações */}
            {activeTab === 'notificacoes' && (
              <div className="tab-content active">
                <div className="config-section">
                  <h3 className="section-title">Preferências de Notificação</h3>

                  {/* E-mail */}
                  <div className="notification-group">
                    <h4>📧 E-mail</h4>

                    <div className="notification-item">
                      <div className="notification-info">
                        <strong>Alertas de Segurança</strong>
                        <p>Receber notificações sobre alertas críticos de EPIs e acessos</p>
                      </div>
                      <label className="toggle">
                        <input
                          type="checkbox"
                          checked={notificacoes.emailAlertas}
                          onChange={() => handleToggleNotificacao('emailAlertas')}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>

                    <div className="notification-item">
                      <div className="notification-info">
                        <strong>Relatórios Semanais</strong>
                        <p>Resumo semanal das atividades e conformidade</p>
                      </div>
                      <label className="toggle">
                        <input
                          type="checkbox"
                          checked={notificacoes.emailRelatorios}
                          onChange={() => handleToggleNotificacao('emailRelatorios')}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>

                    <div className="notification-item">
                      <div className="notification-info">
                        <strong>Vencimento de Treinamentos</strong>
                        <p>Avisos sobre certificados próximos do vencimento</p>
                      </div>
                      <label className="toggle">
                        <input
                          type="checkbox"
                          checked={notificacoes.emailTreinamentos}
                          onChange={() => handleToggleNotificacao('emailTreinamentos')}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                  </div>

                  {/* Sistema */}
                  <div className="notification-group">
                    <h4>🔔 Sistema</h4>

                    <div className="notification-item">
                      <div className="notification-info">
                        <strong>Notificações Push</strong>
                        <p>Alertas em tempo real no navegador</p>
                      </div>
                      <label className="toggle">
                        <input
                          type="checkbox"
                          checked={notificacoes.pushNotifications}
                          onChange={() => handleToggleNotificacao('pushNotifications')}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>

                    <div className="notification-item">
                      <div className="notification-info">
                        <strong>Sons de Alerta</strong>
                        <p>Reproduzir som ao receber notificações importantes</p>
                      </div>
                      <label className="toggle">
                        <input
                          type="checkbox"
                          checked={notificacoes.soundAlerts}
                          onChange={() => handleToggleNotificacao('soundAlerts')}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button type="button" className="btn-primary" onClick={handleSaveNotificacoes}>
                      Salvar Preferências
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Segurança */}
            {activeTab === 'seguranca' && (
              <div className="tab-content active">
                {/* Alterar Senha */}
                <div className="config-section">
                  <h3 className="section-title">Alterar Senha</h3>
                  <form className="config-form" onSubmit={handleChangePassword}>
                    <div className="form-group">
                      <label htmlFor="currentPassword">Senha Atual</label>
                      <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        placeholder="Digite sua senha atual"
                        value={seguranca.currentPassword}
                        onChange={handleSegurancaChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="newPassword">Nova Senha</label>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        placeholder="Digite a nova senha"
                        value={seguranca.newPassword}
                        onChange={handleSegurancaChange}
                        required
                      />
                      <small>Mínimo 8 caracteres, incluindo letras e números</small>
                    </div>

                    <div className="form-group">
                      <label htmlFor="confirmPassword">Confirmar Nova Senha</label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirme a nova senha"
                        value={seguranca.confirmPassword}
                        onChange={handleSegurancaChange}
                        required
                      />
                    </div>

                    <div className="form-actions">
                      <button type="submit" className="btn-primary">
                        Alterar Senha
                      </button>
                    </div>
                  </form>
                </div>

                {/* Sessões Ativas */}
                <div className="config-section">
                  <h3 className="section-title">Sessões Ativas</h3>
                  <div className="sessions-list">
                    {sessions.map((session) => (
                      <div className="session-item" key={session.id}>
                        <div className="session-icon">{session.icon}</div>
                        <div className="session-info">
                          <strong>{session.name}</strong>
                          <p>{session.device}</p>
                          <small>{session.location} • {session.time}</small>
                        </div>
                        <span className="session-badge">{session.status}</span>
                        {session.id !== 1 && (
                          <button
                            type="button"
                            className="btn-danger btn-small"
                            onClick={() => handleRevokeSession(session.id)}
                          >
                            Encerrar
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2FA */}
                <div className="config-section">
                  <h3 className="section-title">Autenticação em Dois Fatores</h3>
                  <div className="security-feature">
                    <div className="feature-info">
                      <strong>2FA não ativado</strong>
                      <p>Adicione uma camada extra de segurança à sua conta</p>
                    </div>
                    <button type="button" className="btn-secondary" onClick={handleEnable2FA}>
                      Ativar 2FA
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Sistema */}
            {activeTab === 'sistema' && (
              <div className="tab-content active">
                {/* Preferências de Exibição */}
                <div className="config-section">
                  <h3 className="section-title">Preferências de Exibição</h3>
                  <div className="system-options">
                    <div className="system-item">
                      <div className="system-info">
                        <strong>Tema</strong>
                        <p>Escolha o tema da interface</p>
                      </div>
                      <select
                        name="theme"
                        className="system-select"
                        value={sistema.theme}
                        onChange={handleSistemaChange}
                      >
                        <option value="light">Claro</option>
                        <option value="dark">Escuro</option>
                        <option value="auto">Automático</option>
                      </select>
                    </div>

                    <div className="system-item">
                      <div className="system-info">
                        <strong>Idioma</strong>
                        <p>Idioma do sistema</p>
                      </div>
                      <select
                        name="language"
                        className="system-select"
                        value={sistema.language}
                        onChange={handleSistemaChange}
                      >
                        <option value="pt-BR">Português (Brasil)</option>
                        <option value="en-US">English (US)</option>
                        <option value="es-ES">Español</option>
                      </select>
                    </div>

                    <div className="system-item">
                      <div className="system-info">
                        <strong>Fuso Horário</strong>
                        <p>Ajuste automático de horários</p>
                      </div>
                      <select
                        name="timezone"
                        className="system-select"
                        value={sistema.timezone}
                        onChange={handleSistemaChange}
                      >
                        <option value="America/Sao_Paulo">Brasília (GMT-3)</option>
                        <option value="America/New_York">Nova York (GMT-5)</option>
                        <option value="Europe/London">Londres (GMT+0)</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button type="button" className="btn-primary" onClick={handleSaveSistema}>
                      Salvar Alterações
                    </button>
                  </div>
                </div>

                {/* Exportação de Dados */}
                <div className="config-section">
                  <h3 className="section-title">Exportação de Dados</h3>
                  <div className="export-options">
                    <div className="export-item">
                      <div className="export-info">
                        <strong>Exportar Dados Pessoais</strong>
                        <p>Baixe uma cópia de todos os seus dados</p>
                      </div>
                      <button type="button" className="btn-secondary" onClick={handleExportData}>
                        Exportar
                      </button>
                    </div>
                  </div>
                </div>

                {/* Zona de Perigo */}
                <div className="config-section danger-zone">
                  <h3 className="section-title">⚠️ Zona de Perigo</h3>

                  <div className="danger-item">
                    <div className="danger-info">
                      <strong>Desativar Conta</strong>
                      <p>Desative temporariamente sua conta. Você poderá reativá-la a qualquer momento.</p>
                    </div>
                    <button type="button" className="btn-danger" onClick={handleDeactivateAccount}>
                      Desativar
                    </button>
                  </div>

                  <div className="danger-item">
                    <div className="danger-info">
                      <strong>Excluir Conta</strong>
                      <p>Exclua permanentemente sua conta e todos os dados associados. Esta ação não pode ser desfeita.</p>
                    </div>
                    <button type="button" className="btn-danger" onClick={handleDeleteAccount}>
                      Excluir Permanentemente
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Configuracoes;
