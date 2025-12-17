import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Funções de recuperação de senha
export const passwordResetAPI = {
  requestReset: (data) => api.post('/password-reset/request', data),
  validateToken: (token) => api.get('/password-reset/validate-token', { params: { token } }),
  confirmReset: (data) => api.post('/password-reset/confirm', data),
};

export default api;
