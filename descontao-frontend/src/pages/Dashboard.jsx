import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip
} from '@mui/material';
import {
  LocalOffer,
  Store,
  CardGiftcard,
  CheckCircle,
  Add,
  Settings,
  AccountBalanceWallet
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import FeatureCard from '../components/FeatureCard';
import api from '../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isAssociado } = useAuth();
  const [stats, setStats] = useState({
    totalCupons: 0,
    cuponsAtivos: 0,
    cuponsUsados: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    const loadStats = async () => {
      try {
        setLoading(true);

        if (isAssociado()) {
          const response = await api.get(`/cupons/meus/${user.identificador}`);
          const meusCupons = response.data;

          const cuponsAtivos = meusCupons.filter(cupom => !cupom.utilizado).length;
          const cuponsUsados = meusCupons.filter(cupom => cupom.utilizado).length;

          setStats({
            totalCupons: meusCupons.length,
            cuponsAtivos: cuponsAtivos,
            cuponsUsados: cuponsUsados
          });
        } else {
          const [cuponsComercioRes, cuponsReservadosRes] = await Promise.all([
            api.get(`/cupons/comercio/${user.identificador}`),
            api.get(`/cupons/comercio/${user.identificador}/reservados`)
          ]);

          const cuponsComercio = cuponsComercioRes.data;
          const cuponsReservados = cuponsReservadosRes.data;

          const cuponsAtivos = cuponsComercio.length - cuponsReservados.length;
          const cuponsUsados = cuponsReservados.filter(cupom => cupom.utilizado).length;

          setStats({
            totalCupons: cuponsComercio.length,
            cuponsAtivos: cuponsAtivos,
            cuponsUsados: cuponsUsados
          });
        }
      } catch (error) {
        console.error('Erro ao carregar estatísticas:', error);
        setStats({
          totalCupons: 0,
          cuponsAtivos: 0,
          cuponsUsados: 0
        });
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, [isAuthenticated, isAssociado, navigate, user]);

  if (!isAuthenticated()) {
    return null;
  }

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          Carregando estatísticas...
        </Typography>
      </Container>
    );
  }

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  const StatCard = ({ title, value, icon, color = '#2563eb' }) => (
    <Card
      sx={{
        height: '100%',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 600, color }}>
              {value}
            </Typography>
          </Box>
          <Avatar sx={{ bgcolor: color, width: 56, height: 56 }}>
            {icon}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 6 }}>
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(45deg, #2563eb 30%, #10b981 90%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          {getGreeting()}, {user?.nome}!
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
          {isAssociado()
            ? 'Acompanhe suas economias e descubra novas ofertas'
            : 'Gerencie seus cupons e acompanhe seu desempenho'
          }
        </Typography>
        <Chip
          label={isAssociado() ? 'Associado' : 'Comerciante'}
          color={isAssociado() ? 'primary' : 'secondary'}
          sx={{
            fontWeight: 500,
            color: 'white'
          }}
        />
      </Box>

      <Grid container spacing={3} sx={{ mb: 6 }}>
        {isAssociado() ? (
          <>
            <Grid item xs={12} sm={6} md={4}>
              <StatCard
                title="Total de Cupons"
                value={stats.totalCupons}
                icon={<LocalOffer />}
                color="#2563eb"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StatCard
                title="Cupons Ativos"
                value={stats.cuponsAtivos}
                icon={<CardGiftcard />}
                color="#10b981"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StatCard
                title="Cupons Usados"
                value={stats.cuponsUsados}
                icon={<CheckCircle />}
                color="#6366f1"
              />
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={12} sm={6} md={4}>
              <StatCard
                title="Cupons Criados"
                value={stats.totalCupons}
                icon={<LocalOffer />}
                color="#2563eb"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StatCard
                title="Cupons Ativos"
                value={stats.cuponsAtivos}
                icon={<Store />}
                color="#10b981"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StatCard
                title="Cupons Utilizados"
                value={stats.cuponsUsados}
                icon={<CheckCircle />}
                color="#6366f1"
              />
            </Grid>
          </>
        )}
      </Grid>

      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          Ações Rápidas
        </Typography>
        <Grid container spacing={4}>
          {isAssociado() ? (
            <>
              <Grid item xs={12} md={6}>
                <FeatureCard
                  icon={<LocalOffer sx={{ fontSize: 30, color: 'white' }} />}
                  title="Explorar Cupons"
                  description="Descubra novas ofertas e promoções exclusivas"
                  buttonText="Ver Cupons"
                  onClick={() => navigate('/cupons/disponiveis')}
                  color="primary"
                  height="260px"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FeatureCard
                  icon={<AccountBalanceWallet sx={{ fontSize: 30, color: 'white' }} />}
                  title="Meus Cupons"
                  description="Gerencie e utilize seus cupons reservados"
                  buttonText="Meus Cupons"
                  onClick={() => navigate('/cupons/meus')}
                  color="secondary"
                  height="260px"
                />
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12} md={4}>
                <FeatureCard
                  icon={<Add sx={{ fontSize: 30, color: 'white' }} />}
                  title="Criar Cupom"
                  description="Crie novas promoções para seus clientes"
                  buttonText="Criar Cupom"
                  onClick={() => navigate('/cupons/criar')}
                  color="primary"
                  height="275px"
                  padding="22px"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FeatureCard
                  icon={<Settings sx={{ fontSize: 30, color: 'white' }} />}
                  title="Gerenciar Cupons"
                  description="Acompanhe e gerencie suas promoções ativas"
                  buttonText="Gerenciar"
                  onClick={() => navigate('/cupons/gerenciar')}
                  color="secondary"
                  height="275px"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FeatureCard
                  icon={<CheckCircle sx={{ fontSize: 30, color: 'white' }} />}
                  title="Validar Cupons"
                  description="Confirme cupons utilizados por clientes"
                  buttonText="Validar"
                  onClick={() => navigate('/cupons/validar')}
                  color="tertiary"
                  height="275px"
                />
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;
