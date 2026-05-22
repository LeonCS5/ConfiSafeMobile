import React, { useState, useMemo } from 'react';
import HeaderAuth from '../components/Layout/HeaderAuth';
import Sidebar from '../components/Layout/Sidebar';
import Footer from '../components/Layout/Footer';
import '../styles/header.css';
import '../styles/sidebar.css';
import '../styles/layout.css';
import '../styles/components.css';
import '../styles/epis.css';

const EPIs = () => {
  const [activeTab, setActiveTab] = useState('employees');
  const [filterArea, setFilterArea] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [confirmAction, setConfirmAction] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Dados de funcionários
  const [employees] = useState([
    {
      id: 1,
      nome: 'João Silva',
      cargo: 'Operador',
      area: 'Produção',
      avatar: 'JS',
      avatarColor: 'avatar-blue',
      epis: {
        capacete: true,
        oculos: true,
        luvas: true,
        mascara: true,
      },
      status: 'conforme',
    },
    {
      id: 2,
      nome: 'Maria Santos',
      cargo: 'Técnica',
      area: 'Laboratório',
      avatar: 'MS',
      avatarColor: 'avatar-orange',
      epis: {
        capacete: true,
        oculos: false,
        luvas: true,
        mascara: true,
      },
      status: 'nao-conforme',
    },
    {
      id: 3,
      nome: 'Carlos Oliveira',
      cargo: 'Manutenção',
      area: 'Manutenção',
      avatar: 'CO',
      avatarColor: 'avatar-red',
      epis: {
        capacete: false,
        oculos: false,
        luvas: true,
        mascara: false,
      },
      status: 'critico',
    },
    {
      id: 4,
      nome: 'Ana Costa',
      cargo: 'Supervisora',
      area: 'Administrativo',
      avatar: 'AC',
      avatarColor: 'avatar-green',
      epis: {
        capacete: true,
        oculos: true,
        luvas: true,
        mascara: true,
      },
      status: 'conforme',
    },
  ]);

  // Dados de áreas
  const [areas] = useState([
    {
      id: 1,
      nome: 'Setor de Produção',
      conformidade: 96,
      funcionarios: 45,
      conformes: 43,
      alertas: 2,
      epis: [
        { nome: 'Capacete', percentual: 98 },
        { nome: 'Óculos', percentual: 94 },
        { nome: 'Luvas', percentual: 97 },
      ],
      status: 'ok',
    },
    {
      id: 2,
      nome: 'Área de Manutenção',
      conformidade: 82,
      funcionarios: 32,
      conformes: 26,
      alertas: 6,
      epis: [
        { nome: 'Capacete', percentual: 85 },
        { nome: 'Óculos', percentual: 78 },
        { nome: 'Luvas', percentual: 83 },
      ],
      status: 'warning',
    },
  ]);

  // Dados de EPIs
  const [episList] = useState([
    {
      id: 1,
      nome: 'Capacete de Segurança',
      taxaUso: 96,
      quantidade: 150,
      total: 156,
      imagem: '🪖',
    },
    {
      id: 2,
      nome: 'Luvas de Proteção',
      taxaUso: 88,
      quantidade: 220,
      total: 250,
      imagem: '🧤',
    },
    {
      id: 3,
      nome: 'Máscara Respiratória',
      taxaUso: 92,
      quantidade: 166,
      total: 180,
      imagem: '😷',
    },
    {
      id: 4,
      nome: 'Óculos de Proteção',
      taxaUso: 84,
      quantidade: 84,
      total: 100,
      imagem: '👓',
    },
    {
      id: 5,
      nome: 'Protetor Auditivo',
      taxaUso: 91,
      quantidade: 109,
      total: 120,
      imagem: '🎧',
    },
    {
      id: 6,
      nome: 'Colete Refletivo',
      taxaUso: 94,
      quantidade: 188,
      total: 200,
      imagem: '🦺',
    },
  ]);

  // Filtrar funcionários por área
  const filteredEmployees = useMemo(() => {
    if (filterArea === 'all') return employees;
    
    const areaMap = {
      'producao': 'Produção',
      'manutencao': 'Manutenção',
      'laboratorio': 'Laboratório',
      'administrativo': 'Administrativo'
    };
    
    return employees.filter(emp => emp.area === areaMap[filterArea]);
  }, [employees, filterArea]);

  // Função auxiliar para cor do progresso
  const getProgressColor = (value) => {
    if (value >= 90) return '';
    if (value >= 75) return 'warning';
    return 'danger';
  };

  // Função auxiliar para atualizar dados
  const handleRefresh = () => {
    console.log('Atualizando dados...');
    // Aqui você pode adicionar lógica para recarregar dados da API
    alert('Dados atualizados com sucesso!');
  };

  // Funções de modal
  const openDetailsModal = (emp) => {
    setSelectedEmployee(emp);
    setModalType('details');
    setShowModal(true);
  };

  const openNotifyModal = (emp) => {
    setSelectedEmployee(emp);
    setModalType('notify');
    setShowModal(true);
  };

  const openBlockModal = (emp) => {
    setSelectedEmployee(emp);
    setModalType('block');
    setShowModal(true);
  };

  const handleConfirmFromModal = () => {
    if (!selectedEmployee) return;

    if (modalType === 'details') {
      console.log(`Visualizando detalhes de ${selectedEmployee.nome}`);
      setShowModal(false);
    } else if (modalType === 'notify') {
      setConfirmAction('notify');
      setShowConfirmModal(true);
    } else if (modalType === 'block') {
      setConfirmAction('block');
      setShowConfirmModal(true);
    }
  };

  const handleConfirmAction = () => {
    if (!selectedEmployee) return;

    if (confirmAction === 'notify') {
      console.log(`✓ Notificação enviada para ${selectedEmployee.nome}`);
      alert(`✓ Notificação enviada com sucesso para ${selectedEmployee.nome}!`);
    } else if (confirmAction === 'block') {
      console.log(`✓ Acesso de ${selectedEmployee.nome} bloqueado`);
      alert(`✓ Acesso de ${selectedEmployee.nome} foi BLOQUEADO!`);
    }
    
    closeModals();
  };

  const closeModals = () => {
    setShowModal(false);
    setShowConfirmModal(false);
    setSelectedEmployee(null);
    setModalType('');
    setConfirmAction('');
  };

  return (
    <div className="page-epis">
      <HeaderAuth />

      <div className="layout">
        <Sidebar />

        <main className="main-content">
          {/* Page Header */}
          <div className="page-header">
            <div>
              <h2>Monitoramento de EPIs</h2>
              <p>Acompanhe em tempo real o uso de Equipamentos de Proteção Individual</p>
            </div>
            <div className="header-actions">
              <select
                className="filter-select"
                value={filterArea}
                onChange={(e) => setFilterArea(e.target.value)}
              >
                <option value="all">Todas as Áreas</option>
                <option value="producao">Produção</option>
                <option value="manutencao">Manutenção</option>
                <option value="laboratorio">Laboratório</option>
                <option value="administrativo">Administrativo</option>
              </select>
              <button className="btn-primary" onClick={handleRefresh}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="23 4 23 10 17 10"></polyline>
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                </svg>
                Atualizar
              </button>
            </div>
          </div>

          {/* Alert Banner */}
          <div className="alert-banner">
            <div className="alert-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <div className="alert-content">
              <strong>3 funcionários detectados sem EPI adequado</strong>
              <p>Áreas de risco - Ação imediata necessária</p>
            </div>
            <button className="btn-alert" onClick={() => setActiveTab('employees')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 16 16 12 12 8"/>
                <line x1="8" y1="12" x2="16" y2="12"/>
              </svg>
              Ver Detalhes
            </button>
          </div>

          {/* Summary Cards */}
          <div className="summary-grid">
            <div className="summary-card">
              <div className="summary-icon summary-icon--blue">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4"/>
                  <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"/>
                </svg>
              </div>
              <div className="summary-info">
                <span className="summary-value">94%</span>
                <span className="summary-label">Taxa de Conformidade Geral</span>
                <span className="summary-trend trend-up">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="18 15 12 9 6 15"/>
                  </svg>
                  +2%
                </span>
              </div>
            </div>

            <div className="summary-card">
              <div className="summary-icon summary-icon--green">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <div className="summary-info">
                <span className="summary-value">156</span>
                <span className="summary-label">Funcionários Monitorados</span>
                <span className="summary-trend">45 ativos agora</span>
              </div>
            </div>

            <div className="summary-card summary-card--warning">
              <div className="summary-icon summary-icon--orange">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </div>
              <div className="summary-info">
                <span className="summary-value">8</span>
                <span className="summary-label">Não Conformidades Hoje</span>
                <span className="summary-trend trend-down">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                  +3
                </span>
              </div>
            </div>

            <div className="summary-card summary-card--success">
              <div className="summary-icon summary-icon--success">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <div className="summary-info">
                <span className="summary-value">42</span>
                <span className="summary-label">Verificações Realizadas</span>
                <span className="summary-trend">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  Última: 10:25
                </span>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="tabs-section">
            <div className="tabs-header">
              <button
                className={`tab-btn ${activeTab === 'employees' ? 'active' : ''}`}
                onClick={() => setActiveTab('employees')}
              >
                Por Funcionário
              </button>
              <button
                className={`tab-btn ${activeTab === 'areas' ? 'active' : ''}`}
                onClick={() => setActiveTab('areas')}
              >
                Por Área
              </button>
              <button
                className={`tab-btn ${activeTab === 'epis' ? 'active' : ''}`}
                onClick={() => setActiveTab('epis')}
              >
                Por Equipamento
              </button>
            </div>

            {/* Tab: Por Funcionário */}
            {activeTab === 'employees' && (
              <div className="tab-content active">
                <div className="table-container">
                  <table className="monitoring-table">
                    <thead>
                      <tr>
                        <th>Funcionário</th>
                        <th>Área</th>
                        <th>Capacete</th>
                        <th>Óculos</th>
                        <th>Luvas</th>
                        <th>Máscara</th>
                        <th>Status</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEmployees.length > 0 ? (
                        filteredEmployees.map((emp) => (
                          <tr key={emp.id} className={`row-${emp.status}`}>
                            <td>
                              <div className="employee-cell">
                                <div className={`avatar ${emp.avatarColor}`}>{emp.avatar}</div>
                                <div>
                                  <strong>{emp.nome}</strong>
                                  <span>{emp.cargo}</span>
                                </div>
                              </div>
                            </td>
                            <td>{emp.area}</td>
                            <td>
                              <span className={`status-badge ${emp.epis.capacete ? 'status-ok' : 'status-fail'}`}>
                                {emp.epis.capacete ? '✓' : '✗'}
                              </span>
                            </td>
                            <td>
                              <span className={`status-badge ${emp.epis.oculos ? 'status-ok' : 'status-fail'}`}>
                                {emp.epis.oculos ? '✓' : '✗'}
                              </span>
                            </td>
                            <td>
                              <span className={`status-badge ${emp.epis.luvas ? 'status-ok' : 'status-fail'}`}>
                                {emp.epis.luvas ? '✓' : '✗'}
                              </span>
                            </td>
                            <td>
                              <span className={`status-badge ${emp.epis.mascara ? 'status-ok' : 'status-fail'}`}>
                                {emp.epis.mascara ? '✓' : '✗'}
                              </span>
                            </td>
                            <td>
                              <span
                                className={`badge ${
                                  emp.status === 'conforme'
                                    ? 'badge-success'
                                    : emp.status === 'nao-conforme'
                                    ? 'badge-warning'
                                    : 'badge-danger'
                                }`}
                              >
                                {emp.status === 'conforme'
                                  ? 'Conforme'
                                  : emp.status === 'nao-conforme'
                                  ? 'Não Conforme'
                                  : 'Crítico'}
                              </span>
                            </td>
                            <td>
                              <button
                                className={`btn-icon ${
                                  emp.status === 'critico'
                                    ? 'btn-icon-danger'
                                    : emp.status === 'nao-conforme'
                                    ? 'btn-icon-warning'
                                    : ''
                                }`}
                                title={
                                  emp.status === 'critico'
                                    ? 'Bloquear acesso'
                                    : emp.status === 'nao-conforme'
                                    ? 'Notificar'
                                    : 'Ver detalhes'
                                }
                                onClick={() => {
                                  if (emp.status === 'critico') {
                                    openBlockModal(emp);
                                  } else if (emp.status === 'nao-conforme') {
                                    openNotifyModal(emp);
                                  } else {
                                    openDetailsModal(emp);
                                  }
                                }}
                              >
                                {emp.status === 'critico' ? (
                                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
                                  </svg>
                                ) : emp.status === 'nao-conforme' ? (
                                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                                  </svg>
                                ) : (
                                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                  </svg>
                                )}
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="8" style={{ textAlign: 'center', padding: '2rem', color: '#999' }}>
                            Nenhum funcionário encontrado para esta área
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab: Por Área */}
            {activeTab === 'areas' && (
              <div className="tab-content active">
                <div className="areas-grid">
                  {areas.map((area) => (
                    <div key={area.id} className={`area-card ${area.status === 'warning' ? 'area-card--warning' : ''}`}>
                      <div className="area-header">
                        <h3>{area.nome}</h3>
                        <span className={`area-status status-${area.status}`}>{area.conformidade}%</span>
                      </div>
                      <div className="area-stats">
                        <div className="stat-item">
                          <span className="stat-label">Funcionários</span>
                          <span className="stat-value">{area.funcionarios}</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-label">Conformes</span>
                          <span className="stat-value">{area.conformes}</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-label">Alertas</span>
                          <span className="stat-value">{area.alertas}</span>
                        </div>
                      </div>
                      <div className="area-progress">
                        {area.epis.map((epi, idx) => (
                          <div key={idx} className="progress-item">
                            <span>{epi.nome}:</span>
                            <div className="progress-bar">
                              <div
                                className={`progress-fill ${getProgressColor(epi.percentual)}`}
                                style={{ width: `${epi.percentual}%` }}
                              ></div>
                            </div>
                            <span>{epi.percentual}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Por Equipamento */}
            {activeTab === 'epis' && (
              <div className="tab-content active">
                <div className="epis-grid">
                  {episList.map((epi) => (
                    <div key={epi.id} className="epi-card-equipment">
                      <div className="epi-card-icon">{epi.imagem}</div>
                      <h4>{epi.nome}</h4>
                      <div className="epi-stat">
                        <span className={`epi-percent ${getProgressColor(epi.taxaUso)}`}>{epi.taxaUso}%</span>
                        <span>Taxa de uso</span>
                      </div>
                      <div className="progress-bar">
                        <div
                          className={`progress-fill ${getProgressColor(epi.taxaUso)}`}
                          style={{ width: `${epi.taxaUso}%` }}
                        ></div>
                      </div>
                      <p className="epi-info">
                        {epi.quantidade} de {epi.total} funcionários
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Modal */}
      {showModal && selectedEmployee && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {modalType === 'details' && (
              <>
                <div className="modal-header modal-header--info">
                  <h2>Detalhes do Funcionário</h2>
                  <button className="modal-close" onClick={closeModals} aria-label="Fechar modal">✕</button>
                </div>
                <div className="modal-body">
                  <div className="employee-details">
                    <div className="detail-item">
                      <label>Nome:</label>
                      <span>{selectedEmployee.nome}</span>
                    </div>
                    <div className="detail-item">
                      <label>Cargo:</label>
                      <span>{selectedEmployee.cargo}</span>
                    </div>
                    <div className="detail-item">
                      <label>Área:</label>
                      <span>{selectedEmployee.area}</span>
                    </div>
                    <div className="detail-item">
                      <label>Status:</label>
                      <span className={`badge badge-${selectedEmployee.status === 'conforme' ? 'success' : selectedEmployee.status === 'nao-conforme' ? 'warning' : 'danger'}`}>
                        {selectedEmployee.status === 'conforme' ? 'Conforme' : selectedEmployee.status === 'nao-conforme' ? 'Não Conforme' : 'Crítico'}
                      </span>
                    </div>
                    <div className="detail-epis">
                      <h4>EPIs Utilizados:</h4>
                      <div className="epis-list">
                        <div className={`epi-check ${selectedEmployee.epis.capacete ? 'epi-ok' : 'epi-fail'}`}>
                          <span>{selectedEmployee.epis.capacete ? '✓' : '✗'}</span>
                          <span>Capacete</span>
                        </div>
                        <div className={`epi-check ${selectedEmployee.epis.oculos ? 'epi-ok' : 'epi-fail'}`}>
                          <span>{selectedEmployee.epis.oculos ? '✓' : '✗'}</span>
                          <span>Óculos</span>
                        </div>
                        <div className={`epi-check ${selectedEmployee.epis.luvas ? 'epi-ok' : 'epi-fail'}`}>
                          <span>{selectedEmployee.epis.luvas ? '✓' : '✗'}</span>
                          <span>Luvas</span>
                        </div>
                        <div className={`epi-check ${selectedEmployee.epis.mascara ? 'epi-ok' : 'epi-fail'}`}>
                          <span>{selectedEmployee.epis.mascara ? '✓' : '✗'}</span>
                          <span>Máscara</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn-secondary" onClick={closeModals}>Fechar</button>
                  <button className="btn-primary" onClick={handleConfirmFromModal}>Entendido</button>
                </div>
              </>
            )}

            {modalType === 'notify' && (
              <>
                <div className="modal-header modal-header--warning">
                  <h2>Notificar Funcionário</h2>
                  <button className="modal-close" onClick={closeModals} aria-label="Fechar modal">✕</button>
                </div>
                <div className="modal-body">
                  <p className="modal-message">
                    Tem certeza que deseja notificar <strong>{selectedEmployee.nome}</strong> sobre o uso inadequado de EPIs?
                  </p>
                  <div className="notification-preview">
                    <p><strong>Mensagem:</strong></p>
                    <p>Atenção! Você foi detectado sem o uso adequado de EPIs. Por favor, corrija imediatamente.</p>
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn-secondary" onClick={closeModals}>Cancelar</button>
                  <button className="btn-warning" onClick={handleConfirmFromModal}>Enviar Notificação</button>
                </div>
              </>
            )}

            {modalType === 'block' && (
              <>
                <div className="modal-header modal-header--danger">
                  <h2>Bloquear Acesso</h2>
                  <button className="modal-close" onClick={closeModals} aria-label="Fechar modal">✕</button>
                </div>
                <div className="modal-body">
                  <div className="alert-danger-box">
                    <p>
                      <strong>Aviso Crítico!</strong> Você está prestes a bloquear o acesso de <strong>{selectedEmployee.nome}</strong>.
                    </p>
                    <p>Este funcionário não está usando EPIs adequados nas áreas de risco. Seu acesso será imediatamente revogado por motivos de segurança.</p>
                  </div>
                  <div className="detail-item">
                    <label>EPIs Faltantes:</label>
                    <div className="missing-epis">
                      {!selectedEmployee.epis.capacete && <span className="missing-badge">Capacete</span>}
                      {!selectedEmployee.epis.oculos && <span className="missing-badge">Óculos</span>}
                      {!selectedEmployee.epis.luvas && <span className="missing-badge">Luvas</span>}
                      {!selectedEmployee.epis.mascara && <span className="missing-badge">Máscara</span>}
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn-secondary" onClick={closeModals}>Cancelar</button>
                  <button className="btn-danger" onClick={handleConfirmFromModal}>Confirmar Bloqueio</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Modal de Confirmação */}
      {showConfirmModal && selectedEmployee && (
        <div className="modal-overlay" onClick={() => setShowConfirmModal(false)}>
          <div className="modal-content modal-content--confirm" onClick={(e) => e.stopPropagation()}>
            {confirmAction === 'notify' && (
              <>
                <div className="modal-header modal-header--warning">
                  <h2>Confirmar Notificação</h2>
                  <button className="modal-close" onClick={() => setShowConfirmModal(false)} aria-label="Fechar modal">✕</button>
                </div>
                <div className="modal-body">
                  <p className="confirm-message">
                    Tem certeza que deseja notificar <strong>{selectedEmployee.nome}</strong>?
                  </p>
                  <p className="confirm-detail">
                    Ele receberá uma mensagem alertando sobre o uso inadequado de EPIs.
                  </p>
                </div>
                <div className="modal-footer">
                  <button className="btn-secondary" onClick={() => setShowConfirmModal(false)}>Cancelar</button>
                  <button className="btn-warning" onClick={handleConfirmAction}>Sim, Notificar</button>
                </div>
              </>
            )}

            {confirmAction === 'block' && (
              <>
                <div className="modal-header modal-header--danger">
                  <h2>Confirmar Bloqueio</h2>
                  <button className="modal-close" onClick={() => setShowConfirmModal(false)} aria-label="Fechar modal">✕</button>
                </div>
                <div className="modal-body">
                  <div className="confirm-warning">
                    <p className="confirm-message">
                      ⚠️ Tem certeza que deseja <strong>BLOQUEAR</strong> a entrada de <strong>{selectedEmployee.nome}</strong>?
                    </p>
                    <p className="confirm-detail">
                      Esta ação é permanente até que seja manualmente desbloqueada pelo administrador. O funcionário não poderá acessar a área de risco.
                    </p>
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn-secondary" onClick={() => setShowConfirmModal(false)}>Cancelar</button>
                  <button className="btn-danger" onClick={handleConfirmAction}>Sim, Bloquear Acesso</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default EPIs;