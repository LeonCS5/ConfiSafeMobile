import api from './api';

/**
 * Serviço para gerenciamento de EPIs
 */
const epiService = {
  /**
   * Lista todos os EPIs
   * @returns {Promise<Array>}
   */
  listar: async () => {
    try {
      const response = await api.get('/epis');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao listar EPIs' };
    }
  },

  /**
   * Busca EPI por ID
   * @param {number} id 
   * @returns {Promise<object>}
   */
  buscarPorId: async (id) => {
    try {
      const response = await api.get(`/epis/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao buscar EPI' };
    }
  },

  /**
   * Cria novo EPI
   * @param {object} epiData 
   * @returns {Promise}
   */
  criar: async (epiData) => {
    try {
      const response = await api.post('/epis', epiData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao criar EPI' };
    }
  },

  /**
   * Atualiza EPI
   * @param {number} id 
   * @param {object} epiData 
   * @returns {Promise}
   */
  atualizar: async (id, epiData) => {
    try {
      const response = await api.put(`/epis/${id}`, epiData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao atualizar EPI' };
    }
  },

  /**
   * Remove EPI
   * @param {number} id 
   * @returns {Promise}
   */
  remover: async (id) => {
    try {
      const response = await api.delete(`/epis/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao remover EPI' };
    }
  },

  /**
   * Lista EPIs por status
   * @param {string} status - 'ATIVO', 'MANUTENCAO', 'INATIVO'
   * @returns {Promise<Array>}
   */
  buscarPorStatus: async (status) => {
    try {
      const response = await api.get(`/epis/status/${status}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao buscar EPIs' };
    }
  },

  /**
   * Obtém estatísticas dos EPIs
   * @returns {Promise<object>}
   */
  obterEstatisticas: async () => {
    try {
      const response = await api.get('/epis/estatisticas');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao obter estatísticas' };
    }
  },

  /**
   * Registra manutenção de EPI
   * @param {number} id 
   * @param {object} manutencaoData 
   * @returns {Promise}
   */
  registrarManutencao: async (id, manutencaoData) => {
    try {
      const response = await api.post(`/epis/${id}/manutencao`, manutencaoData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao registrar manutenção' };
    }
  }
};

export default epiService;
