import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

const RegisterComercio = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [categorias, setCategorias] = useState([]);
  const [formData, setFormData] = useState({
    cnpj: '',
    categoriaId: '',
    razaoSocial: '',
    nomeFantasia: '',
    endereco: '',
    bairro: '',
    cep: '',
    cidade: '',
    uf: '',
    contato: '',
    email: '',
    senha: '',
    confirmaSenha: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadCategorias = async () => {
      try {
        const response = await api.get('/categorias');
        setCategorias(response.data);
      } catch (error) {
        console.error('Erro ao carregar categorias:', error);
      }
    };
    loadCategorias();
  }, []);

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
        cnpj: parseInt(formData.cnpj.replace(/\D/g, '')),
        cep: formData.cep.replace(/\D/g, '').substring(0, 8),
        contato: formData.contato.replace(/\D/g, '').substring(0, 15)
      };
      delete data.confirmaSenha;

      const response = await api.post('/auth/register/comercio', data);
      login(response.data);
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'Erro ao cadastrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Cadastro de Comércio
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
                label="CNPJ"
                name="cnpj"
                value={formData.cnpj}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Categoria</InputLabel>
                <Select
                  name="categoriaId"
                  value={formData.categoriaId}
                  onChange={handleChange}
                  label="Categoria"
                >
                  {categorias.map((categoria) => (
                    <MenuItem key={categoria.id} value={categoria.id}>
                      {categoria.nome}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Razão Social"
                name="razaoSocial"
                value={formData.razaoSocial}
                onChange={handleChange}
                required
                inputProps={{ maxLength: 50 }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nome Fantasia"
                name="nomeFantasia"
                value={formData.nomeFantasia}
                onChange={handleChange}
                inputProps={{ maxLength: 30 }}
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
                label="Contato"
                name="contato"
                value={formData.contato}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').substring(0, 15);
                  setFormData({ ...formData, contato: value });
                }}
                placeholder="11999999999"
                inputProps={{ maxLength: 15 }}
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
  );
};

export default RegisterComercio;
