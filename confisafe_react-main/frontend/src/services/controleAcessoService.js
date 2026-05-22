import api from './api';

/**
 * Serviço para controle de acesso a espaços confinados
 */
const controleAcessoService = {
  /**
   * Registra entrada em espaço confinado
   * @param {object} acessoData 
   * @returns {Promise}
   */
  registrarEntrada: async (acessoData) => {
    try {
      const response = await api.post('/controle-acesso/entrada', acessoData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao registrar entrada' };
    }
  },

  /**
   * Registra saída de espaço confinado
   * @param {number} acessoId 
   * @returns {Promise}
   */
  registrarSaida: async (acessoId) => {
    try {
      const response = await api.post(`/controle-acesso/${acessoId}/saida`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao registrar saída' };
    }
  },

  /**
   * Lista acessos ativos (pessoas dentro do espaço)
   * @returns {Promise<Array>}
   */
  listarAcessosAtivos: async () => {
    try {
      const response = await api.get('/controle-acesso/ativos');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao listar acessos ativos' };
    }
  },

  /**
   * Lista histórico de acessos
   * @param {object} filtros 
   * @returns {Promise<Array>}
   */
  listarHistorico: async (filtros = {}) => {
    try {
      const response = await api.get('/controle-acesso/historico', { params: filtros });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao listar histórico' };
    }
  },

  /**
   * Busca acesso por ID
   * @param {number} id 
   * @returns {Promise<object>}
   */
  buscarPorId: async (id) => {
    try {
      const response = await api.get(`/controle-acesso/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao buscar acesso' };
    }
  },

  /**
   * Verifica se funcionário pode acessar espaço confinado
   * @param {number} usuarioId 
   * @returns {Promise<object>} { permitido: boolean, motivos: [] }
   */
  verificarPermissao: async (usuarioId) => {
    try {
      const response = await api.get(`/controle-acesso/verificar/${usuarioId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao verificar permissão' };
    }
  },

  /**
   * Registra emergência
   * @param {number} acessoId 
   * @param {object} emergenciaData 
   * @returns {Promise}
   */
  registrarEmergencia: async (acessoId, emergenciaData) => {
    try {
      const response = await api.post(`/controle-acesso/${acessoId}/emergencia`, emergenciaData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao registrar emergência' };
    }
  }
};

export default controleAcessoService;
