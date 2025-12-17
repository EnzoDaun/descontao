import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert,
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { passwordResetAPI } from '../services/api';

export default function EsqueciSenha() {
  const [formData, setFormData] = useState({
    email: '',
    userType: 'ASSOCIADO'
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await passwordResetAPI.requestReset(formData);
      setMessage({
        type: 'success',
        text: 'Email de redefinição enviado com sucesso! Verifique sua caixa de entrada.'
      });

      // Limpar o formulário
      setFormData({ email: '', userType: 'ASSOCIADO' });

    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Erro ao enviar email de redefinição'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ padding: 4, width: '100%' }}>
          <Typography component="h1" variant="h4" align="center" gutterBottom>
            Esqueci Minha Senha
          </Typography>

          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
            Digite seu email e tipo de usuário para receber um link de redefinição de senha.
          </Typography>

          {message.text && (
            <Alert severity={message.type} sx={{ mb: 2 }}>
              {message.text}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
            />

            <FormControl component="fieldset" sx={{ mt: 2, mb: 2 }}>
              <FormLabel component="legend">Tipo de Usuário</FormLabel>
              <RadioGroup
                row
                aria-label="userType"
                name="userType"
                value={formData.userType}
                onChange={handleChange}
              >
                <FormControlLabel value="ASSOCIADO" control={<Radio />} label="Associado" />
                <FormControlLabel value="COMERCIO" control={<Radio />} label="Comércio" />
              </RadioGroup>
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Enviar Email de Redefinição'}
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Button
                variant="text"
                onClick={() => navigate('/login')}
                sx={{ mt: 1 }}
              >
                Voltar para Login
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
