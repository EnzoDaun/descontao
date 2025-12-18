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
import { Loyalty as LoyaltyIcon } from '@mui/icons-material';
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
    <Box
      sx={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        py: 4
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <LoyaltyIcon
            sx={{
              fontSize: 48,
              color: 'primary.main',
              mb: 2
            }}
          />
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(45deg, #2563eb 30%, #10b981 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1
            }}
          >
            Entrar
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {tipoUsuario === 'associado'
              ? 'Acesse sua conta de associado'
              : tipoUsuario === 'comerciante'
                ? 'Acesse sua conta de comerciante'
                : 'Acesse sua conta'
            }
          </Typography>
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.15)',
            }
          }}
        >
          {!tipoUsuario && (
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  textAlign: 'center',
                  fontWeight: 600,
                  color: 'text.primary',
                  mb: 3
                }}
              >
                Selecione o tipo de conta
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="outlined"
                  fullWidth
                  size="large"
                  onClick={() => setTipoUsuario('associado')}
                  sx={{
                    py: 2,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 500,
                    border: '2px solid',
                    borderColor: 'primary.main',
                    '&:hover': {
                      borderColor: 'primary.dark',
                      bgcolor: 'primary.50',
                    }
                  }}
                >
                  Associado
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  size="large"
                  onClick={() => setTipoUsuario('comerciante')}
                  sx={{
                    py: 2,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 500,
                    border: '2px solid',
                    borderColor: 'secondary.main',
                    color: 'secondary.main',
                    '&:hover': {
                      borderColor: 'secondary.dark',
                      bgcolor: 'secondary.50',
                    }
                  }}
                >
                  Comerciante
                </Button>
              </Box>
            </Box>
          )}

          {tipoUsuario && (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Button
                  onClick={() => setTipoUsuario('')}
                  sx={{
                    mr: 2,
                    minWidth: 'auto',
                    p: 1,
                    borderRadius: '50%',
                    '&:hover': {
                      bgcolor: 'action.hover'
                    }
                  }}
                >
                  ←
                </Button>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {tipoUsuario === 'associado' ? 'Login - Associado' : 'Login - Comerciante'}
                </Typography>
              </Box>

              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                {error && (
                  <Alert
                    severity="error"
                    sx={{
                      mb: 3,
                      borderRadius: 2,
                      '& .MuiAlert-message': {
                        fontWeight: 500
                      }
                    }}
                  >
                    {error}
                  </Alert>
                )}

                <TextField
                  fullWidth
                  name="documento"
                  label={tipoUsuario === 'associado' ? 'CPF' : 'CNPJ'}
                  value={formData.documento}
                  onChange={(e) => {
                    const maxLength = tipoUsuario === 'associado' ? 11 : 14;
                    const value = e.target.value.replace(/\D/g, '').substring(0, maxLength);
                    setFormData({ ...formData, documento: value });
                  }}
                  required
                  sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover fieldset': {
                        borderColor: 'primary.main',
                      },
                    }
                  }}
                  placeholder={tipoUsuario === 'associado' ? '000.000.000-00' : '00.000.000/0000-00'}
                  helperText={
                    tipoUsuario === 'associado' ? 'Digite apenas os números do CPF (11 dígitos)' :
                    'Digite apenas os números do CNPJ (14 dígitos)'
                  }
                />

                <TextField
                  fullWidth
                  name="senha"
                  type="password"
                  label="Senha"
                  value={formData.senha}
                  onChange={handleChange}
                  required
                  sx={{
                    mb: 4,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover fieldset': {
                        borderColor: 'primary.main',
                      },
                    }
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    borderRadius: 2,
                    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
                    mb: 3,
                    '&:hover': {
                      transform: 'translateY(-1px)',
                      boxShadow: '0 6px 16px rgba(37, 99, 235, 0.4)'
                    },
                    '&:disabled': {
                      transform: 'none',
                      boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)'
                    }
                  }}
                >
                  {loading ? 'Entrando...' : 'Entrar'}
                </Button>

                <Box sx={{ textAlign: 'center' }}>
                  <Button
                    variant="text"
                    onClick={() => navigate('/esqueci-senha')}
                    sx={{
                      textTransform: 'none',
                      color: 'text.secondary',
                      '&:hover': {
                        color: 'primary.main'
                      }
                    }}
                  >
                    Esqueci minha senha
                  </Button>
                </Box>
              </Box>
            </>
          )}

          <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid', borderColor: 'divider', textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Não tem uma conta?
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button
                variant="text"
                onClick={() => navigate('/register/associado')}
                sx={{
                  textTransform: 'none',
                  fontWeight: 500,
                  '&:hover': {
                    bgcolor: 'rgba(37, 99, 235, 0.05)'
                  }
                }}
              >
                Cadastrar como Associado
              </Button>
              <Button
                variant="text"
                onClick={() => navigate('/register/comercio')}
                sx={{
                  textTransform: 'none',
                  fontWeight: 500,
                  color: 'secondary.main',
                  '&:hover': {
                    bgcolor: 'rgba(16, 185, 129, 0.05)'
                  }
                }}
              >
                Cadastrar como Comerciante
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
