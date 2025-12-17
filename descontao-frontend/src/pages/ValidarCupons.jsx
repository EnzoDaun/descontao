import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Alert,
  Box
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

const ValidarCupons = () => {
  const { user, isComercio } = useAuth();
  const [cuponsReservados, setCuponsReservados] = useState([]);
  const [numeroCupom, setNumeroCupom] = useState('');
  const [cpfAssociado, setCpfAssociado] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!isComercio()) return;

    const loadCuponsReservados = async () => {
      try {
        const response = await api.get(`/cupons/comercio/${user.identificador}/reservados`);
        setCuponsReservados(response.data);
      } catch (error) {
        console.error('Erro ao carregar cupons:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCuponsReservados();
  }, [isComercio, user.identificador]);

  const validarCupom = async () => {
    if (!numeroCupom || !cpfAssociado) {
      setMessage('Informe o número do cupom e CPF do associado');
      return;
    }

    try {
      await api.post('/cupons/utilizar', null, {
        params: {
          numeroCupom,
          cpfAssociado: parseInt(cpfAssociado.replace(/\D/g, ''))
        }
      });
      setMessage('Cupom validado com sucesso!');
      setNumeroCupom('');
      setCpfAssociado('');

      const response = await api.get(`/cupons/comercio/${user.identificador}/reservados`);
      setCuponsReservados(response.data);

      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Erro ao validar cupom');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  if (!isComercio()) {
    return (
      <Container>
        <Alert severity="error">Acesso negado. Apenas comerciantes podem ver esta página.</Alert>
      </Container>
    );
  }

  if (loading) return <Container><Typography>Carregando...</Typography></Container>;

  const cuponsAtivos = cuponsReservados.filter(c => !c.utilizado && new Date(c.dataTermino) >= new Date());

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Validar Cupons
      </Typography>

      {message && (
        <Alert
          severity={message.includes('sucesso') ? 'success' : 'error'}
          sx={{ mb: 2 }}
        >
          {message}
        </Alert>
      )}

      <Card sx={{ mb: 4, p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Validar Cupom Manualmente
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <TextField
            label="Número do Cupom"
            value={numeroCupom}
            onChange={(e) => setNumeroCupom(e.target.value)}
            sx={{ minWidth: 200 }}
          />
          <TextField
            label="CPF do Associado"
            value={cpfAssociado}
            onChange={(e) => setCpfAssociado(e.target.value)}
            sx={{ minWidth: 200 }}
          />
          <Button
            variant="contained"
            onClick={validarCupom}
            size="large"
          >
            Validar
          </Button>
        </Box>
      </Card>

      <Typography variant="h5" gutterBottom>
        Cupons Reservados (Ativos)
      </Typography>

      <Grid container spacing={3}>
        {cuponsAtivos.map((cupom) => (
          <Grid item xs={12} md={6} lg={4} key={`${cupom.numero}-${cupom.dataReserva}`}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {cupom.titulo}
                </Typography>
                <Typography variant="h5" color="primary" sx={{ my: 1 }}>
                  {cupom.percentualDesconto}% OFF
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Cupom: {cupom.numero}
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                  Reservado em: {new Date(cupom.dataReserva).toLocaleDateString()}
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                  Válido até: {new Date(cupom.dataTermino).toLocaleDateString()}
                </Typography>
                <Button
                  variant="contained"
                  color="success"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={() => {
                    setNumeroCupom(cupom.numero);
                  }}
                >
                  Selecionar para Validação
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {cuponsAtivos.length === 0 && (
        <Typography variant="body1" sx={{ textAlign: 'center', mt: 4 }}>
          Nenhum cupom ativo reservado no momento.
        </Typography>
      )}
    </Container>
  );
};

export default ValidarCupons;
