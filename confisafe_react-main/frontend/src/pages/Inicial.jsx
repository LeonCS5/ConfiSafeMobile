import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import HeaderAuth from '../components/Layout/HeaderAuth';
import Sidebar from '../components/Layout/Sidebar';
import Footer from '../components/Layout/Footer';
import '../styles/header.css';
import '../styles/sidebar.css';
import '../styles/layout.css';
import '../styles/components.css';
import '../styles/inicial.css';

const Inicial = () => {
  // Estado das câmeras (com validação para evitar dados corrompidos)
  const [cameras, setCameras] = useState(() => {
    try {
      const saved = localStorage.getItem('confisafe_cameras');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Filtrar apenas câmeras válidas (com id e nome)
        return Array.isArray(parsed) 
          ? parsed.filter(c => c && c.id && c.nome)
          : [];
      }
    } catch (e) {
      console.error('Erro ao carregar câmeras:', e);
      localStorage.removeItem('confisafe_cameras');
    }
    return [];
  });
  
  // Estado do modal
  const [showModal, setShowModal] = useState(false);
  const [editingCamera, setEditingCamera] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    setor: '',
    protocolo: 'rtsp',
    url: '',
    usuario: '',
    senha: '',
    porta: '',
    monitorarEPI: true,
    alertas: true,
  });

  // Setores disponíveis
  const setores = [
    'Entrada Principal',
    'Área de Produção',
    'Espaço Confinado A',
    'Espaço Confinado B',
    'Almoxarifado',
    'Área de Carga/Descarga',
    'Refeitório',
    'Laboratório',
    'Manutenção',
    'Outro',
  ];

  // Salvar câmeras no localStorage
  useEffect(() => {
    localStorage.setItem('confisafe_cameras', JSON.stringify(cameras));
  }, [cameras]);

  // Estatísticas dinâmicas baseadas nas câmeras
  const stats = [
    { label: 'Câmeras Ativas', value: cameras.filter(c => c.status === 'online').length.toString(), icon: 'camera', type: 'blue' },
    { label: 'Setores Monitorados', value: [...new Set(cameras.map(c => c.setor))].length.toString(), icon: 'shield', type: 'success' },
    { label: 'Alertas Hoje', value: '0', icon: 'alert', type: 'warning' },
    { label: 'Detecções IA', value: '0', icon: 'ai', type: 'blue' },
  ];

  const getIcon = (iconName) => {
    const icons = {
      camera: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
          <circle cx="12" cy="13" r="4"></circle>
        </svg>
      ),
      shield: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"></path>
        </svg>
      ),
      alert: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      ),
      ai: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"></path>
          <circle cx="7.5" cy="14.5" r="1.5"></circle>
          <circle cx="16.5" cy="14.5" r="1.5"></circle>
        </svg>
      ),
    };
    return icons[iconName] || null;
  };

  // Handlers do formulário
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleOpenModal = (camera = null) => {
    if (camera) {
      setEditingCamera(camera.id);
      setFormData({
        nome: camera.nome,
        setor: camera.setor,
        protocolo: camera.protocolo,
        url: camera.url,
        usuario: camera.usuario || '',
        senha: camera.senha || '',
        porta: camera.porta || '',
        monitorarEPI: camera.monitorarEPI,
        alertas: camera.alertas,
      });
    } else {
      setEditingCamera(null);
      setFormData({
        nome: '',
        setor: '',
        protocolo: 'rtsp',
        url: '',
        usuario: '',
        senha: '',
        porta: '',
        monitorarEPI: true,
        alertas: true,
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCamera(null);
  };

  const handleSaveCamera = () => {
    // Validações
    if (!formData.nome.trim()) {
      toast.error('Informe o nome da câmera');
      return;
    }
    if (!formData.setor) {
      toast.error('Selecione o setor');
      return;
    }
    if (!formData.url.trim()) {
      toast.error('Informe a URL/IP da câmera');
      return;
    }

    // Montar URL completa
    let urlCompleta = formData.url;
    if (!urlCompleta.startsWith('rtsp://') && !urlCompleta.startsWith('http://') && !urlCompleta.startsWith('https://')) {
      urlCompleta = `${formData.protocolo}://${formData.url}`;
    }
    if (formData.porta) {
      const urlObj = urlCompleta.includes('://') ? urlCompleta : `${formData.protocolo}://${urlCompleta}`;
      const baseUrl = urlObj.split('://')[1]?.split('/')[0]?.split(':')[0] || formData.url;
      urlCompleta = `${formData.protocolo}://${baseUrl}:${formData.porta}`;
    }

    const cameraData = {
      id: editingCamera || Date.now(),
      nome: formData.nome,
      setor: formData.setor,
      protocolo: formData.protocolo,
      url: formData.url,
      urlCompleta,
      usuario: formData.usuario,
      senha: formData.senha,
      porta: formData.porta,
      monitorarEPI: formData.monitorarEPI,
      alertas: formData.alertas,
      status: 'offline', // Será atualizado quando conectar
      ultimaDeteccao: null,
      dataCadastro: editingCamera ? cameras.find(c => c.id === editingCamera)?.dataCadastro : new Date().toISOString(),
    };

    if (editingCamera) {
      setCameras(prev => prev.map(c => c.id === editingCamera ? cameraData : c));
      toast.success('Câmera atualizada com sucesso!');
    } else {
      setCameras(prev => [...prev, cameraData]);
      toast.success('Câmera adicionada com sucesso!');
    }

    handleCloseModal();
  };

  const handleDeleteCamera = (id) => {
    if (window.confirm('Tem certeza que deseja remover esta câmera?')) {
      setCameras(prev => prev.filter(c => c.id !== id));
      toast.success('Câmera removida!');
    }
  };

  const handleTestConnection = (camera) => {
    toast.loading('Testando conexão...', { id: 'test-connection' });
    
    // Simular teste de conexão (na integração real, chamaria o backend)
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% chance de sucesso para demo
      if (success) {
        setCameras(prev => prev.map(c => 
          c.id === camera.id ? { ...c, status: 'online' } : c
        ));
        toast.success('Câmera conectada com sucesso!', { id: 'test-connection' });
      } else {
        setCameras(prev => prev.map(c => 
          c.id === camera.id ? { ...c, status: 'offline' } : c
        ));
        toast.error('Falha na conexão. Verifique a URL e credenciais.', { id: 'test-connection' });
      }
    }, 2000);
  };

  return (
    <div className="page-inicial">
      <HeaderAuth />

      <div className="layout">
        <Sidebar />

        <main className="main-content">
          <div className="page-header">
            <h2>Central de Monitoramento</h2>
            <p>Gerencie câmeras e monitore seus setores em tempo real com inteligência artificial.</p>
          </div>

          {/* Cards de Estatísticas */}
          <section className="section">
            <div className="stats-grid">
              {stats.map((stat, idx) => (
                <div key={idx} className={`stat-card stat-card--${stat.type}`}>
                  <div className="stat-icon-wrapper">
                    {getIcon(stat.icon)}
                  </div>
                  <div className="stat-info">
                    <span className="stat-value">{stat.value}</span>
                    <span className="stat-label">{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Seção de Câmeras */}
          <section className="section">
            <div className="section-header-row">
              <div>
                <h3 className="section-title">Câmeras de Monitoramento</h3>
                <p className="section-subtitle">Configure câmeras IP para detecção automática de EPIs via IA</p>
              </div>
              <button className="btn-primary" onClick={() => handleOpenModal()}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Adicionar Câmera
              </button>
            </div>

            {cameras.length === 0 ? (
              <div className="empty-cameras">
                <div className="empty-icon">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                    <circle cx="12" cy="13" r="4"></circle>
                  </svg>
                </div>
                <h4>Nenhuma câmera configurada</h4>
                <p>Adicione câmeras IP (RTSP/HTTP) para iniciar o monitoramento com IA</p>
                <button className="btn-primary" onClick={() => handleOpenModal()}>
                  Adicionar Primeira Câmera
                </button>
              </div>
            ) : (
              <div className="cameras-grid">
                {cameras.map(camera => (
                  <div key={camera.id} className={`camera-card camera-card--${camera.status}`}>
                    <div className="camera-preview">
                      <div className="camera-placeholder">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                          <circle cx="12" cy="13" r="4"></circle>
                        </svg>
                        {camera.status === 'online' ? (
                          <span className="preview-text">Conectado - Aguardando stream</span>
                        ) : (
                          <span className="preview-text">Câmera Offline</span>
                        )}
                      </div>
                      <div className={`camera-status-badge camera-status-badge--${camera.status}`}>
                        <span className="status-dot"></span>
                        {camera.status === 'online' ? 'Online' : 'Offline'}
                      </div>
                      {camera.monitorarEPI && (
                        <div className="camera-ai-badge">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"></path>
                          </svg>
                          IA Ativa
                        </div>
                      )}
                    </div>
                    
                    <div className="camera-info">
                      <h4 className="camera-name">{camera.nome || 'Sem nome'}</h4>
                      <div className="camera-details">
                        <span className="camera-setor">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                          </svg>
                          {camera.setor || 'Sem setor'}
                        </span>
                        <span className="camera-protocol">
                          {(camera.protocolo || 'rtsp').toUpperCase()}
                        </span>
                      </div>
                      <div className="camera-url">{camera.urlCompleta || camera.url || 'URL não definida'}</div>
                    </div>

                    <div className="camera-actions">
                      <button 
                        className="btn-camera btn-camera--test"
                        onClick={() => handleTestConnection(camera)}
                        title="Testar Conexão"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                      </button>
                      <button 
                        className="btn-camera btn-camera--edit"
                        onClick={() => handleOpenModal(camera)}
                        title="Editar"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </button>
                      <button 
                        className="btn-camera btn-camera--delete"
                        onClick={() => handleDeleteCamera(camera.id)}
                        title="Remover"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}

                {/* Card para adicionar nova câmera */}
                <div className="camera-card camera-card--add" onClick={() => handleOpenModal()}>
                  <div className="add-camera-content">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="16"></line>
                      <line x1="8" y1="12" x2="16" y2="12"></line>
                    </svg>
                    <span>Adicionar Câmera</span>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Informações sobre a IA */}
          <section className="section">
            <div className="ai-info-card">
              <div className="ai-info-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"></path>
                  <circle cx="7.5" cy="14.5" r="1.5"></circle>
                  <circle cx="16.5" cy="14.5" r="1.5"></circle>
                </svg>
              </div>
              <div className="ai-info-content">
                <h4>Monitoramento com Inteligência Artificial</h4>
                <p>
                  O ConfiSafe utiliza visão computacional para detectar automaticamente o uso correto de EPIs.
                  Configure suas câmeras IP (RTSP/HTTP) e o sistema irá monitorar em tempo real, alertando 
                  quando funcionários estiverem sem os equipamentos de proteção adequados.
                </p>
                <div className="ai-features">
                  <div className="ai-feature">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Detecção de Capacete
                  </div>
                  <div className="ai-feature">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Detecção de Colete
                  </div>
                  <div className="ai-feature">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Detecção de Luvas
                  </div>
                  <div className="ai-feature">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Detecção de Óculos
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      <Footer />

      {/* Modal de Adicionar/Editar Câmera */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-camera" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingCamera ? 'Editar Câmera' : 'Adicionar Nova Câmera'}</h3>
              <button className="modal-close" onClick={handleCloseModal}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div className="modal-body">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="nome">Nome da Câmera *</label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    placeholder="Ex: Câmera Entrada Principal"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="setor">Setor *</label>
                  <select
                    id="setor"
                    name="setor"
                    value={formData.setor}
                    onChange={handleInputChange}
                  >
                    <option value="">Selecione o setor</option>
                    {setores.map(setor => (
                      <option key={setor} value={setor}>{setor}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group form-group--small">
                  <label htmlFor="protocolo">Protocolo</label>
                  <select
                    id="protocolo"
                    name="protocolo"
                    value={formData.protocolo}
                    onChange={handleInputChange}
                  >
                    <option value="rtsp">RTSP</option>
                    <option value="http">HTTP</option>
                    <option value="https">HTTPS</option>
                  </select>
                </div>
                <div className="form-group form-group--large">
                  <label htmlFor="url">Endereço IP / URL *</label>
                  <input
                    type="text"
                    id="url"
                    name="url"
                    value={formData.url}
                    onChange={handleInputChange}
                    placeholder="Ex: 192.168.1.100 ou camera.empresa.com/stream"
                  />
                </div>
                <div className="form-group form-group--small">
                  <label htmlFor="porta">Porta</label>
                  <input
                    type="text"
                    id="porta"
                    name="porta"
                    value={formData.porta}
                    onChange={handleInputChange}
                    placeholder="554"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="usuario">Usuário (opcional)</label>
                  <input
                    type="text"
                    id="usuario"
                    name="usuario"
                    value={formData.usuario}
                    onChange={handleInputChange}
                    placeholder="admin"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="senha">Senha (opcional)</label>
                  <input
                    type="password"
                    id="senha"
                    name="senha"
                    value={formData.senha}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="form-section-divider">
                <span>Configurações de Monitoramento</span>
              </div>

              <div className="form-row form-row--checkboxes">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="monitorarEPI"
                    checked={formData.monitorarEPI}
                    onChange={handleInputChange}
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-text">
                    <strong>Ativar detecção de EPIs por IA</strong>
                    <small>A câmera será processada em tempo real para detectar EPIs</small>
                  </span>
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="alertas"
                    checked={formData.alertas}
                    onChange={handleInputChange}
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-text">
                    <strong>Enviar alertas automáticos</strong>
                    <small>Notificações quando detectar ausência de EPIs</small>
                  </span>
                </label>
              </div>

              <div className="form-help">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
                <span>
                  <strong>Exemplo de URL RTSP:</strong> rtsp://usuario:senha@192.168.1.100:554/stream1
                </span>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={handleCloseModal}>
                Cancelar
              </button>
              <button className="btn-primary" onClick={handleSaveCamera}>
                {editingCamera ? 'Salvar Alterações' : 'Adicionar Câmera'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inicial;
