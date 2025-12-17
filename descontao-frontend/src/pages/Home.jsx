import React from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Paper
} from '@mui/material';
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
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/login')}
            sx={{ mr: 2 }}
          >
            Entrar
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/register/associado')}
            sx={{ mr: 2 }}
          >
            Sou Associado
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/register/comercio')}
          >
            Sou Comerciante
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
