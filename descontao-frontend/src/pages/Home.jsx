import React from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Paper
} from '@mui/material';
import {
  Person,
  Storefront,
  LocalOffer,
  AccountBalanceWallet,
  Add,
  Settings,
  CheckCircle
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isAssociado, isComercio } = useAuth();

  if (isAuthenticated()) {
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
            Bem-vindo ao Descontão!
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Aproveite os melhores cupons de desconto da sua região
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ mt: 2 }}>
          {isAssociado() && (
            <>
              <Grid item xs={12} md={6}>
                <Paper
                  sx={{
                    p: 4,
                    textAlign: 'center',
                    height: '260px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: '1px solid',
                    borderColor: 'divider',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 24px -4px rgba(37, 99, 235, 0.15)',
                      borderColor: 'primary.light'
                    }
                  }}
                  onClick={() => navigate('/cupons/disponiveis')}
                >
                  <Box>
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 2,
                        boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
                      }}
                    >
                      <LocalOffer sx={{ fontSize: 30, color: 'white' }} />
                    </Box>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                      Cupons Disponíveis
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                      Descubra ofertas exclusivas dos comerciantes da sua região
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    sx={{
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 500,
                      px: 3
                    }}
                  >
                    Explorar Cupons
                  </Button>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper
                  sx={{
                    p: 4,
                    textAlign: 'center',
                    height: '260px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: '1px solid',
                    borderColor: 'divider',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 24px -4px rgba(16, 185, 129, 0.15)',
                      borderColor: 'secondary.light'
                    }
                  }}
                  onClick={() => navigate('/cupons/meus')}
                >
                  <Box>
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        bgcolor: 'secondary.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 2,
                        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                      }}
                    >
                      <AccountBalanceWallet sx={{ fontSize: 30, color: 'white' }} />
                    </Box>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'secondary.main' }}>
                      Meus Cupons
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                      Gerencie e utilize seus cupons reservados
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 500,
                      px: 3,
                      color: 'white'
                    }}
                  >
                    Meus Cupons
                  </Button>
                </Paper>
              </Grid>
            </>
          )}

          {isComercio() && (
            <>
              <Grid item xs={12} md={6}>
                <Paper
                  sx={{
                    p: 4,
                    textAlign: 'center',
                    height: '275px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: '1px solid',
                    borderColor: 'divider',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 24px -4px rgba(37, 99, 235, 0.15)',
                      borderColor: 'primary.light'
                    }
                  }}
                  onClick={() => navigate('/cupons/criar')}
                >
                  <Box>
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 2,
                        boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
                      }}
                    >
                      <Add sx={{ fontSize: 30, color: 'white' }} />
                    </Box>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                      Criar Cupons
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                      Crie ofertas exclusivas para seus clientes
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    sx={{
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 500,
                      px: 3
                    }}
                  >
                    Criar Cupons
                  </Button>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper
                  sx={{
                    p: 4,
                    textAlign: 'center',
                    height: '275px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: '1px solid',
                    borderColor: 'divider',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 24px -4px rgba(16, 185, 129, 0.15)',
                      borderColor: 'secondary.light'
                    }
                  }}
                  onClick={() => navigate('/cupons/gerenciar')}
                >
                  <Box>
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        bgcolor: 'secondary.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 2,
                        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                      }}
                    >
                      <Settings sx={{ fontSize: 30, color: 'white' }} />
                    </Box>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'secondary.main' }}>
                      Gerenciar Cupons
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                      Acompanhe suas promoções ativas
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 500,
                      px: 3,
                      color: 'white'
                    }}
                  >
                    Gerenciar
                  </Button>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper
                  sx={{
                    p: 4,
                    textAlign: 'center',
                    height: '275px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: '1px solid',
                    borderColor: 'divider',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 24px -4px rgba(99, 102, 241, 0.15)',
                      borderColor: '#6366f1'
                    }
                  }}
                  onClick={() => navigate('/cupons/validar')}
                >
                  <Box>
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        bgcolor: '#6366f1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 2,
                        boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
                      }}
                    >
                      <CheckCircle sx={{ fontSize: 30, color: 'white' }} />
                    </Box>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: '#6366f1' }}>
                      Validar Cupons
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                      Confirme cupons utilizados por clientes
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: '#6366f1',
                      '&:hover': { bgcolor: '#5b51f5' },
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 500,
                      px: 3,
                      color: 'white'
                    }}
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
    <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
      <Box textAlign="center" sx={{ mb: 8 }}>
        <Typography
          variant="h2"
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
          Descontão
        </Typography>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          color="text.secondary"
          sx={{ fontWeight: 500, mb: 3 }}
        >
          Sistema de Cupons de Desconto
        </Typography>
        <Typography
          variant="h6"
          paragraph
          sx={{
            mt: 4,
            mb: 4,
            maxWidth: 700,
            mx: 'auto',
            color: 'text.secondary',
            lineHeight: 1.6
          }}
        >
          Conectamos comerciantes e associados através de cupons de desconto exclusivos.
          Comerciantes podem criar promoções incríveis e associados aproveitam as melhores ofertas da região!
        </Typography>

        {/* Seção de estatísticas ou benefícios */}
        <Box sx={{ mt: 6, mb: 6 }}>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" sx={{ color: 'primary.main', fontWeight: 700, mb: 1 }}>
                  🎯
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Ofertas Exclusivas
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Descontos únicos dos melhores comerciantes
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" sx={{ color: 'secondary.main', fontWeight: 700, mb: 1 }}>
                  ⚡
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Fácil de Usar
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Interface simples e intuitiva para todos
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" sx={{ color: '#6366f1', fontWeight: 700, mb: 1 }}>
                  🏪
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Negócios Locais
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Fortalecendo a economia da sua região
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Box sx={{ mt: 6 }}>
        <Grid container spacing={6} justifyContent="center">
          <Grid item xs={12} md={5}>
            <Paper
              sx={{
                p: 5,
                textAlign: 'center',
                height: '450px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.3s ease',
                border: '1px solid',
                borderColor: 'divider',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: '0 16px 32px -8px rgba(37, 99, 235, 0.2)',
                  borderColor: 'primary.light'
                }
              }}
            >
              <Box>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3,
                    boxShadow: '0 8px 20px rgba(37, 99, 235, 0.3)'
                  }}
                >
                  <Person sx={{ fontSize: 40, color: 'white' }} />
                </Box>
                <Typography
                  variant="h4"
                  gutterBottom
                  color="primary"
                  sx={{ fontWeight: 600, mb: 2 }}
                >
                  Sou Associado
                </Typography>
                <Typography
                  variant="body1"
                  paragraph
                  color="text.secondary"
                  sx={{ lineHeight: 1.6, mb: 3 }}
                >
                  Encontre cupons de desconto exclusivos dos comerciantes da sua região.
                  Economize em suas compras e descubra novos estabelecimentos.
                </Typography>
              </Box>
              <Box sx={{ mt: 4 }}>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={() => navigate('/login?tipo=associado')}
                  sx={{
                    mb: 2,
                    fontSize: '1rem',
                    minHeight: '52px',
                    borderRadius: 3,
                    textTransform: 'none',
                    fontWeight: 600,
                    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 16px rgba(37, 99, 235, 0.4)'
                    }
                  }}
                >
                  Entrar como Associado
                </Button>
                <Button
                  variant="text"
                  size="medium"
                  fullWidth
                  onClick={() => navigate('/register/associado')}
                  sx={{
                    textTransform: 'none',
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    color: 'primary.main',
                    '&:hover': {
                      bgcolor: 'rgba(37, 99, 235, 0.05)'
                    }
                  }}
                >
                  Cadastrar como Associado
                </Button>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={5}>
            <Paper
              sx={{
                p: 5,
                textAlign: 'center',
                height: '450px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.3s ease',
                border: '1px solid',
                borderColor: 'divider',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: '0 16px 32px -8px rgba(16, 185, 129, 0.2)',
                  borderColor: 'secondary.light'
                }
              }}
            >
              <Box>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    bgcolor: 'secondary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3,
                    boxShadow: '0 8px 20px rgba(16, 185, 129, 0.3)'
                  }}
                >
                  <Storefront sx={{ fontSize: 40, color: 'white' }} />
                </Box>
                <Typography
                  variant="h4"
                  gutterBottom
                  color="secondary"
                  sx={{ fontWeight: 600, mb: 2 }}
                >
                  Sou Comerciante
                </Typography>
                <Typography
                  variant="body1"
                  paragraph
                  color="text.secondary"
                  sx={{ lineHeight: 1.6, mb: 3 }}
                >
                  Crie cupons de desconto e atraia mais clientes para seu negócio.
                  Aumente suas vendas e fidelize seus clientes com ofertas especiais.
                </Typography>
              </Box>
              <Box sx={{ mt: 4 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  fullWidth
                  onClick={() => navigate('/login?tipo=comerciante')}
                  sx={{
                    mb: 2,
                    fontSize: '1rem',
                    minHeight: '52px',
                    borderRadius: 3,
                    textTransform: 'none',
                    fontWeight: 600,
                    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                    color: 'white',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 16px rgba(16, 185, 129, 0.4)'
                    }
                  }}
                >
                  Entrar como Comerciante
                </Button>
                <Button
                  variant="text"
                  size="medium"
                  fullWidth
                  onClick={() => navigate('/register/comercio')}
                  sx={{
                    textTransform: 'none',
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    color: 'secondary.main',
                    '&:hover': {
                      bgcolor: 'rgba(16, 185, 129, 0.05)'
                    }
                  }}
                >
                  Cadastrar como Comerciante
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
