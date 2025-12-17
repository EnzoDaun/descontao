import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

const CuponsDisponiveis = () => {
  const { user, isAssociado } = useAuth();
  const [cupons, setCupons] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaFiltro, setCategoriaFiltro] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!isAssociado()) return;

    const loadData = async () => {
      try {
        const [cuponsRes, categoriasRes] = await Promise.all([
          api.get('/cupons/disponiveis'),
          api.get('/categorias')
        ]);
        setCupons(cuponsRes.data);
        setCategorias(categoriasRes.data);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [isAssociado]);

  const handleFiltroCategoria = async (categoriaId) => {
    setCategoriaFiltro(categoriaId);
    try {
      const url = categoriaId
        ? `/cupons/disponiveis/categoria/${categoriaId}`
        : '/cupons/disponiveis';
      const response = await api.get(url);
      setCupons(response.data);
    } catch (error) {
      console.error('Erro ao filtrar cupons:', error);
    }
  };

  const reservarCupom = async (numeroCupom) => {
    try {
      await api.post('/cupons/reservar', null, {
        params: {
          numeroCupom,
          cpfAssociado: user.identificador
        }
      });
      setMessage('Cupom reservado com sucesso!');
      // Remove o cupom da lista
      setCupons(cupons.filter(c => c.numero !== numeroCupom));
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Erro ao reservar cupom');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  if (!isAssociado()) {
    return (
      <Container>
        <Alert severity="error">Acesso negado. Apenas associados podem ver esta página.</Alert>
      </Container>
    );
  }

  if (loading) return <Container><Typography>Carregando...</Typography></Container>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Cupons Disponíveis
      </Typography>

      {message && (
        <Alert severity={message.includes('sucesso') ? 'success' : 'error'} sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}

      <FormControl sx={{ minWidth: 200, mb: 3 }}>
        <InputLabel>Filtrar por categoria</InputLabel>
        <Select
          value={categoriaFiltro}
          onChange={(e) => handleFiltroCategoria(e.target.value)}
        >
          <MenuItem value="">Todas as categorias</MenuItem>
          {categorias.map((categoria) => (
            <MenuItem key={categoria.id} value={categoria.id}>
              {categoria.nome}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Grid container spacing={3}>
        {cupons.map((cupom) => (
          <Grid item xs={12} md={6} lg={4} key={cupom.numero}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {cupom.titulo}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {cupom.nomeComercio}
                </Typography>
                <Typography variant="body2" component="p">
                  Categoria: {cupom.categoria}
                </Typography>
                <Typography variant="h5" color="primary" sx={{ my: 1 }}>
                  {cupom.percentualDesconto}% OFF
                </Typography>
                <Typography variant="caption" display="block">
                  Válido de {new Date(cupom.dataInicio).toLocaleDateString()} até{' '}
                  {new Date(cupom.dataTermino).toLocaleDateString()}
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={() => reservarCupom(cupom.numero)}
                >
                  Reservar Cupom
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {cupons.length === 0 && (
        <Typography variant="body1" sx={{ textAlign: 'center', mt: 4 }}>
          Nenhum cupom disponível no momento.
        </Typography>
      )}
    </Container>
  );
};

export default CuponsDisponiveis;
