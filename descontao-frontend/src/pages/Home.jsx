import React from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Paper
} from '@mui/material';
import { Person, Storefront } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isAssociado, isComercio } = useAuth();

  if (isAuthenticated()) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Bem-vindo ao Descontão!
        </Typography>

        <Grid container spacing={4} sx={{ mt: 4 }}>
          {isAssociado() && (
            <>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, textAlign: 'center', height: '200px' }}>
                  <Typography variant="h5" gutterBottom>
                    Cupons Disponíveis
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Veja todos os cupons de desconto disponíveis
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => navigate('/cupons/disponiveis')}
                  >
                    Ver Cupons
                  </Button>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, textAlign: 'center', height: '200px' }}>
                  <Typography variant="h5" gutterBottom>
                    Meus Cupons
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Gerencie seus cupons reservados
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => navigate('/cupons/meus')}
                  >
                    Ver Meus Cupons
                  </Button>
                </Paper>
              </Grid>
            </>
          )}

          {isComercio() && (
            <>
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 3, textAlign: 'center', height: '200px' }}>
                  <Typography variant="h5" gutterBottom>
                    Criar Cupons
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Crie novos cupons de desconto
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => navigate('/cupons/criar')}
                  >
                    Criar Cupons
                  </Button>
                </Paper>
              </Grid>

              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 3, textAlign: 'center', height: '200px' }}>
                  <Typography variant="h5" gutterBottom>
                    Gerenciar Cupons
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Veja seus cupons criados
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => navigate('/cupons/gerenciar')}
                  >
                    Gerenciar
                  </Button>
                </Paper>
              </Grid>

              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 3, textAlign: 'center', height: '200px' }}>
                  <Typography variant="h5" gutterBottom>
                    Validar Cupons
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Valide cupons utilizados
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => navigate('/cupons/validar')}
                  >
                    Validar
                  </Button>
                </Paper>
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Box textAlign="center">
        <Typography variant="h2" component="h1" gutterBottom>
          Descontão
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom color="textSecondary">
          Sistema de Cupons de Desconto
        </Typography>
        <Typography variant="body1" paragraph sx={{ mt: 4, mb: 4 }}>
          Conectamos comerciantes e associados através de cupons de desconto exclusivos.
          Comerciantes podem criar promoções e associados podem aproveitá-las!
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={5}>
              <Paper sx={{ p: 4, textAlign: 'center', minHeight: '360px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Box>
                  <Person sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                  <Typography variant="h5" gutterBottom color="primary">
                    Sou Associado
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Encontre cupons de desconto exclusivos dos comerciantes da sua região
                  </Typography>
                </Box>
                <Box sx={{ mt: 3 }}>
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={() => navigate('/login?tipo=associado')}
                    sx={{
                      mb: 2,
                      fontSize: '0.85rem',
                      minHeight: '48px'
                    }}
                  >
                    Entrar como Associado
                  </Button>
                  <Button
                    variant="text"
                    size="medium"
                    fullWidth
                    onClick={() => navigate('/register/associado')}
                    sx={{ textTransform: 'none' }}
                  >
                    Cadastrar como Associado
                  </Button>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={5}>
              <Paper sx={{ p: 4, textAlign: 'center', minHeight: '360px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Box>
                  <Storefront sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                  <Typography variant="h5" gutterBottom color="primary">
                    Sou Comerciante
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Crie cupons de desconto e atraia mais clientes para seu negócio
                  </Typography>
                </Box>
                <Box sx={{ mt: 3 }}>
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={() => navigate('/login?tipo=comerciante')}
                    sx={{
                      mb: 2,
                      fontSize: '0.85rem',
                      minHeight: '48px'
                    }}
                  >
                    Entrar como Comerciante
                  </Button>
                  <Button
                    variant="text"
                    size="medium"
                    fullWidth
                    onClick={() => navigate('/register/comercio')}
                    sx={{ textTransform: 'none' }}
                  >
                    Cadastrar como Comerciante
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
