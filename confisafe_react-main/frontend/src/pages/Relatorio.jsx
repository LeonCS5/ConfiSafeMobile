import React, { useState } from 'react';
import HeaderAuth from '../components/Layout/HeaderAuth';
import Sidebar from '../components/Layout/Sidebar';
import Footer from '../components/Layout/Footer';
import '../styles/relatorio.css';

const Relatorio = () => {
  const [period, setPeriod] = useState('30');
  const [modalActive, setModalActive] = useState(false);
  const [modalType, setModalType] = useState('');
  const [notes, setNotes] = useState('');
  const [activeChartTab, setActiveChartTab] = useState('semanal');

  // KPI Data
  const kpiData = [
    {
      id: 'epi',
      title: 'Conformidade com EPI',
      value: '92%',
      label: 'Meta: 95%',
      trend: '+5%',
      trendType: 'up',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 12l2 2 4-4"/>
          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"/>
        </svg>
      ),
      iconBg: 'kpi-icon--blue',
      progress: 92
    },
    
    {
      id: 'excecoes',
      title: 'Exceções Registradas',
      value: '5',
      label: '2 críticas, 3 resolvidas',
      trend: '-12%',
      trendType: 'down',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
          <line x1="12" y1="9" x2="12" y2="13"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
      ),
      iconBg: 'kpi-icon--orange',
      progress: 40,
      progressType: 'warning'
    },
    {
      id: 'atividade',
      title: 'Usuários Ativos',
      value: '156',
      label: '18 ativos hoje',
      trend: '+8%',
      trendType: 'up',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      iconBg: 'kpi-icon--green',
      progress: 78,
      progressType: 'success'
    },
    {
      id: 'incidentes',
      title: 'Incidentes',
      value: '3',
      label: '1 grave, 2 resolvidos',
      trend: '-25%',
      trendType: 'down',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      ),
      iconBg: 'kpi-icon--red',
      progress: 33,
      progressType: 'danger'
    }
  ];

  // Weekly Chart Data (line chart)
  const weeklyChartData = [
    { day: 'Seg', value: 85, label: '85%' },
    { day: 'Ter', value: 88, label: '88%' },
    { day: 'Qua', value: 82, label: '82%' },
    { day: 'Qui', value: 90, label: '90%' },
    { day: 'Sex', value: 94, label: '94%' },
    { day: 'Sáb', value: 92, label: '92%' },
    { day: 'Dom', value: 96, label: '96%' }
  ];

  // Monthly Chart Data
  const monthlyChartData = [
    { month: 'Jan', value: 78 },
    { month: 'Fev', value: 82 },
    { month: 'Mar', value: 85 },
    { month: 'Abr', value: 83 },
    { month: 'Mai', value: 88 },
    { month: 'Jun', value: 92 }
  ];

  // Area Distribution Data (donut chart)
  const areaDistributionData = [
    { area: 'Produção', value: 35, color: '#166cc7', conforme: 94 },
    { area: 'Manutenção', value: 25, color: '#28a745', conforme: 88 },
    { area: 'Logística', value: 20, color: '#ffc107', conforme: 91 },
    { area: 'Soldagem', value: 12, color: '#dc3545', conforme: 78 },
    { area: 'Outros', value: 8, color: '#6c757d', conforme: 85 }
  ];

  // Incident Types Data
  const incidentTypesData = [
    { type: 'Quedas', count: 3, severity: 'high' },
    { type: 'Cortes', count: 5, severity: 'medium' },
    { type: 'Queimaduras', count: 2, severity: 'high' },
    { type: 'Contusões', count: 8, severity: 'low' },
    { type: 'Outros', count: 4, severity: 'low' }
  ];

  // Recent Activity Data
  const recentActivityData = [
    { id: 1, user: 'João Silva', action: 'Verificou EPIs', time: '14:32', status: 'success' },
    { id: 2, user: 'Maria Santos', action: 'Registrou exceção', time: '14:28', status: 'warning' },
    { id: 3, user: 'Carlos Oliveira', action: 'Aprovou equipamento', time: '14:15', status: 'success' },
    { id: 4, user: 'Ana Costa', action: 'Bloqueou acesso', time: '13:55', status: 'danger' },
    { id: 5, user: 'Pedro Lima', action: 'Concluiu treinamento', time: '13:40', status: 'success' }
  ];

  const reportCards = [
    {
      id: 'epi',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10 9 9 9 8 9"/>
        </svg>
      ),
      title: 'Relatório de EPIs',
      description: 'Análise completa de conformidade e uso de equipamentos',
      lastUpdate: 'Hoje, 15:30',
      stats: { total: 156, pendentes: 12 }
    },
    {
      id: 'excecoes',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
          <line x1="12" y1="9" x2="12" y2="13"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
      ),
      title: 'Relatório de Exceções',
      description: 'Casos de não conformidade e falhas registradas',
      lastUpdate: 'Hoje, 14:20',
      stats: { total: 5, críticos: 2 }
    },
    {
      id: 'atividade',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
        </svg>
      ),
      title: 'Atividade de Usuários',
      description: 'Monitoramento de acessos e padrões de uso',
      lastUpdate: 'Hoje, 16:00',
      stats: { total: 1245, hoje: 87 }
    },
    {
      id: 'incidentes',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      ),
      title: 'Relatório de Incidentes',
      description: 'Registro e acompanhamento de ocorrências',
      lastUpdate: 'Hoje, 13:45',
      stats: { total: 22, resolvidos: 19 }
    }
  ];

  const metricsData = [
    { label: 'Taxa de Conformidade Média', value: 92, type: 'default', target: 95 },
    { label: 'Incidentes Resolvidos', value: 75, type: 'success', target: 100 },
    { label: 'Treinamentos Concluídos', value: 100, type: 'success', target: 100 },
    { label: 'Equipamentos Aprovados', value: 88, type: 'default', target: 95 }
  ];

  const modalContent = {
    epi: {
      title: 'Relatório de EPIs',
      content: (
        <div>
          <h4>Análise de Conformidade</h4>
          <p>A conformidade geral com o uso de EPIs atingiu 92% durante o período selecionado.</p>
          
          <h4>Distribuição por Tipo</h4>
          <ul>
            <li>Capacetes: 95% de conformidade</li>
            <li>Luvas: 88% de conformidade</li>
            <li>Máscaras: 85% de conformidade</li>
            <li>Coletes: 92% de conformidade</li>
          </ul>

          <h4>Áreas com Menor Conformidade</h4>
          <ul>
            <li>Setor de Soldagem: 78%</li>
            <li>Manutenção: 82%</li>
            <li>Produção: 90%</li>
          </ul>

          <h4>Recomendações</h4>
          <ul>
            <li>Aumentar fiscalização no setor de soldagem</li>
            <li>Realizar retrainamento para equipamento de proteção respiratória</li>
            <li>Revisar políticas de conformidade em áreas críticas</li>
          </ul>
        </div>
      )
    },
    excecoes: {
      title: 'Relatório de Exceções',
      content: (
        <div>
          <h4>Exceções Críticas (2)</h4>
          <ul>
            <li>Não uso de capacete em zona de risco - Setor A</li>
            <li>Máscara danificada não substituída - Setor C</li>
          </ul>

          <h4>Exceções Resolvidas (3)</h4>
          <ul>
            <li>Luva inadequada para tarefa - Resolvida em 2 horas</li>
            <li>Equipamento fora de validade - Substituído</li>
            <li>Não conformidade de padrão - Retrainamento realizado</li>
          </ul>

          <h4>Ações Necessárias</h4>
          <ul>
            <li>Intensificar monitoramento em zonas críticas</li>
            <li>Agendar reunião com supervisores de setor</li>
            <li>Revisar plano de ação para não conformidades</li>
          </ul>
        </div>
      )
    },
    atividade: {
      title: 'Atividade de Usuários',
      content: (
        <div>
          <h4>Usuários Ativos no Período</h4>
          <ul>
            <li>Total de usuários: 156</li>
            <li>Ativos hoje: 18</li>
            <li>Acessos no período: 1.245</li>
          </ul>

          <h4>Padrões de Acesso</h4>
          <ul>
            <li>Pico de acesso: 14:00 - 16:00</li>
            <li>Usuário mais ativo: João Silva (127 acessos)</li>
            <li>Tempo médio de sessão: 24 minutos</li>
          </ul>

          <h4>Estatísticas por Função</h4>
          <ul>
            <li>Técnicos: 89 acessos</li>
            <li>Supervisores: 45 acessos</li>
            <li>Administradores: 32 acessos</li>
          </ul>
        </div>
      )
    },
    incidentes: {
      title: 'Relatório de Incidentes',
      content: (
        <div>
          <h4>Incidentes no Período (3)</h4>
          <ul>
            <li>Grave: 1 (Queda de equipamento)</li>
            <li>Médio: 2 (Lesões leves)</li>
            <li>Baixo: 4 (Não conformidades menores)</li>
          </ul>

          <h4>Incidentes Resolvidos (2)</h4>
          <ul>
            <li>Queda de ferramenta - Investigado, conclusão: falta de proteção adequada</li>
            <li>Lesão leve por contato - Tratado e acompanhado</li>
          </ul>

          <h4>Ações Corretivas</h4>
          <ul>
            <li>Implementar sistema de segura para ferramentas</li>
            <li>Reforçar treinamento de proteção</li>
            <li>Auditar práticas de segurança em setores críticos</li>
          </ul>
        </div>
      )
    }
  };

  const handleOpenModal = (type) => {
    setModalType(type);
    setModalActive(true);
    setNotes('');
  };

  const handleCloseModal = () => {
    setModalActive(false);
  };

  const handleSaveNotes = () => {
    alert(`Observações salvas para o relatório de ${modalContent[modalType]?.title}`);
    handleCloseModal();
  };

  const handleExportPDF = () => {
    alert(`Exportando relatório dos últimos ${period} dias...`);
  };

  // Calculate donut chart path
  const calculateDonutPath = (percentage, startAngle = 0) => {
    const radius = 60;
    const endAngle = startAngle + (percentage / 100) * 360;
    const startRad = (startAngle - 90) * (Math.PI / 180);
    const endRad = (endAngle - 90) * (Math.PI / 180);
    const x1 = 80 + radius * Math.cos(startRad);
    const y1 = 80 + radius * Math.sin(startRad);
    const x2 = 80 + radius * Math.cos(endRad);
    const y2 = 80 + radius * Math.sin(endRad);
    const largeArc = percentage > 50 ? 1 : 0;
    return `M 80 80 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
  };

  return (
    <div className="page-relatorio">
      <HeaderAuth />
      <div className="layout">
        <Sidebar />
        <main className="main-content">
          {/* Page Header */}
          <div className="page-header">
            <div className="page-header-content">
              <div className="page-title-wrapper">
                <h2>Relatórios de Segurança</h2>
                <span className="page-badge">Painel</span>
              </div>
              <p>Acompanhe métricas, conformidade e KPIs do sistema em tempo real</p>
            </div>
            <div className="header-actions">
              <div className="period-selector">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <select className="period-select" value={period} onChange={(e) => setPeriod(e.target.value)}>
                  <option value="7">Últimos 7 dias</option>
                  <option value="30">Últimos 30 dias</option>
                  <option value="90">Últimos 90 dias</option>
                  <option value="365">Último ano</option>
                </select>
              </div>
              <button className="btn-secondary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="1 4 1 10 7 10"/>
                  <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
                </svg>
                Atualizar
              </button>
              <button className="btn-primary" onClick={handleExportPDF}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Exportar PDF
              </button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="kpi-grid">
            {kpiData.map((kpi) => (
              <div key={kpi.id} className={`kpi-card kpi-card--${kpi.id}`} onClick={() => handleOpenModal(kpi.id)}>
                <div className="kpi-header">
                  <div className={`kpi-icon ${kpi.iconBg}`}>{kpi.icon}</div>
                  <span className={`kpi-trend trend-${kpi.trendType}`}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      {kpi.trendType === 'up' ? (
                        <polyline points="18 15 12 9 6 15"/>
                      ) : (
                        <polyline points="6 9 12 15 18 9"/>
                      )}
                    </svg>
                    {kpi.trend}
                  </span>
                </div>
                <div className="kpi-body">
                  <h3>{kpi.title}</h3>
                  <div className="kpi-value">{kpi.value}</div>
                  <p className="kpi-label">{kpi.label}</p>
                </div>
                <div className="kpi-footer">
                  <div className="progress-bar">
                    <div
                      className={`progress-fill ${kpi.progressType ? `progress-fill--${kpi.progressType}` : ''}`}
                      style={{ width: `${kpi.progress}%` }}
                    ></div>
                  </div>
                  <span className="progress-label">{kpi.progress}%</span>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="charts-section">
            {/* Line Chart - Weekly Compliance */}
            <div className="chart-card chart-card--main">
              <div className="chart-header">
                <div className="chart-title-wrapper">
                  <h3>Conformidade ao Longo do Tempo</h3>
                  <p>Evolução da taxa de conformidade</p>
                </div>
                <div className="chart-tabs">
                  <button 
                    className={`chart-tab ${activeChartTab === 'semanal' ? 'active' : ''}`}
                    onClick={() => setActiveChartTab('semanal')}
                  >
                    Semanal
                  </button>
                  <button 
                    className={`chart-tab ${activeChartTab === 'mensal' ? 'active' : ''}`}
                    onClick={() => setActiveChartTab('mensal')}
                  >
                    Mensal
                  </button>
                </div>
              </div>
              <div className="chart-body">
                {activeChartTab === 'semanal' ? (
                  <div className="line-chart">
                    <div className="chart-y-axis">
                      <span>100%</span>
                      <span>75%</span>
                      <span>50%</span>
                      <span>25%</span>
                      <span>0%</span>
                    </div>
                    <div className="chart-area">
                      <svg className="chart-svg" viewBox="0 0 700 200" preserveAspectRatio="none">
                        {/* Grid lines */}
                        <line x1="0" y1="0" x2="700" y2="0" className="grid-line" />
                        <line x1="0" y1="50" x2="700" y2="50" className="grid-line" />
                        <line x1="0" y1="100" x2="700" y2="100" className="grid-line" />
                        <line x1="0" y1="150" x2="700" y2="150" className="grid-line" />
                        <line x1="0" y1="200" x2="700" y2="200" className="grid-line" />
                        
                        {/* Area fill */}
                        <path
                          d={`M 0 ${200 - weeklyChartData[0].value * 2} 
                              L 116 ${200 - weeklyChartData[1].value * 2} 
                              L 233 ${200 - weeklyChartData[2].value * 2} 
                              L 350 ${200 - weeklyChartData[3].value * 2} 
                              L 466 ${200 - weeklyChartData[4].value * 2} 
                              L 583 ${200 - weeklyChartData[5].value * 2} 
                              L 700 ${200 - weeklyChartData[6].value * 2}
                              L 700 200 L 0 200 Z`}
                          className="chart-area-fill"
                        />
                        
                        {/* Line */}
                        <polyline
                          points={weeklyChartData.map((d, i) => `${i * 116},${200 - d.value * 2}`).join(' ')}
                          className="chart-line"
                        />
                        
                        {/* Data points */}
                        {weeklyChartData.map((d, i) => (
                          <g key={i}>
                            <circle
                              cx={i * 116}
                              cy={200 - d.value * 2}
                              r="6"
                              className="chart-point"
                            />
                            <circle
                              cx={i * 116}
                              cy={200 - d.value * 2}
                              r="3"
                              className="chart-point-inner"
                            />
                          </g>
                        ))}
                      </svg>
                      <div className="chart-x-axis">
                        {weeklyChartData.map((d, i) => (
                          <span key={i}>{d.day}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bar-chart">
                    <div className="chart-y-axis">
                      <span>100%</span>
                      <span>75%</span>
                      <span>50%</span>
                      <span>25%</span>
                      <span>0%</span>
                    </div>
                    <div className="bars-container">
                      {monthlyChartData.map((d, i) => (
                        <div key={i} className="bar-wrapper">
                          <div className="bar-value">{d.value}%</div>
                          <div className="bar" style={{ height: `${d.value}%` }}>
                            <div className="bar-fill"></div>
                          </div>
                          <span className="bar-label">{d.month}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="chart-legend">
                <span className="legend-item">
                  <span className="legend-dot legend-dot--blue"></span>
                  Conformidade (%)
                </span>
                <span className="legend-item">
                  <span className="legend-line"></span>
                  Meta: 95%
                </span>
              </div>
            </div>

            {/* Donut Chart - Area Distribution */}
            <div className="chart-card">
              <div className="chart-header">
                <div className="chart-title-wrapper">
                  <h3>Distribuição por Área</h3>
                  <p>Funcionários por setor</p>
                </div>
              </div>
              <div className="donut-chart-container">
                <div className="donut-chart">
                  <svg viewBox="0 0 160 160">
                    {(() => {
                      let currentAngle = 0;
                      return areaDistributionData.map((item, index) => {
                        const path = calculateDonutPath(item.value, currentAngle);
                        currentAngle += (item.value / 100) * 360;
                        return (
                          <path
                            key={index}
                            d={path}
                            fill={item.color}
                            className="donut-segment"
                          />
                        );
                      });
                    })()}
                    <circle cx="80" cy="80" r="40" fill="white" />
                  </svg>
                  <div className="donut-center">
                    <span className="donut-value">156</span>
                    <span className="donut-label">Total</span>
                  </div>
                </div>
                <div className="donut-legend">
                  {areaDistributionData.map((item, index) => (
                    <div key={index} className="donut-legend-item">
                      <span className="legend-color" style={{ backgroundColor: item.color }}></span>
                      <span className="legend-text">{item.area}</span>
                      <span className="legend-value">{item.value}%</span>
                      <span className={`legend-badge ${item.conforme >= 90 ? 'badge-success' : item.conforme >= 80 ? 'badge-warning' : 'badge-danger'}`}>
                        {item.conforme}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Second Row Charts */}
          <div className="charts-section charts-section--secondary">
            {/* Incident Types */}
            <div className="chart-card">
              <div className="chart-header">
                <div className="chart-title-wrapper">
                  <h3>Tipos de Incidentes</h3>
                  <p>Últimos {period} dias</p>
                </div>
              </div>
              <div className="horizontal-bar-chart">
                {incidentTypesData.map((item, index) => (
                  <div key={index} className="h-bar-item">
                    <div className="h-bar-header">
                      <span className="h-bar-label">{item.type}</span>
                      <span className={`severity-badge severity-${item.severity}`}>
                        {item.severity === 'high' ? 'Alto' : item.severity === 'medium' ? 'Médio' : 'Baixo'}
                      </span>
                    </div>
                    <div className="h-bar-container">
                      <div 
                        className={`h-bar-fill h-bar-fill--${item.severity}`} 
                        style={{ width: `${(item.count / 10) * 100}%` }}
                      >
                        <span className="h-bar-value">{item.count}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="chart-card">
              <div className="chart-header">
                <div className="chart-title-wrapper">
                  <h3>Atividade Recente</h3>
                  <p>Últimas ações no sistema</p>
                </div>
                <button className="btn-link">Ver tudo</button>
              </div>
              <div className="activity-list">
                {recentActivityData.map((activity) => (
                  <div key={activity.id} className="activity-item">
                    <div className={`activity-indicator activity-indicator--${activity.status}`}></div>
                    <div className="activity-content">
                      <span className="activity-user">{activity.user}</span>
                      <span className="activity-action">{activity.action}</span>
                    </div>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reports Section */}
          <div className="reports-section">
            <div className="section-header">
              <div>
                <h3 className="section-title">Relatórios Detalhados</h3>
                <p className="section-subtitle">Acesse análises completas de cada área</p>
              </div>
              <button className="btn-outline">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                Buscar Relatório
              </button>
            </div>

            <div className="reports-grid">
              {reportCards.map((report) => (
                <div
                  key={report.id}
                  className={`report-card report-card--${report.id}`}
                  onClick={() => handleOpenModal(report.id)}
                >
                  <div className="report-icon">{report.icon}</div>
                  <div className="report-content">
                    <h4>{report.title}</h4>
                    <p>{report.description}</p>
                    <div className="report-stats">
                      <span className="stat-item">
                        <strong>{Object.values(report.stats)[0]}</strong> total
                      </span>
                      <span className="stat-divider">•</span>
                      <span className="stat-item stat-item--highlight">
                        <strong>{Object.values(report.stats)[1]}</strong> {Object.keys(report.stats)[1]}
                      </span>
                    </div>
                    <div className="report-meta">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                      </svg>
                      <span>{report.lastUpdate}</span>
                    </div>
                  </div>
                  <div className="report-arrow">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="metrics-section">
            <div className="section-header">
              <div>
                <h3 className="section-title">Métricas de Performance</h3>
                <p className="section-subtitle">Acompanhe o progresso em relação às metas</p>
              </div>
            </div>

            <div className="metrics-grid">
              {metricsData.map((metric, idx) => (
                <div key={idx} className="metric-item">
                  <div className="metric-header">
                    <span className="metric-label">{metric.label}</span>
                    <span className="metric-target">Meta: {metric.target}%</span>
                  </div>
                  <div className="metric-bar">
                    <div
                      className={`metric-bar-fill ${metric.type === 'success' ? 'metric-bar-fill--success' : ''}`}
                      style={{ width: `${metric.value}%` }}
                    >
                    </div>
                    <div className="metric-target-line" style={{ left: `${metric.target}%` }}></div>
                  </div>
                  <div className="metric-footer">
                    <span className="metric-value">{metric.value}%</span>
                    <span className={`metric-status ${metric.value >= metric.target ? 'status-success' : 'status-warning'}`}>
                      {metric.value >= metric.target ? '✓ Meta atingida' : `Faltam ${metric.target - metric.value}%`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
      <Footer />

      {/* Modal */}
      {modalActive && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{modalContent[modalType]?.title}</h3>
              <button className="modal-close" onClick={handleCloseModal}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <div className="modal-body">{modalContent[modalType]?.content}</div>
            <div className="modal-footer">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Digite observações sobre este relatório..."
                rows="4"
              ></textarea>
              <div className="modal-actions">
                <button className="btn-secondary" onClick={handleCloseModal}>Cancelar</button>
                <button className="btn-primary" onClick={handleSaveNotes}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                    <polyline points="17 21 17 13 7 13 7 21"/>
                    <polyline points="7 3 7 8 15 8"/>
                  </svg>
                  Salvar Observações
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Relatorio;


// 663 linha para arrumar a cor
// 664