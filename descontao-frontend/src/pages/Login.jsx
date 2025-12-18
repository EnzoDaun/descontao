import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [formData, setFormData] = useState({
    documento: '', // CPF para associado ou CNPJ para comerciante
    senha: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tipo = searchParams.get('tipo');
    if (tipo === 'associado' || tipo === 'comerciante') {
      setTipoUsuario(tipo);
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = {
        documento: formData.documento.replace(/\D/g, ''), // Remove formatação
        senha: formData.senha
      };

      const response = await api.post('/auth/login', data);
      login(response.data);
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'Documento ou senha inválidos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4, minHeight: '360px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            {tipoUsuario === 'associado' && 'Login - Associado'}
            {tipoUsuario === 'comerciante' && 'Login - Comerciante'}
            {!tipoUsuario && 'Login'}
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label={
                tipoUsuario === 'associado' ? 'CPF' :
                tipoUsuario === 'comerciante' ? 'CNPJ' :
                'CPF ou CNPJ'
              }
              name="documento"
              value={formData.documento}
              onChange={(e) => {
                const maxLength = tipoUsuario === 'associado' ? 11 : tipoUsuario === 'comerciante' ? 14 : 14;
                const value = e.target.value.replace(/\D/g, '').substring(0, maxLength);
                setFormData({ ...formData, documento: value });
              }}
              margin="normal"
              required
              helperText={
                tipoUsuario === 'associado' ? 'Digite apenas os números do CPF (11 dígitos)' :
                tipoUsuario === 'comerciante' ? 'Digite apenas os números do CNPJ (14 dígitos)' :
                'Digite apenas números'
              }
            />

            <TextField
              fullWidth
              label="Senha"
              name="senha"
              type="password"
              value={formData.senha}
              onChange={handleChange}
              margin="normal"
              required
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                fontSize: '0.85rem',
                minHeight: '48px'
              }}
              disabled={loading}
            >
              {loading ? 'Entrando...' :
                tipoUsuario === 'associado' ? 'Entrar como Associado' :
                tipoUsuario === 'comerciante' ? 'Entrar como Comerciante' :
                'Entrar'
              }
            </Button>
          </Box>
        </Box>

          <Box sx={{ textAlign: 'center' }}>
            {tipoUsuario && (
              <Button
                variant="text"
                onClick={() => navigate('/')}
                sx={{ mb: 2 }}
              >
                ← Voltar à página inicial
              </Button>
            )}

            <Typography variant="body2" sx={{ mb: 1 }}>
              <Button
                variant="text"
                size="small"
                onClick={() => navigate('/esqueci-senha')}
                sx={{ textTransform: 'none', p: 0, minWidth: 'auto' }}
              >
                Esqueci minha senha
              </Button>
            </Typography>

            <Typography variant="body2">
              {tipoUsuario === 'associado' && (
                <>
                  Não tem conta?{' '}
                  <Button
                    variant="text"
                    size="small"
                    onClick={() => navigate('/register/associado')}
                    sx={{ textTransform: 'none', p: 0, minWidth: 'auto' }}
                  >
                    Cadastre-se como Associado
                  </Button>
                </>
              )}
              {tipoUsuario === 'comerciante' && (
                <>
                  Não tem conta?{' '}
                  <Button
                    variant="text"
                    size="small"
                    onClick={() => navigate('/register/comercio')}
                    sx={{ textTransform: 'none', p: 0, minWidth: 'auto' }}
                  >
                    Cadastre-se como Comerciante
                  </Button>
                </>
              )}
              {!tipoUsuario && (
                <>
                  Não tem conta?{' '}
                  <Button
                    variant="text"
                    size="small"
                    onClick={() => navigate('/register/associado')}
                    sx={{ textTransform: 'none', p: 0, minWidth: 'auto' }}
                  >
                    Cadastre-se como Associado
                  </Button>
                  {' ou '}
                  <Button
                    variant="text"
                    size="small"
                    onClick={() => navigate('/register/comercio')}
                    sx={{ textTransform: 'none', p: 0, minWidth: 'auto' }}
                  >
                    Cadastre-se como Comerciante
                  </Button>
                </>
              )}
            </Typography>
          </Box>
      </Paper>
    </Container>
  );
};

export default Login;
