// ============================================================================
// CONTROLE DE ACESSO - Página principal para gerenciamento de acessos
// ============================================================================

// Importação do React e do hook useState para gerenciar estados do componente
import React, { useState } from 'react';

// Importação dos componentes de layout reutilizáveis
import HeaderAuth from '../components/Layout/HeaderAuth'; // Cabeçalho para usuários autenticados
import Sidebar from '../components/Layout/Sidebar';       // Menu lateral de navegação
import Footer from '../components/Layout/Footer';         // Rodapé da página

// Importação dos arquivos CSS para estilização
import '../styles/header.css';
import '../styles/sidebar.css';
import '../styles/layout.css';
import '../styles/components.css';
import '../styles/controle-acesso.css';

// ============================================================================
// COMPONENTE PRINCIPAL - ControleAcesso
// ============================================================================
const ControleAcesso = () => {
  
  // ==========================================================================
  // ESTADOS DO COMPONENTE (useState)
  // Estados são variáveis que, quando alteradas, fazem o componente re-renderizar
  // ==========================================================================
  
  // Estado para armazenar o termo de busca digitado pelo usuário
  const [searchTerm, setSearchTerm] = useState('');
  
  // Estado para armazenar o filtro selecionado ('all', 'ativo', 'bloqueado')
  const [filterType, setFilterType] = useState('all');
  
  // Estado para controlar se o modal de adicionar/editar está visível
  const [showModal, setShowModal] = useState(false);
  
  // Estado para controlar se o modal de detalhes está visível
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  
  // Estado para armazenar o ID do funcionário sendo editado (null = novo cadastro)
  const [editingId, setEditingId] = useState(null);
  
  // Estado para armazenar o funcionário cujos detalhes estão sendo visualizados
  const [viewingEmployee, setViewingEmployee] = useState(null);
  
  // Estado para controlar a página atual na paginação da tabela
  const [currentPage, setCurrentPage] = useState(1);
  
  // Estado para armazenar os dados do formulário de cadastro/edição
  const [formData, setFormData] = useState({
    nome: '',           // Nome completo do funcionário
    cargo: '',          // Cargo/função do funcionário
    area: '',           // Área/departamento onde trabalha
    nivelAcesso: 'Nível 2', // Nível de acesso padrão
    status: 'ativo',    // Status inicial: ativo ou bloqueado
  });

  // ==========================================================================
  // DADOS DOS FUNCIONÁRIOS (Estado inicial com dados de exemplo)
  // Em uma aplicação real, esses dados viriam de uma API/banco de dados
  // ==========================================================================
  const [employees, setEmployees] = useState([
    {
      id: 1,                           // ID único do funcionário
      nome: 'João Silva',              // Nome completo
      cargo: 'Operador de Máquinas',   // Cargo/função
      area: 'Setor de Produção',       // Área/departamento
      dataCadastro: '15/01/2024',      // Data de cadastro no sistema
      nivelAcesso: 'Nível 2',          // Nível de permissão de acesso
      status: 'ativo',                 // Status atual (ativo/bloqueado)
      historico: [                     // Histórico de alterações do funcionário
        { data: '15/01/2024 10:30', acao: 'Cadastro inicial', usuario: 'Sistema' }
      ]
    },
    {
      id: 2,
      nome: 'Maria Santos',
      cargo: 'Técnica de Laboratório',
      area: 'Laboratório Químico',
      dataCadastro: '20/02/2024',
      nivelAcesso: 'Nível 3',
      status: 'ativo',
      historico: [
        { data: '20/02/2024 14:15', acao: 'Cadastro inicial', usuario: 'Sistema' },
        { data: '25/03/2024 09:20', acao: 'Nível de acesso: Nível 2 → Nível 3', usuario: 'Admin' }
      ]
    },
    {
      id: 3,
      nome: 'Carlos Oliveira',
      cargo: 'Auxiliar de Manutenção',
      area: 'Manutenção',
      dataCadastro: '10/03/2024',
      nivelAcesso: 'Nível 1',
      status: 'bloqueado',             // Este funcionário está com acesso bloqueado
      historico: [
        { data: '10/03/2024 11:00', acao: 'Cadastro inicial', usuario: 'Sistema' },
        { data: '05/11/2024 16:45', acao: 'Status: Ativo → Bloqueado', usuario: 'Admin' }
      ]
    },
    {
      id: 4,
      nome: 'Ana Costa',
      cargo: 'Supervisora',
      area: 'Administrativo',
      dataCadastro: '05/01/2024',
      nivelAcesso: 'Nível 4',          // Nível mais alto de acesso
      status: 'ativo',
      historico: [
        { data: '05/01/2024 08:00', acao: 'Cadastro inicial', usuario: 'Sistema' }
      ]
    },
  ]);

  // ==========================================================================
  // ALERTAS DE SEGURANÇA
  // Lista de alertas de segurança exibidos na página
  // ==========================================================================
  const [securityAlerts, setSecurityAlerts] = useState([
    {
      id: 1,
      // Ícone SVG de triângulo de aviso (alerta de perigo)
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
          <line x1="12" y1="9" x2="12" y2="13"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
      ),
      title: 'Tentativa de Acesso Não Autorizado',   // Título do alerta
      desc: 'Usuário tentou acessar área restrita sem permissão adequada', // Descrição
      time: 'Há 15 minutos',      // Tempo decorrido desde o alerta
      location: 'Portão Principal', // Local onde ocorreu
      type: 'high',               // Tipo: high (alta prioridade), medium, info
      resolved: false,            // Se já foi resolvido ou não
    },
    {
      id: 2,
      // Ícone SVG de relógio (horário incomum)
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
      ),
      title: 'Horário de Acesso Incomum',
      desc: 'Acesso detectado fora do horário comercial estabelecido',
      time: 'Há 2 horas',
      location: 'Setor Administrativo',
      type: 'medium',             // Prioridade média
      resolved: false,
    },
    {
      id: 3,
      // Ícone SVG de informação (círculo com "i")
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="16" x2="12" y2="12"/>
          <line x1="12" y1="8" x2="12.01" y2="8"/>
        </svg>
      ),
      title: 'Credencial Próxima do Vencimento',
      desc: '3 credenciais de acesso expiram nos próximos 7 dias',
      time: 'Hoje',
      location: 'Sistema Principal',
      type: 'info',               // Tipo informativo (menor prioridade)
      resolved: false,
    },
  ]);

  // ==========================================================================
  // CARDS DE ESTATÍSTICAS
  // Array de objetos que representam os cards de estatísticas no topo da página
  // Cada objeto contém: label, valor, ícone, tendência e cor
  // ==========================================================================
  const stats = [
    { 
      label: 'Usuários Ativos',        // Rótulo exibido no card
      // Valor calculado dinamicamente: conta funcionários com status 'ativo'
      value: employees.filter(e => e.status === 'ativo').length, 
      // Ícone SVG representando usuários/pessoas
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ), 
      trend: '+5%',         // Percentual de variação
      trendType: 'up',      // Direção da tendência: up (subiu), down (desceu), neutral
      color: 'blue'         // Cor do card
    },
    { 
      label: 'Acessos Hoje',           // Quantidade de acessos no dia
      value: 42,                       // Valor fixo (em produção viria de uma API)
      // Ícone SVG representando entrada/acesso
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
          <polyline points="10 17 15 12 10 7"/>
          <line x1="15" y1="12" x2="3" y2="12"/>
        </svg>
      ), 
      trend: '0%',          // Sem variação
      trendType: 'neutral', // Tendência neutra
      color: 'green'
    },
    { 
      label: 'Tentativas Bloqueadas',  // Acessos negados/bloqueados
      value: 3, 
      // Ícone SVG representando escudo de segurança
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <path d="M12 8v4"/>
          <path d="M12 16h.01"/>
        </svg>
      ), 
      trend: '+50%',        // Aumento de 50% (negativo para segurança)
      trendType: 'down',    // Considerado ruim pois aumentaram bloqueios
      type: 'warning',      // Tipo de alerta
      color: 'orange'       // Cor de aviso
    },
    { 
      label: 'Conformidade',           // Percentual de conformidade com regras
      value: '98%',                    // 98% de conformidade
      // Ícone SVG representando check/confirmação
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      ), 
      trend: '+2%',         // Aumento de 2%
      trendType: 'up',      // Tendência positiva
      type: 'success',      // Tipo sucesso
      color: 'success'      // Cor verde de sucesso
    },
  ];

  // ==========================================================================
  // LÓGICA DE PAGINAÇÃO E FILTROS
  // ==========================================================================
  
  // Quantidade de itens (funcionários) por página na tabela
  const itemsPerPage = 5;
  
  // Filtra os funcionários baseado no termo de busca e no filtro de status
  const filteredEmployees = employees.filter(emp => {
    // Verifica se o nome, cargo ou área contém o termo de busca (case insensitive)
    const matchSearch = emp.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       emp.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       emp.area.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Verifica se o status corresponde ao filtro selecionado
    // Se filterType for 'all', mostra todos
    const matchFilter = filterType === 'all' || emp.status === filterType;
    
    // Retorna true apenas se ambas as condições forem atendidas
    return matchSearch && matchFilter;
  });

  // Calcula o número total de páginas baseado nos funcionários filtrados
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  
  // Calcula o índice inicial para a página atual (0-indexed)
  const startIndex = (currentPage - 1) * itemsPerPage;
  
  // Obtém apenas os funcionários da página atual usando slice
  const paginatedEmployees = filteredEmployees.slice(startIndex, startIndex + itemsPerPage);

  // ==========================================================================
  // FUNÇÕES AUXILIARES (HELPERS)
  // ==========================================================================

  /**
   * Função para mudar de página na paginação
   * @param {number} page - Número da página desejada
   */
  const handlePageChange = (page) => {
    // Só muda se a página estiver dentro dos limites válidos
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  /**
   * Função para obter as iniciais do nome (para exibir no avatar)
   * Ex: "João Silva" retorna "JS"
   * @param {string} name - Nome completo do funcionário
   * @returns {string} - As duas primeiras iniciais em maiúsculo
   */
  const getInitials = (name) => {
    return name.split(' ')           // Divide o nome em palavras
      .map(n => n[0])                // Pega a primeira letra de cada palavra
      .join('')                      // Junta todas as letras
      .toUpperCase()                 // Converte para maiúsculo
      .substring(0, 2);              // Pega apenas os 2 primeiros caracteres
  };

  /**
   * Função para gerar timestamp atual formatado para o histórico
   * @returns {string} - Data e hora no formato "DD/MM/YYYY HH:MM"
   */
  const getTimestamp = () => {
    const now = new Date();
    return `${now.toLocaleDateString('pt-BR')} ${now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
  };

  /**
   * Função para detectar quais campos foram alterados entre dois objetos
   * Usada para registrar mudanças no histórico
   * @param {object} oldData - Dados antigos do funcionário
   * @param {object} newData - Dados novos do funcionário
   * @returns {array} - Array de strings descrevendo as mudanças
   */
  const getChanges = (oldData, newData) => {
    const changes = [];
    if (oldData.nome !== newData.nome) changes.push(`Nome: ${oldData.nome} → ${newData.nome}`);
    if (oldData.cargo !== newData.cargo) changes.push(`Cargo: ${oldData.cargo} → ${newData.cargo}`);
    if (oldData.area !== newData.area) changes.push(`Área: ${oldData.area} → ${newData.area}`);
    if (oldData.nivelAcesso !== newData.nivelAcesso) changes.push(`Nível: ${oldData.nivelAcesso} → ${newData.nivelAcesso}`);
    if (oldData.status !== newData.status) changes.push(`Status: ${oldData.status} → ${newData.status}`);
    return changes;
  };

  // ==========================================================================
  // FUNÇÕES DE MANIPULAÇÃO DE DADOS (HANDLERS)
  // ==========================================================================

  /**
   * Função para excluir um funcionário
   * Exibe confirmação antes de remover
   * @param {number} id - ID do funcionário a ser removido
   */
  const handleDelete = (id) => {
    // window.confirm exibe uma caixa de diálogo de confirmação
    if (window.confirm('Tem certeza que deseja remover este acesso?')) {
      // Filtra o array removendo o funcionário com o ID especificado
      setEmployees(employees.filter(e => e.id !== id));
    }
  };

  /**
   * Função para liberar o acesso de um funcionário bloqueado
   * Muda o status de 'bloqueado' para 'ativo' e registra no histórico
   * @param {number} id - ID do funcionário a ser liberado
   */
  const handleAllowAccess = (id) => {
    if (window.confirm('Deseja liberar o acesso deste funcionário?')) {
      // Mapeia o array e atualiza apenas o funcionário com o ID correto
      setEmployees(employees.map(e => {
        if (e.id === id) {
          return {
            ...e,                    // Mantém todos os dados existentes
            status: 'ativo',         // Atualiza o status para ativo
            // Adiciona um novo registro ao histórico
            historico: [...e.historico, { data: getTimestamp(), acao: 'Status: Bloqueado → Ativo', usuario: 'Admin' }]
          };
        }
        return e; // Retorna funcionários não alterados como estão
      }));
    }
  };

  /**
   * Função para marcar um alerta de segurança como resolvido
   * @param {number} alertId - ID do alerta a ser marcado como resolvido
   */
  const handleResolveAlert = (alertId) => {
    // Mapeia os alertas e marca o específico como resolvido
    setSecurityAlerts(securityAlerts.map(alert =>
      alert.id === alertId ? { ...alert, resolved: true } : alert
    ));
  };

  /**
   * Função para abrir o modal de detalhes de um funcionário
   * @param {object} employee - Objeto do funcionário a ser visualizado
   */
  const handleViewDetails = (employee) => {
    setViewingEmployee(employee);    // Define qual funcionário está sendo visualizado
    setShowDetailsModal(true);       // Abre o modal de detalhes
  };

  /**
   * Função para abrir o modal de adicionar/editar funcionário
   * @param {object|null} employee - Funcionário a editar, ou null para novo cadastro
   */
  const handleOpenModal = (employee) => {
    if (employee) {
      // MODO EDIÇÃO: preenche o formulário com os dados existentes
      setEditingId(employee.id);     // Guarda o ID para saber que está editando
      setFormData({
        nome: employee.nome,
        cargo: employee.cargo,
        area: employee.area,
        nivelAcesso: employee.nivelAcesso,
        status: employee.status,
      });
    } else {
      // MODO CRIAÇÃO: limpa o formulário
      setEditingId(null);            // null indica novo cadastro
      setFormData({
        nome: '',
        cargo: '',
        area: '',
        nivelAcesso: 'Nível 2',      // Valor padrão
        status: 'ativo',             // Status padrão
      });
    }
    setShowModal(true);              // Abre o modal
  };

  /**
   * Função para fechar o modal de adicionar/editar
   * Limpa o formulário e reseta o estado de edição
   */
  const handleCloseModal = () => {
    setShowModal(false);             // Fecha o modal
    setEditingId(null);              // Limpa o ID de edição
    // Reseta o formulário para os valores padrão
    setFormData({ nome: '', cargo: '', area: '', nivelAcesso: 'Nível 2', status: 'ativo' });
  };

  /**
   * Função para fechar o modal de detalhes
   */
  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);      // Fecha o modal
    setViewingEmployee(null);        // Limpa o funcionário sendo visualizado
  };

  /**
   * Função para salvar um funcionário (novo ou editado)
   * Valida os campos obrigatórios antes de salvar
   */
  const handleSaveEmployee = () => {
    // VALIDAÇÃO: Verifica se os campos obrigatórios estão preenchidos
    if (!formData.nome.trim() || !formData.cargo.trim() || !formData.area.trim()) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return; // Interrompe a execução se a validação falhar
    }

    if (editingId) {
      // MODO EDIÇÃO: Atualiza um funcionário existente
      const oldEmployee = employees.find(e => e.id === editingId); // Encontra dados antigos
      const changes = getChanges(oldEmployee, formData);           // Detecta mudanças
      
      // Mapeia e atualiza o funcionário específico
      setEmployees(employees.map(e => {
        if (e.id === editingId) {
          const updatedHistorico = [...e.historico]; // Copia o histórico existente
          // Adiciona cada mudança ao histórico
          if (changes.length > 0) {
            changes.forEach(change => {
              updatedHistorico.push({ data: getTimestamp(), acao: change, usuario: 'Admin' });
            });
          }
          // Retorna o funcionário atualizado com os novos dados e histórico
          return { ...e, ...formData, historico: updatedHistorico };
        }
        return e; // Retorna outros funcionários sem alteração
      }));
      
      alert('Funcionário atualizado com sucesso!');
    } else {
      // MODO CRIAÇÃO: Adiciona um novo funcionário
      const newEmployee = {
        // Gera um novo ID (maior ID existente + 1)
        id: Math.max(...employees.map(e => e.id), 0) + 1,
        ...formData,                                              // Spread dos dados do formulário
        dataCadastro: new Date().toLocaleDateString('pt-BR'),     // Data atual
        historico: [{ data: getTimestamp(), acao: 'Cadastro inicial', usuario: 'Admin' }] // Primeiro registro
      };
      // Adiciona o novo funcionário ao array
      setEmployees([...employees, newEmployee]);
      alert('Funcionário adicionado com sucesso!');
    }

    handleCloseModal(); // Fecha o modal após salvar
  };

  // ==========================================================================
  // RENDERIZAÇÃO DO COMPONENTE (JSX)
  // O return contém todo o HTML/JSX que será exibido na tela
  // ==========================================================================
  return (
    // Container principal da página
    <div className="page-controle-acesso">
      
      {/* ===== CABEÇALHO AUTENTICADO ===== */}
      {/* Componente de cabeçalho para usuários logados */}
      <HeaderAuth />

      {/* ===== LAYOUT PRINCIPAL ===== */}
      {/* Container que organiza sidebar e conteúdo lado a lado */}
      <div className="layout">
        
        {/* Menu lateral de navegação */}
        <Sidebar />

        {/* ===== CONTEÚDO PRINCIPAL ===== */}
        <main className="main-content">
          
          {/* ----- CABEÇALHO DA PÁGINA ----- */}
          {/* Título, subtítulo e botões de ação */}
          <div className="page-header">
            <div className="header-info">
              <h1 className="page-title">Controle de Acesso</h1>
              <p className="page-subtitle">Gerencie e monitore os acessos aos sistemas e áreas restritas</p>
            </div>
            {/* Botões de ação no cabeçalho */}
            <div className="header-actions">
              {/* Botão Exportar */}
              <button className="btn btn-secondary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Exportar
              </button>
              {/* Botão Adicionar - abre o modal com formulário vazio */}
              <button className="btn btn-primary" onClick={() => handleOpenModal(null)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Adicionar Funcionário
              </button>
            </div>
          </div>

          {/* ----- CARDS DE ESTATÍSTICAS ----- */}
          {/* Grid com os 4 cards de estatísticas */}
          <div className="stats-grid">
            {/* Mapeia o array stats para criar um card para cada item */}
            {stats.map((stat, idx) => (
              <div key={idx} className={`stat-card stat-card--${stat.color || 'default'}`}>
                {/* Cabeçalho do card com ícone e tendência */}
                <div className="stat-header">
                  <div className={`stat-icon-wrapper stat-icon-wrapper--${stat.color || 'default'}`}>
                    <span className="stat-icon">{stat.icon}</span>
                  </div>
                  {/* Indicador de tendência (seta para cima/baixo) */}
                  <div className={`stat-trend stat-trend--${stat.trendType}`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      {/* Renderiza a seta de acordo com o tipo de tendência */}
                      {stat.trendType === 'up' && <polyline points="18 15 12 9 6 15"/>}
                      {stat.trendType === 'down' && <polyline points="6 9 12 15 18 9"/>}
                      {stat.trendType === 'neutral' && <line x1="5" y1="12" x2="19" y2="12"/>}
                    </svg>
                    <span>{stat.trend}</span>
                  </div>
                </div>
                {/* Corpo do card com valor e label */}
                <div className="stat-body">
                  <h3 className="stat-value">{stat.value}</h3>
                  <p className="stat-label">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ----- BARRA DE CONTROLES (Busca e Filtros) ----- */}
          <div className="control-bar">
            {/* Campo de busca */}
            <div className="search-wrapper">
              {/* Ícone de lupa */}
              <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              {/* Input de busca - atualiza o estado searchTerm a cada digitação */}
              <input
                type="text"
                className="search-input"
                placeholder="Buscar por nome, cargo ou área..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {/* Grupo de botões de filtro */}
            <div className="filter-group">
              {/* Botão "Todos" - mostra todos os funcionários */}
              <button className={`filter-chip ${filterType === 'all' ? 'active' : ''}`} onClick={() => setFilterType('all')}>
                Todos<span className="chip-count">{employees.length}</span>
              </button>
              {/* Botão "Ativos" - filtra apenas funcionários ativos */}
              <button className={`filter-chip ${filterType === 'ativo' ? 'active' : ''}`} onClick={() => setFilterType('ativo')}>
                Ativos<span className="chip-count">{employees.filter(e => e.status === 'ativo').length}</span>
              </button>
              {/* Botão "Bloqueados" - filtra apenas funcionários bloqueados */}
              <button className={`filter-chip ${filterType === 'bloqueado' ? 'active' : ''}`} onClick={() => setFilterType('bloqueado')}>
                Bloqueados<span className="chip-count">{employees.filter(e => e.status === 'bloqueado').length}</span>
              </button>
            </div>
          </div>

          {/* ----- TABELA DE FUNCIONÁRIOS ----- */}
          <div className="card">
            {/* Cabeçalho do card com título e contador de resultados */}
            <div className="card-header">
              <h2 className="card-title">Funcionários Cadastrados</h2>
              <span className="result-count">{filteredEmployees.length} resultado(s)</span>
            </div>
            <div className="card-body">
              {/* Wrapper para permitir scroll horizontal em telas pequenas */}
              <div className="table-wrapper">
                <table className="data-table">
                  {/* Cabeçalho da tabela */}
                  <thead>
                    <tr>
                      <th>Funcionário</th>
                      <th>Área</th>
                      <th>Data Cadastro</th>
                      <th>Nível Acesso</th>
                      <th>Status</th>
                      <th className="text-right">Ações</th>
                    </tr>
                  </thead>
                  {/* Corpo da tabela */}
                  <tbody>
                    {/* Renderiza os funcionários da página atual ou mensagem de vazio */}
                    {paginatedEmployees.length > 0 ? (
                      // Mapeia cada funcionário para uma linha da tabela
                      paginatedEmployees.map((emp) => (
                        <tr key={emp.id} className="table-row">
                          {/* Coluna: Info do funcionário (avatar + nome + cargo) */}
                          <td>
                            <div className="employee-info">
                              {/* Avatar com as iniciais do nome */}
                              <div className="employee-avatar">{getInitials(emp.nome)}</div>
                              <div className="employee-details">
                                <span className="employee-name">{emp.nome}</span>
                                <span className="employee-role">{emp.cargo}</span>
                              </div>
                            </div>
                          </td>
                          {/* Coluna: Área */}
                          <td><span className="text-secondary">{emp.area}</span></td>
                          {/* Coluna: Data de cadastro */}
                          <td><span className="text-secondary">{emp.dataCadastro}</span></td>
                          {/* Coluna: Nível de acesso (badge azul) */}
                          <td><span className="badge badge-blue">{emp.nivelAcesso}</span></td>
                          {/* Coluna: Status (ativo/bloqueado com indicador colorido) */}
                          <td>
                            <span className={`status-badge status-${emp.status}`}>
                              <span className="status-dot"></span>
                              {emp.status === 'ativo' ? 'Ativo' : 'Bloqueado'}
                            </span>
                          </td>
                          {/* Coluna: Botões de ação */}
                          <td>
                            <div className="action-buttons">
                              {/* Botão Ver Detalhes */}
                              <button className="action-btn action-btn-view" title="Ver detalhes" onClick={() => handleViewDetails(emp)}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                  <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                              </button>
                              {/* Renderização condicional: Liberar ou Editar */}
                              {emp.status === 'bloqueado' ? (
                                // Se bloqueado, mostra botão para liberar acesso
                                <button className="action-btn action-btn-success" title="Liberar" onClick={() => handleAllowAccess(emp.id)}>
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                  </svg>
                                </button>
                              ) : (
                                // Se ativo, mostra botão para editar
                                <button className="action-btn action-btn-edit" title="Editar" onClick={() => handleOpenModal(emp)}>
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                  </svg>
                                </button>
                              )}
                              {/* Botão Excluir */}
                              <button className="action-btn action-btn-delete" title="Excluir" onClick={() => handleDelete(emp.id)}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <polyline points="3 6 5 6 21 6"></polyline>
                                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      // Mensagem quando não há funcionários para exibir
                      <tr>
                        <td colSpan="6" className="text-center empty-state">
                          <div className="empty-icon">🔍</div>
                          <p>Nenhum funcionário encontrado</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* ----- PAGINAÇÃO ----- */}
              {/* Só exibe paginação se houver mais de 1 página */}
              {totalPages > 1 && (
                <div className="pagination">
                  {/* Botão "Anterior" - desabilitado se estiver na primeira página */}
                  <button className="pagination-btn" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                    Anterior
                  </button>
                  {/* Números das páginas */}
                  <div className="pagination-numbers">
                    {/* Cria um array de 1 até totalPages e mapeia para botões */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button key={page} className={`pagination-number ${currentPage === page ? 'active' : ''}`} onClick={() => handlePageChange(page)}>
                        {page}
                      </button>
                    ))}
                  </div>
                  {/* Botão "Próxima" - desabilitado se estiver na última página */}
                  <button className="pagination-btn" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    Próxima
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ----- SEÇÃO DE ALERTAS DE SEGURANÇA ----- */}
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Alertas de Segurança</h2>
              {/* Badge mostrando quantidade de alertas não resolvidos */}
              {securityAlerts.filter(a => !a.resolved).length > 0 && (
                <span className="alert-badge">{securityAlerts.filter(a => !a.resolved).length} novo(s)</span>
              )}
            </div>
            <div className="card-body">
              <div className="alerts-container">
                {/* Mapeia cada alerta para um card de alerta */}
                {securityAlerts.map((alert) => (
                  <div key={alert.id} className={`alert-item alert-${alert.type} ${alert.resolved ? 'alert-resolved' : ''}`}>
                    {/* Ícone do alerta */}
                    <div className="alert-icon-wrapper">
                      <span className="alert-emoji">{alert.icon}</span>
                    </div>
                    {/* Conteúdo do alerta */}
                    <div className="alert-content">
                      <h4 className="alert-title">{alert.title}</h4>
                      <p className="alert-description">{alert.desc}</p>
                      {/* Metadados: tempo e localização */}
                      <div className="alert-metadata">
                        <span className="metadata-item">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          {alert.time}
                        </span>
                        <span className="metadata-divider">•</span>
                        <span className="metadata-item">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                          </svg>
                          {alert.location}
                        </span>
                      </div>
                    </div>
                    {/* Botão para resolver o alerta */}
                    <button className={`alert-action-btn ${alert.resolved ? 'resolved' : ''}`} onClick={() => handleResolveAlert(alert.id)} disabled={alert.resolved}>
                      {alert.resolved ? (
                        // Se já resolvido, mostra ícone de check
                        <>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          Resolvido
                        </>
                      ) : ('Resolver')}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* ================================================================== */}
      {/* MODAL DE ADICIONAR/EDITAR FUNCIONÁRIO */}
      {/* Renderizado condicionalmente quando showModal é true */}
      {/* ================================================================== */}
      {showModal && (
        // Backdrop (fundo escuro) - fecha o modal ao clicar fora
        <div className="modal-backdrop" onClick={handleCloseModal}>
          {/* Container do modal - stopPropagation impede que cliques internos fechem o modal */}
          <div className="modal modal-edit" onClick={(e) => e.stopPropagation()}>
            
            {/* Cabeçalho do modal */}
            <div className="modal-header">
              <div>
                {/* Título dinâmico baseado se está editando ou criando */}
                <h3 className="modal-title">{editingId ? 'Editar Funcionário' : 'Adicionar Funcionário'}</h3>
                <p className="modal-subtitle">{editingId ? 'Atualize as informações' : 'Preencha os dados do novo funcionário'}</p>
              </div>
              {/* Botão X para fechar o modal */}
              <button className="modal-close-btn" onClick={handleCloseModal}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            {/* Corpo do modal - Formulário */}
            <div className="modal-body">
              {/* Campo: Nome Completo */}
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Nome Completo <span className="required">*</span></label>
                  {/* Input controlado - value vem do estado, onChange atualiza o estado */}
                  <input type="text" className="form-input" value={formData.nome} onChange={(e) => setFormData({ ...formData, nome: e.target.value })} placeholder="Ex: João Silva" />
                </div>
              </div>
              {/* Campos: Cargo e Área (lado a lado) */}
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Cargo <span className="required">*</span></label>
                  <input type="text" className="form-input" value={formData.cargo} onChange={(e) => setFormData({ ...formData, cargo: e.target.value })} placeholder="Ex: Operador de Máquinas" />
                </div>
                <div className="form-group">
                  <label className="form-label">Área/Departamento <span className="required">*</span></label>
                  <input type="text" className="form-input" value={formData.area} onChange={(e) => setFormData({ ...formData, area: e.target.value })} placeholder="Ex: Setor de Produção" />
                </div>
              </div>
              {/* Campos: Nível de Acesso e Status (lado a lado) */}
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Nível de Acesso</label>
                  {/* Select controlado para escolher o nível de acesso */}
                  <select className="form-select" value={formData.nivelAcesso} onChange={(e) => setFormData({ ...formData, nivelAcesso: e.target.value })}>
                    <option value="Nível 1">Nível 1 - Básico</option>
                    <option value="Nível 2">Nível 2 - Intermediário</option>
                    <option value="Nível 3">Nível 3 - Avançado</option>
                    <option value="Nível 4">Nível 4 - Administrador</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Status</label>
                  {/* Select controlado para escolher o status */}
                  <select className="form-select" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                    <option value="ativo">Ativo</option>
                    <option value="bloqueado">Bloqueado</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Rodapé do modal - Botões de ação */}
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={handleCloseModal}>Cancelar</button>
              <button className="btn btn-primary" onClick={handleSaveEmployee}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                {/* Texto dinâmico do botão */}
                {editingId ? 'Atualizar' : 'Adicionar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================== */}
      {/* MODAL DE DETALHES DO FUNCIONÁRIO */}
      {/* Exibe informações completas e histórico de alterações */}
      {/* Renderizado quando showDetailsModal é true E viewingEmployee não é null */}
      {/* ================================================================== */}
      {showDetailsModal && viewingEmployee && (
        // Backdrop - fecha o modal ao clicar fora
        <div className="modal-backdrop" onClick={handleCloseDetailsModal}>
          {/* Container do modal - maior que o de edição para acomodar mais informações */}
          <div className="modal modal-details" onClick={(e) => e.stopPropagation()}>
            
            {/* Cabeçalho do modal */}
            <div className="modal-header">
              <div>
                <h3 className="modal-title">Detalhes do Funcionário</h3>
                <p className="modal-subtitle">Informações completas e histórico</p>
              </div>
              {/* Botão X para fechar */}
              <button className="modal-close-btn" onClick={handleCloseDetailsModal}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            {/* Corpo do modal */}
            <div className="modal-body">
              {/* Seção de cabeçalho com avatar grande e informações principais */}
              <div className="details-header">
                {/* Avatar grande com iniciais */}
                <div className="details-avatar-large">{getInitials(viewingEmployee.nome)}</div>
                <div className="details-main-info">
                  <h2 className="details-name">{viewingEmployee.nome}</h2>
                  <p className="details-role">{viewingEmployee.cargo}</p>
                  {/* Badge de status */}
                  <span className={`status-badge status-${viewingEmployee.status}`}>
                    <span className="status-dot"></span>
                    {viewingEmployee.status === 'ativo' ? 'Ativo' : 'Bloqueado'}
                  </span>
                </div>
              </div>

              {/* Grid de detalhes - informações organizadas em cards */}
              <div className="details-grid">
                {/* Item: Nome Completo */}
                <div className="detail-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <div>
                    <span className="detail-label">Nome Completo</span>
                    <span className="detail-value">{viewingEmployee.nome}</span>
                  </div>
                </div>
                {/* Item: Cargo */}
                <div className="detail-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                  </svg>
                  <div>
                    <span className="detail-label">Cargo</span>
                    <span className="detail-value">{viewingEmployee.cargo}</span>
                  </div>
                </div>
                {/* Item: Área */}
                <div className="detail-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                  <div>
                    <span className="detail-label">Área</span>
                    <span className="detail-value">{viewingEmployee.area}</span>
                  </div>
                </div>
                {/* Item: Data de Cadastro */}
                <div className="detail-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <div>
                    <span className="detail-label">Data Cadastro</span>
                    <span className="detail-value">{viewingEmployee.dataCadastro}</span>
                  </div>
                </div>
                {/* Item: Nível de Acesso */}
                <div className="detail-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  <div>
                    <span className="detail-label">Nível Acesso</span>
                    <span className="detail-value">
                      <span className="badge badge-blue">{viewingEmployee.nivelAcesso}</span>
                    </span>
                  </div>
                </div>
                {/* Item: Status */}
                <div className="detail-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <div>
                    <span className="detail-label">Status</span>
                    <span className="detail-value">{viewingEmployee.status === 'ativo' ? '✓ Ativo' : '✕ Bloqueado'}</span>
                  </div>
                </div>
              </div>

              {/* Seção de histórico de alterações */}
              <div className="history-section">
                <h4 className="history-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  Histórico de Alterações
                </h4>
                {/* Timeline visual do histórico */}
                <div className="timeline">
                  {/* Mapeia cada item do histórico para um elemento visual */}
                  {viewingEmployee.historico.map((item, idx) => (
                    <div key={idx} className="timeline-item">
                      <div className="timeline-dot"></div>
                      <div className="timeline-content">
                        <p className="timeline-action">{item.acao}</p>
                        <div className="timeline-meta">
                          <span className="timeline-date">{item.data}</span>
                          <span className="timeline-divider">•</span>
                          <span className="timeline-user">por {item.usuario}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Rodapé do modal com botões */}
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={handleCloseDetailsModal}>Fechar</button>
              {/* Botão Editar - fecha o modal de detalhes e abre o de edição */}
              <button className="btn btn-primary" onClick={() => { handleCloseDetailsModal(); handleOpenModal(viewingEmployee); }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                Editar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== RODAPÉ ===== */}
      {/* Componente de rodapé */}
      <Footer />
    </div>
  );
};

// Exporta o componente para ser usado em outras partes da aplicação
export default ControleAcesso;