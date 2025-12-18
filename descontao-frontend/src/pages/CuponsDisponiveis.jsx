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
  Alert,
  Box,
  Chip
} from '@mui/material';
import {
  LocalOffer,
  Store,
  CalendarToday,
  Loyalty
} from '@mui/icons-material';
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
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(45deg, #2563eb 30%, #10b981 90%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2
          }}
        >
          Cupons Disponíveis
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
          Descubra ofertas exclusivas dos melhores comerciantes da sua região
        </Typography>
      </Box>

      {message && (
        <Alert
          severity={message.includes('sucesso') ? 'success' : 'error'}
          sx={{
            mb: 3,
            borderRadius: 2,
            '& .MuiAlert-message': {
              fontWeight: 500
            }
          }}
        >
          {message}
        </Alert>
      )}

      <Box sx={{ mb: 4 }}>
        <FormControl
          sx={{
            minWidth: 240,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            }
          }}
        >
          <InputLabel>Filtrar por categoria</InputLabel>
          <Select
            value={categoriaFiltro}
            onChange={(e) => handleFiltroCategoria(e.target.value)}
            label="Filtrar por categoria"
          >
            <MenuItem value="">Todas as categorias</MenuItem>
            {categorias.map((categoria) => (
              <MenuItem key={categoria.id} value={categoria.id}>
                {categoria.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {cupons.map((cupom) => (
          <Grid item xs={12} md={6} lg={4} key={cupom.numero}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 3,
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 24px -4px rgba(0, 0, 0, 0.15)',
                  borderColor: 'primary.light'
                }
              }}
            >
              <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      fontWeight: 600,
                      color: 'text.primary',
                      lineHeight: 1.3
                    }}
                  >
                    {cupom.titulo}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                    <Store sx={{ fontSize: 18, color: 'text.secondary' }} />
                    <Typography
                      color="text.secondary"
                      sx={{
                        fontWeight: 500,
                        fontSize: '0.95rem'
                      }}
                    >
                      {cupom.nomeComercio}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Chip
                    label={cupom.categoria}
                    size="small"
                    icon={<LocalOffer sx={{ fontSize: 14 }} />}
                    sx={{
                      bgcolor: 'primary.50',
                      color: 'primary.main',
                      fontWeight: 500
                    }}
                  />
                </Box>

                <Box sx={{ textAlign: 'center', my: 2 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      background: 'linear-gradient(45deg, #2563eb 30%, #10b981 90%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}
                  >
                    {cupom.percentualDesconto}% OFF
                  </Typography>
                </Box>

                <Box sx={{ mt: 'auto' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2 }}>
                    <CalendarToday sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography
                      variant="caption"
                      display="block"
                      sx={{
                        color: 'text.secondary',
                        textAlign: 'left'
                      }}
                    >
                      Válido de {new Date(cupom.dataInicio).toLocaleDateString()} até{' '}
                      {new Date(cupom.dataTermino).toLocaleDateString()}
                    </Typography>
                  </Box>

                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    onClick={() => reservarCupom(cupom.numero)}
                    startIcon={<Loyalty />}
                    sx={{
                      py: 1.5,
                      fontWeight: 600,
                      textTransform: 'none',
                      borderRadius: 2,
                      boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
                      '&:hover': {
                        transform: 'translateY(-1px)',
                        boxShadow: '0 6px 16px rgba(37, 99, 235, 0.4)'
                      }
                    }}
                  >
                    Reservar Cupom
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {cupons.length === 0 && (
        <Box sx={{ textAlign: 'center', mt: 8, mb: 4 }}>
          <LocalOffer sx={{ fontSize: '4rem', mb: 2, color: 'text.secondary' }} />
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 600,
              color: 'text.secondary'
            }}
          >
            Nenhum cupom disponível
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {categoriaFiltro
              ? 'Não há cupons disponíveis nesta categoria no momento.'
              : 'Não há cupons disponíveis no momento. Verifique novamente em breve!'
            }
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default CuponsDisponiveis;
