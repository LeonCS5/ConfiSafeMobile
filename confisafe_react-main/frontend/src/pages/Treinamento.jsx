import React, { useState } from 'react';
import HeaderAuth from '../components/Layout/HeaderAuth';
import Sidebar from '../components/Layout/Sidebar';
import Footer from '../components/Layout/Footer';
import '../styles/header.css';
import '../styles/sidebar.css';
import '../styles/layout.css';
import '../styles/components.css';
import '../styles/treinamento.css';

const Treinamento = () => {
  const [activeTab, setActiveTab] = useState('employees');
  const [filterStatus, setFilterStatus] = useState('all');

  const [trainings, setTrainings] = useState([
    {
      id: 1,
      funcionario: 'João Silva',
      cargo: 'Operador de Máquinas',
      iniciais: 'JS',
      curso: 'NR-33 Trabalhador Autorizado',
      dataConclusao: '15/08/2024',
      validade: '14/08/2025',
      status: 'valido',
    },
    {
      id: 2,
      funcionario: 'Maria Santos',
      cargo: 'Técnica de Laboratório',
      iniciais: 'MS',
      curso: 'NR-33 Vigias',
      dataConclusao: '10/11/2023',
      validade: '09/11/2024',
      status: 'vencendo',
    },
    {
      id: 3,
      funcionario: 'Carlos Oliveira',
      cargo: 'Supervisor',
      iniciais: 'CO',
      curso: 'NR-33 Supervisor de Entrada',
      dataConclusao: '20/05/2023',
      validade: '19/05/2024',
      status: 'vencido',
    },
    {
      id: 4,
      funcionario: 'Ana Silva',
      cargo: 'Assistente',
      iniciais: 'AS',
      curso: 'NR-33 Trabalhador Autorizado',
      dataConclusao: '01/12/2024',
      validade: '30/11/2025',
      status: 'valido',
    },
  ]);

  const courses = [
    {
      id: 1,
      nome: 'NR-33 Trabalhador Autorizado',
      cargaHoraria: '16 horas',
      treinados: 8,
      validos: 6,
      vencendo: 1,
      vencidos: 1,
      descricao: 'Capacitação para trabalho em espaços confinados',
    },
    {
      id: 2,
      nome: 'NR-33 Vigias',
      cargaHoraria: '16 horas',
      treinados: 4,
      validos: 2,
      vencendo: 1,
      vencidos: 1,
      descricao: 'Treinamento para vigias de espaços confinados',
    },
    {
      id: 3,
      nome: 'NR-33 Supervisor de Entrada',
      cargaHoraria: '40 horas',
      treinados: 3,
      validos: 1,
      vencendo: 0,
      vencidos: 2,
      descricao: 'Formação para supervisores de entrada',
    },
  ];

  const scheduledTrainings = [
    {
      id: 1,
      curso: 'NR-33 Trabalhador Autorizado',
      data: '18/12/2024',
      horario: '08:00 - 17:00',
      local: 'Sala de Treinamento A',
      instrutor: 'Prof. Ricardo Almeida',
      vagas: 15,
      inscritos: 12,
      status: 'confirmado',
    },
    {
      id: 2,
      curso: 'NR-33 Vigias',
      data: '20/12/2024',
      horario: '08:00 - 17:00',
      local: 'Sala de Treinamento B',
      instrutor: 'Prof. Ricardo Almeida',
      vagas: 10,
      inscritos: 8,
      status: 'confirmado',
    },
    {
      id: 3,
      curso: 'NR-33 Supervisor de Entrada',
      data: '08/01/2025',
      horario: '08:00 - 18:00',
      local: 'Auditório Principal',
      instrutor: 'Prof. Fernanda Costa',
      vagas: 20,
      inscritos: 5,
      status: 'inscricoes_abertas',
    },
  ];

  const stats = [
    { 
      label: 'Funcionários Treinados', 
      value: trainings.length, 
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87m-4-12a4 4 0 0 1 0 7.75"/></svg>,
      trend: '+8 este mês', 
      trendType: 'up' 
    },
    { 
      label: 'Certificados Válidos', 
      value: trainings.filter(t => t.status === 'valido').length, 
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6 9 17l-5-5"/></svg>,
      trend: '87.5%', 
      trendType: '', 
      type: 'success' 
    },
    { 
      label: 'Vencendo em Breve', 
      value: trainings.filter(t => t.status === 'vencendo').length, 
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
      trend: 'Próximos 30 dias', 
      trendType: 'down', 
      type: 'warning' 
    },
    { 
      label: 'Agendados', 
      value: 3, 
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
      trend: 'Próxima semana', 
      trendType: '' 
    },
  ];

  const filteredTrainings = filterStatus === 'all' 
    ? trainings 
    : trainings.filter(t => t.status === filterStatus);

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const getAvatarClass = (status) => {
    if (status === 'valido') return 'avatar-blue';
    if (status === 'vencendo') return 'avatar-orange';
    return 'avatar-red';
  };

  const getBadgeClass = (status) => {
    if (status === 'valido') return 'badge-success';
    if (status === 'vencendo') return 'badge-warning';
    return 'badge-danger';
  };

  const getStatusLabel = (status) => {
    if (status === 'valido') return (
      <span style={{display: 'flex', alignItems: 'center', gap: '0.25rem'}}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="M20 6 9 17l-5-5"/>
        </svg>
        Válido
      </span>
    );
    if (status === 'vencendo') return (
      <span style={{display: 'flex', alignItems: 'center', gap: '0.25rem'}}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 6v6l4 2"/>
        </svg>
        Vence em breve
      </span>
    );
    return (
      <span style={{display: 'flex', alignItems: 'center', gap: '0.25rem'}}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
        Vencido
      </span>
    );
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este treinamento?')) {
      setTrainings(trainings.filter(t => t.id !== id));
    }
  };

  return (
    <div className="page-treinamento">
      <HeaderAuth />

      <div className="layout">
        <Sidebar />

        <main className="main-content">
          {/* Page Header */}
          <div className="page-header">
            <div>
              <h2>Treinamentos NR-33</h2>
              <p>Gerencie capacitações para trabalho em espaços confinados</p>
            </div>
            <div className="header-actions">
              <select className="filter-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="all">Todos os Status</option>
                <option value="valido">Válidos</option>
                <option value="vencendo">Vencendo (30 dias)</option>
                <option value="vencido">Vencidos</option>
              </select>
              <button className="btn-primary">
                + Novo Treinamento
              </button>
            </div>
          </div>

          {/* Alert Banner */}
          <div className="alert-banner">
            <div className="alert-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <div className="alert-content">
              <strong>5 treinamentos vencerão nos próximos 30 dias</strong>
              <p>Agende reciclagens para manter a conformidade</p>
            </div>
            <button className="btn-alert">Ver Detalhes</button>
          </div>

          {/* Summary Cards */}
          <div className="summary-grid">
            {stats.map((stat, idx) => (
              <div key={idx} className={`summary-card ${stat.type ? `summary-card--${stat.type}` : ''}`}>
                <div className="summary-icon">{stat.icon}</div>
                <div className="summary-info">
                  <span className="summary-value">{stat.value}</span>
                  <span className="summary-label">{stat.label}</span>
                  <span className={`summary-trend ${stat.trendType ? `trend-${stat.trendType}` : ''}`}>
                    {stat.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="tabs-section">
            <div className="tabs-header">
              <button
                className={`tab-btn ${activeTab === 'employees' ? 'active' : ''}`}
                onClick={() => setActiveTab('employees')}
              >
                Por Funcionário
              </button>
              <button
                className={`tab-btn ${activeTab === 'courses' ? 'active' : ''}`}
                onClick={() => setActiveTab('courses')}
              >
                Por Curso
              </button>
              <button
                className={`tab-btn ${activeTab === 'schedule' ? 'active' : ''}`}
                onClick={() => setActiveTab('schedule')}
              >
                Agenda
              </button>
            </div>

            {/* Tab: Por Funcionário */}
            <div className={`tab-content ${activeTab === 'employees' ? 'active' : ''}`} id="employees-tab">
              <div className="table-container">
                <table className="training-table">
                  <thead>
                    <tr>
                      <th>Funcionário</th>
                      <th>Curso NR-33</th>
                      <th>Data Conclusão</th>
                      <th>Validade</th>
                      <th>Status</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTrainings.map((t) => (
                      <tr key={t.id}>
                        <td>
                          <div className="employee-cell">
                            <div className={`avatar ${getAvatarClass(t.status)}`}>
                              {getInitials(t.funcionario)}
                            </div>
                            <div>
                              <strong>{t.funcionario}</strong>
                              <span>{t.cargo}</span>
                            </div>
                          </div>
                        </td>
                        <td>{t.curso}</td>
                        <td>{t.dataConclusao}</td>
                        <td>{t.validade}</td>
                        <td>
                          <span className={`badge ${getBadgeClass(t.status)}`}>
                            {getStatusLabel(t.status)}
                          </span>
                        </td>
                        <td>
                          <div className="action-btns">
                            <button className="btn-icon" title="Ver certificado">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                <polyline points="14 2 14 8 20 8"/>
                                <line x1="12" y1="18" x2="12" y2="12"/>
                                <line x1="9" y1="15" x2="15" y2="15"/>
                              </svg>
                            </button>
                            <button className="btn-icon btn-icon-warning" title="Agendar reciclagem">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                                <line x1="16" y1="2" x2="16" y2="6"/>
                                <line x1="8" y1="2" x2="8" y2="6"/>
                                <line x1="3" y1="10" x2="21" y2="10"/>
                              </svg>
                            </button>
                            <button
                              className="btn-icon btn-icon-danger"
                              title="Excluir"
                              onClick={() => handleDelete(t.id)}
                            >
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="3 6 5 6 21 6"/>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                <line x1="10" y1="11" x2="10" y2="17"/>
                                <line x1="14" y1="11" x2="14" y2="17"/>
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tab: Por Curso */}
            <div className={`tab-content ${activeTab === 'courses' ? 'active' : ''}`}>
              <div className="courses-grid">
                {courses.map((course) => (
                  <div key={course.id} className="course-card">
                    <div className="course-header">
                      <div className="course-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                        </svg>
                      </div>
                      <div className="course-info">
                        <h3>{course.nome}</h3>
                        <p>{course.descricao}</p>
                        <span className="course-duration">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M12 6v6l4 2"/>
                          </svg>
                          {course.cargaHoraria}
                        </span>
                      </div>
                    </div>
                    <div className="course-stats">
                      <div className="stat-item">
                        <span className="stat-value">{course.treinados}</span>
                        <span className="stat-label">Total Treinados</span>
                      </div>
                      <div className="stat-item stat-success">
                        <span className="stat-value">{course.validos}</span>
                        <span className="stat-label">Válidos</span>
                      </div>
                      <div className="stat-item stat-warning">
                        <span className="stat-value">{course.vencendo}</span>
                        <span className="stat-label">Vencendo</span>
                      </div>
                      <div className="stat-item stat-danger">
                        <span className="stat-value">{course.vencidos}</span>
                        <span className="stat-label">Vencidos</span>
                      </div>
                    </div>
                    <div className="course-actions">
                      <button className="btn-secondary">Ver Detalhes</button>
                      <button className="btn-primary-small">Agendar Turma</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tab: Agenda */}
            <div className={`tab-content ${activeTab === 'schedule' ? 'active' : ''}`}>
              <div className="schedule-list">
                {scheduledTrainings.map((training) => (
                  <div key={training.id} className="schedule-card">
                    <div className="schedule-date">
                      <div className="date-badge">
                        <span className="date-day">{training.data.split('/')[0]}</span>
                        <span className="date-month">DEZ</span>
                      </div>
                      <span className={`status-badge ${training.status === 'confirmado' ? 'status-confirmed' : 'status-open'}`}>
                        {training.status === 'confirmado' ? 'Confirmado' : 'Inscrições Abertas'}
                      </span>
                    </div>
                    <div className="schedule-info">
                      <h3>{training.curso}</h3>
                      <div className="schedule-details">
                        <div className="detail-item">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M12 6v6l4 2"/>
                          </svg>
                          <span>{training.horario}</span>
                        </div>
                        <div className="detail-item">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                            <circle cx="12" cy="10" r="3"/>
                          </svg>
                          <span>{training.local}</span>
                        </div>
                        <div className="detail-item">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                            <circle cx="12" cy="7" r="4"/>
                          </svg>
                          <span>{training.instrutor}</span>
                        </div>
                      </div>
                    </div>
                    <div className="schedule-capacity">
                      <div className="capacity-bar">
                        <div 
                          className="capacity-fill" 
                          style={{width: `${(training.inscritos / training.vagas) * 100}%`}}
                        ></div>
                      </div>
                      <span className="capacity-text">
                        {training.inscritos} / {training.vagas} vagas preenchidas
                      </span>
                      <button className="btn-enroll">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                          <circle cx="8.5" cy="7" r="4"/>
                          <line x1="20" y1="8" x2="20" y2="14"/>
                          <line x1="23" y1="11" x2="17" y2="11"/>
                        </svg>
                        Inscrever Funcionário
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Treinamento;
