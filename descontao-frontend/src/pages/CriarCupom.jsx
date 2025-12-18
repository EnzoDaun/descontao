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
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

dayjs.locale('pt-br');

const CriarCupom = () => {
  const { user, isComercio } = useAuth();
  const [formData, setFormData] = useState({
    titulo: '',
    dataInicio: dayjs(),
    dataTermino: dayjs().add(30, 'days'),
    percentualDesconto: '',
    quantidade: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const cupomData = {
        titulo: formData.titulo,
        dataInicio: formData.dataInicio.format('YYYY-MM-DD'),
        dataTermino: formData.dataTermino.format('YYYY-MM-DD'),
        percentualDesconto: parseFloat(formData.percentualDesconto)
      };

      await api.post('/cupons/criar', cupomData, {
        params: {
          cnpjComercio: user.identificador,
          quantidade: parseInt(formData.quantidade)
        }
      });

      setMessage('Cupons criados com sucesso!');
      setFormData({
        titulo: '',
        dataInicio: dayjs(),
        dataTermino: dayjs().add(30, 'days'),
        percentualDesconto: '',
        quantidade: ''
      });
    } catch (error) {
      setMessage(error.response?.data?.message || 'Erro ao criar cupons');
    } finally {
      setLoading(false);
    }
  };

  if (!isComercio()) {
    return (
      <Container>
        <Alert severity="error">Acesso negado. Apenas comerciantes podem ver esta página.</Alert>
      </Container>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Criar Cupons de Desconto
          </Typography>

          {message && (
            <Alert
              severity={message.includes('sucesso') ? 'success' : 'error'}
              sx={{ mb: 2 }}
            >
              {message}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Título da Promoção"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleChange}
                  required
                  inputProps={{ maxLength: 25 }}
                  helperText={`${formData.titulo.length}/25 caracteres`}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <DatePicker
                  label="Data de Início"
                  value={formData.dataInicio}
                  onChange={(value) => setFormData({ ...formData, dataInicio: value })}
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
                <DatePicker
                  label="Data de Término"
                  value={formData.dataTermino}
                  onChange={(value) => setFormData({ ...formData, dataTermino: value })}
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
                  label="Percentual de Desconto (%)"
                  name="percentualDesconto"
                  type="number"
                  value={formData.percentualDesconto}
                  onChange={(e) => {
                    const value = Math.min(100, Math.max(0.01, parseFloat(e.target.value) || 0));
                    setFormData({ ...formData, percentualDesconto: value });
                  }}
                  inputProps={{ min: 0.01, max: 100, step: 0.01 }}
                  required
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Quantidade de Cupons"
                  name="quantidade"
                  type="number"
                  value={formData.quantidade}
                  onChange={(e) => {
                    const value = Math.min(10000, Math.max(1, parseInt(e.target.value) || 1));
                    setFormData({ ...formData, quantidade: value });
                  }}
                  inputProps={{ min: 1, max: 10000 }}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading}
                  fullWidth
                >
                  {loading ? 'Criando...' : 'Criar Cupons'}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </LocalizationProvider>
  );
};

export default CriarCupom;
