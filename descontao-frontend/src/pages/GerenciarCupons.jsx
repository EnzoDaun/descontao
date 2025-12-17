import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Alert
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

const GerenciarCupons = () => {
  const { user, isComercio } = useAuth();
  const [cupons, setCupons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isComercio()) return;

    const loadCupons = async () => {
      try {
        const response = await api.get(`/cupons/comercio/${user.identificador}`);
        setCupons(response.data);
      } catch (error) {
        console.error('Erro ao carregar cupons:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCupons();
  }, [isComercio, user.identificador]);

  if (!isComercio()) {
    return (
      <Container>
        <Alert severity="error">Acesso negado. Apenas comerciantes podem ver esta página.</Alert>
      </Container>
    );
  }

  if (loading) return <Container><Typography>Carregando...</Typography></Container>;

  const getStatusChip = (cupom) => {
    const hoje = new Date();
    const inicio = new Date(cupom.dataInicio);
    const termino = new Date(cupom.dataTermino);

    if (hoje < inicio) {
      return <Chip label="Aguardando" color="warning" />;
    }
    if (hoje > termino) {
      return <Chip label="Vencido" color="error" />;
    }
    if (cupom.reservado) {
      return <Chip label="Reservado" color="info" />;
    }
    return <Chip label="Disponível" color="success" />;
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Gerenciar Cupons
      </Typography>

      <Grid container spacing={3}>
        {cupons.map((cupom) => (
          <Grid item xs={12} md={6} lg={4} key={cupom.numero}>
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
                  Criado em: {new Date(cupom.dataEmissao).toLocaleDateString()}
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                  Válido de {new Date(cupom.dataInicio).toLocaleDateString()} até{' '}
                  {new Date(cupom.dataTermino).toLocaleDateString()}
                </Typography>
                {getStatusChip(cupom)}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {cupons.length === 0 && (
        <Typography variant="body1" sx={{ textAlign: 'center', mt: 4 }}>
          Você ainda não criou nenhum cupom.
        </Typography>
      )}
    </Container>
  );
};

export default GerenciarCupons;
