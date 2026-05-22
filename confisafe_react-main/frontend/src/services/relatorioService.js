import api from './api';

/**
 * Serviço para geração de relatórios
 */
const relatorioService = {
  /**
   * Gera relatório de acessos
   * @param {object} filtros - { dataInicio, dataFim, usuarioId }
   * @returns {Promise<object>}
   */
  relatorioAcessos: async (filtros = {}) => {
    try {
      const response = await api.get('/relatorios/acessos', { params: filtros });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao gerar relatório' };
    }
  },

  /**
   * Gera relatório de EPIs
   * @param {object} filtros 
   * @returns {Promise<object>}
   */
  relatorioEpis: async (filtros = {}) => {
    try {
      const response = await api.get('/relatorios/epis', { params: filtros });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao gerar relatório' };
    }
  },

  /**
   * Gera relatório de treinamentos
   * @param {object} filtros 
   * @returns {Promise<object>}
   */
  relatorioTreinamentos: async (filtros = {}) => {
    try {
      const response = await api.get('/relatorios/treinamentos', { params: filtros });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao gerar relatório' };
    }
  },

  /**
   * Gera relatório geral (dashboard)
   * @returns {Promise<object>}
   */
  relatorioDashboard: async () => {
    try {
      const response = await api.get('/relatorios/dashboard');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao gerar relatório' };
    }
  },

  /**
   * Exporta relatório em PDF
   * @param {string} tipo - 'acessos', 'epis', 'treinamentos'
   * @param {object} filtros 
   * @returns {Promise<Blob>}
   */
  exportarPDF: async (tipo, filtros = {}) => {
    try {
      const response = await api.get(`/relatorios/${tipo}/pdf`, {
        params: filtros,
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao exportar PDF' };
    }
  },

  /**
   * Exporta relatório em Excel
   * @param {string} tipo 
   * @param {object} filtros 
   * @returns {Promise<Blob>}
   */
  exportarExcel: async (tipo, filtros = {}) => {
    try {
      const response = await api.get(`/relatorios/${tipo}/excel`, {
        params: filtros,
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao exportar Excel' };
    }
  }
};

export default relatorioService;
