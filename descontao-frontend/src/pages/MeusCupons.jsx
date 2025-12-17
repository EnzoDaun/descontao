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

const MeusCupons = () => {
  const { user, isAssociado } = useAuth();
  const [cupons, setCupons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAssociado()) return;

    const loadCupons = async () => {
      try {
        const response = await api.get(`/cupons/meus/${user.identificador}`);
        setCupons(response.data);
      } catch (error) {
        console.error('Erro ao carregar cupons:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCupons();
  }, [isAssociado, user.identificador]);

  if (!isAssociado()) {
    return (
      <Container>
        <Alert severity="error">Acesso negado. Apenas associados podem ver esta página.</Alert>
      </Container>
    );
  }

  if (loading) return <Container><Typography>Carregando...</Typography></Container>;

  const getStatusChip = (cupom) => {
    if (cupom.utilizado) {
      return <Chip label="Utilizado" color="success" />;
    }
    const hoje = new Date();
    const termino = new Date(cupom.dataTermino);
    if (termino < hoje) {
      return <Chip label="Vencido" color="error" />;
    }
    return <Chip label="Ativo" color="primary" />;
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Meus Cupons
      </Typography>

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
                <Typography variant="h5" color="primary" sx={{ my: 1 }}>
                  {cupom.percentualDesconto}% OFF
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Cupom: {cupom.numero}
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                  Reservado em: {new Date(cupom.dataReserva).toLocaleDateString()}
                </Typography>
                {cupom.dataUso && (
                  <Typography variant="caption" display="block" gutterBottom>
                    Utilizado em: {new Date(cupom.dataUso).toLocaleDateString()}
                  </Typography>
                )}
                <Typography variant="caption" display="block" gutterBottom>
                  Válido até: {new Date(cupom.dataTermino).toLocaleDateString()}
                </Typography>
                {getStatusChip(cupom)}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {cupons.length === 0 && (
        <Typography variant="body1" sx={{ textAlign: 'center', mt: 4 }}>
          Você não possui cupons reservados.
        </Typography>
      )}
    </Container>
  );
};

export default MeusCupons;
