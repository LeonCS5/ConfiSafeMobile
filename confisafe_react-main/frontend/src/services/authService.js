import api from './api';

/**
 * Serviço de autenticação
 */
const authService = {
  /**
   * Login de usuário
   * @param {string} email 
   * @param {string} senha 
   * @returns {Promise} Retorna token JWT e dados do usuário
   */
  login: async (email, senha) => {
    try {
      const response = await api.post('/auth/login', { email, senha });
      
      // Salva token e dados do usuário
      if (response.data.token) {
        sessionStorage.setItem('confisafe_token', response.data.token);
        sessionStorage.setItem('confisafe_logged_email', email);
        
        if (response.data.usuario) {
          sessionStorage.setItem('confisafe_user_data', JSON.stringify(response.data.usuario));
        }
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao fazer login' };
    }
  },

  /**
   * Logout do usuário
   */
  logout: () => {
    sessionStorage.clear();
    window.location.href = '/login';
  },

  /**
   * Verifica se usuário está autenticado
   * @returns {boolean}
   */
  isAuthenticated: () => {
    return !!sessionStorage.getItem('confisafe_token');
  },

  /**
   * Obtém dados do usuário logado
   * @returns {object|null}
   */
  getCurrentUser: () => {
    const userData = sessionStorage.getItem('confisafe_user_data');
    return userData ? JSON.parse(userData) : null;
  },

  /**
   * Valida token atual
   * @returns {Promise<boolean>}
   */
  validateToken: async () => {
    try {
      await api.get('/auth/validate');
      return true;
    } catch (error) {
      return false;
    }
  }
};

export default authService;
