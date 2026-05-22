import api from './api';

/**
 * Serviço para gerenciamento de treinamentos
 */
const treinamentoService = {
  /**
   * Lista todos os treinamentos
   * @returns {Promise<Array>}
   */
  listar: async () => {
    try {
      const response = await api.get('/treinamentos');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao listar treinamentos' };
    }
  },

  /**
   * Busca treinamento por ID
   * @param {number} id 
   * @returns {Promise<object>}
   */
  buscarPorId: async (id) => {
    try {
      const response = await api.get(`/treinamentos/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao buscar treinamento' };
    }
  },

  /**
   * Cria novo treinamento
   * @param {object} treinamentoData 
   * @returns {Promise}
   */
  criar: async (treinamentoData) => {
    try {
      const response = await api.post('/treinamentos', treinamentoData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao criar treinamento' };
    }
  },

  /**
   * Atualiza treinamento
   * @param {number} id 
   * @param {object} treinamentoData 
   * @returns {Promise}
   */
  atualizar: async (id, treinamentoData) => {
    try {
      const response = await api.put(`/treinamentos/${id}`, treinamentoData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao atualizar treinamento' };
    }
  },

  /**
   * Remove treinamento
   * @param {number} id 
   * @returns {Promise}
   */
  remover: async (id) => {
    try {
      const response = await api.delete(`/treinamentos/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao remover treinamento' };
    }
  },

  /**
   * Registra participante no treinamento
   * @param {number} treinamentoId 
   * @param {number} usuarioId 
   * @returns {Promise}
   */
  registrarParticipante: async (treinamentoId, usuarioId) => {
    try {
      const response = await api.post(`/treinamentos/${treinamentoId}/participantes/${usuarioId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao registrar participante' };
    }
  },

  /**
   * Lista treinamentos de um funcionário
   * @param {number} usuarioId 
   * @returns {Promise<Array>}
   */
  listarPorUsuario: async (usuarioId) => {
    try {
      const response = await api.get(`/treinamentos/usuario/${usuarioId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao buscar treinamentos' };
    }
  },

  /**
   * Emite certificado de treinamento
   * @param {number} treinamentoId 
   * @param {number} usuarioId 
   * @returns {Promise<Blob>} PDF do certificado
   */
  emitirCertificado: async (treinamentoId, usuarioId) => {
    try {
      const response = await api.get(
        `/treinamentos/${treinamentoId}/certificado/${usuarioId}`,
        { responseType: 'blob' }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao emitir certificado' };
    }
  }
};

export default treinamentoService;
