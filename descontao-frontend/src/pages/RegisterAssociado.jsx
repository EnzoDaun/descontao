import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Grid
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
dayjs.locale('pt-br');

const RegisterAssociado = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    cpf: '',
    nome: '',
    dataNascimento: dayjs(),
    endereco: '',
    bairro: '',
    cep: '',
    cidade: '',
    uf: '',
    celular: '',
    email: '',
    senha: '',
    confirmaSenha: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

    if (formData.senha !== formData.confirmaSenha) {
      setError('Senhas não coincidem');
      setLoading(false);
      return;
    }

    if (formData.senha.length < 6) {
      setError('Senha deve ter pelo menos 6 caracteres');
      setLoading(false);
      return;
    }

    try {
      const data = {
        ...formData,
        cpf: parseInt(formData.cpf.replace(/\D/g, '')),
        cep: formData.cep.replace(/\D/g, '').substring(0, 8), // Remove non-digits and limit to 8 chars
        celular: formData.celular.replace(/\D/g, '').substring(0, 15), // Clean celular too
        dataNascimento: formData.dataNascimento.format('YYYY-MM-DD')
      };
      delete data.confirmaSenha;

      const response = await api.post('/auth/register/associado', data);
      login(response.data);
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'Erro ao cadastrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Cadastro de Associado
          </Typography>

          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <Button
              variant="text"
              onClick={() => navigate('/')}
              size="small"
            >
              ← Voltar à página inicial
            </Button>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="CPF"
                  name="cpf"
                  value={formData.cpf}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').substring(0, 11);
                    setFormData({ ...formData, cpf: value });
                  }}
                  required
                  placeholder="12345678901"
                  inputProps={{ maxLength: 11 }}
                  helperText="Apenas números (11 dígitos)"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Nome Completo"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  inputProps={{ maxLength: 40 }}
                  helperText={`${formData.nome.length}/40 caracteres`}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <DatePicker
                  label="Data de Nascimento"
                  value={formData.dataNascimento}
                  onChange={(value) => setFormData({ ...formData, dataNascimento: value })}
                  format="DD/MM/YYYY"
                  slots={{
                    textField: TextField
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      required: true
                    }
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  inputProps={{ maxLength: 50 }}
                  helperText={`${formData.email.length}/50 caracteres`}
                />
              </Grid>

              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  label="Endereço"
                  name="endereco"
                  value={formData.endereco}
                  onChange={handleChange}
                  inputProps={{ maxLength: 40 }}
                  helperText={`${formData.endereco.length}/40 caracteres`}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Bairro"
                  name="bairro"
                  value={formData.bairro}
                  onChange={handleChange}
                  inputProps={{ maxLength: 30 }}
                  helperText={`${formData.bairro.length}/30 caracteres`}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="CEP"
                  name="cep"
                  value={formData.cep}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').substring(0, 8);
                    setFormData({ ...formData, cep: value });
                  }}
                  placeholder="12345678"
                  inputProps={{ maxLength: 8 }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Cidade"
                  name="cidade"
                  value={formData.cidade}
                  onChange={handleChange}
                  inputProps={{ maxLength: 40 }}
                  helperText={`${formData.cidade.length}/40 caracteres`}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="UF"
                  name="uf"
                  value={formData.uf}
                  onChange={(e) => {
                    const value = e.target.value.toUpperCase().substring(0, 2);
                    setFormData({ ...formData, uf: value });
                  }}
                  placeholder="SP"
                  inputProps={{ maxLength: 2 }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Celular"
                  name="celular"
                  value={formData.celular}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').substring(0, 15);
                    setFormData({ ...formData, celular: value });
                  }}
                  placeholder="11999999999"
                  inputProps={{ maxLength: 15 }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Senha"
                  name="senha"
                  type="password"
                  value={formData.senha}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Confirmar Senha"
                  name="confirmaSenha"
                  type="password"
                  value={formData.confirmaSenha}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                >
                  {loading ? 'Cadastrando...' : 'Cadastrar'}
                </Button>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Button onClick={() => navigate('/login')}>
              Já tem conta? Faça login
            </Button>
          </Box>
        </Paper>
      </Container>
    </LocalizationProvider>
  );
};

export default RegisterAssociado;
