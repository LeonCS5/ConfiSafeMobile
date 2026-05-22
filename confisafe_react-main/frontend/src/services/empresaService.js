import api from './api';

/**
 * Serviço para gerenciamento de empresas
 */
const empresaService = {
  /**
   * Cadastra nova empresa
   * @param {object} empresaData - Dados da empresa
   * @returns {Promise}
   */
  cadastrar: async (empresaData) => {
    try {
      const response = await api.post('/empresas', empresaData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao cadastrar empresa' };
    }
  },

  /**
   * Lista todas as empresas
   * @returns {Promise<Array>}
   */
  listar: async () => {
    try {
      const response = await api.get('/empresas');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao listar empresas' };
    }
  },

  /**
   * Busca empresa por ID
   * @param {number} id 
   * @returns {Promise<object>}
   */
  buscarPorId: async (id) => {
    try {
      const response = await api.get(`/empresas/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao buscar empresa' };
    }
  },

  /**
   * Busca empresa por CNPJ
   * @param {string} cnpj 
   * @returns {Promise<object>}
   */
  buscarPorCnpj: async (cnpj) => {
    try {
      const response = await api.get(`/empresas/cnpj/${cnpj}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao buscar empresa' };
    }
  },

  /**
   * Atualiza dados da empresa
   * @param {number} id 
   * @param {object} empresaData 
   * @returns {Promise}
   */
  atualizar: async (id, empresaData) => {
    try {
      const response = await api.put(`/empresas/${id}`, empresaData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao atualizar empresa' };
    }
  },

  /**
   * Remove empresa
   * @param {number} id 
   * @returns {Promise}
   */
  remover: async (id) => {
    try {
      const response = await api.delete(`/empresas/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao remover empresa' };
    }
  }
};

export default empresaService;
