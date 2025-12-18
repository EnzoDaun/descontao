import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Menu as MenuIcon, Loyalty as LoyaltyIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated, isAssociado, isComercio } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const handleMenuClick = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const menuItems = [];

  if (isAuthenticated()) {
    menuItems.push({ label: 'Dashboard', path: '/dashboard' });

    if (isAssociado()) {
      menuItems.push(
        { label: 'Cupons Disponíveis', path: '/cupons/disponiveis' },
        { label: 'Meus Cupons', path: '/cupons/meus' }
      );
    }

    if (isComercio()) {
      menuItems.push(
        { label: 'Criar Cupons', path: '/cupons/criar' },
        { label: 'Gerenciar Cupons', path: '/cupons/gerenciar' },
        { label: 'Validar Cupons', path: '/cupons/validar' }
      );
    }
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Box
          sx={{
            flexGrow: 1,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
          onClick={() => navigate('/')}
        >
          <LoyaltyIcon
            sx={{
              fontSize: 28,
              color: 'white'
            }}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: 600 }}
          >
            Descontão
          </Typography>
        </Box>

        {isAuthenticated() ? (
          <>
            {isMobile ? (
              <IconButton
                color="inherit"
                onClick={() => setMobileMenuOpen(true)}
                edge="end"
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Button
                  color="inherit"
                  onClick={() => navigate('/dashboard')}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 500,
                    borderRadius: 2,
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                    }
                  }}
                >
                  Dashboard
                </Button>

                {isAssociado() && (
                  <>
                    <Button
                      color="inherit"
                      onClick={() => navigate('/cupons/disponiveis')}
                      sx={{
                        textTransform: 'none',
                        fontWeight: 500,
                        borderRadius: 2,
                        '&:hover': {
                          bgcolor: 'rgba(255, 255, 255, 0.1)',
                        }
                      }}
                    >
                      Cupons Disponíveis
                    </Button>
                    <Button
                      color="inherit"
                      onClick={() => navigate('/cupons/meus')}
                      sx={{
                        textTransform: 'none',
                        fontWeight: 500,
                        borderRadius: 2,
                        '&:hover': {
                          bgcolor: 'rgba(255, 255, 255, 0.1)',
                        }
                      }}
                    >
                      Meus Cupons
                    </Button>
                  </>
                )}

                {isComercio() && (
                  <>
                    <Button
                      color="inherit"
                      onClick={() => navigate('/cupons/criar')}
                      sx={{
                        textTransform: 'none',
                        fontWeight: 500,
                        borderRadius: 2,
                        '&:hover': {
                          bgcolor: 'rgba(255, 255, 255, 0.1)',
                        }
                      }}
                    >
                      Criar Cupons
                    </Button>
                    <Button
                      color="inherit"
                      onClick={() => navigate('/cupons/gerenciar')}
                      sx={{
                        textTransform: 'none',
                        fontWeight: 500,
                        borderRadius: 2,
                        '&:hover': {
                          bgcolor: 'rgba(255, 255, 255, 0.1)',
                        }
                      }}
                    >
                      Gerenciar Cupons
                    </Button>
                    <Button
                      color="inherit"
                      onClick={() => navigate('/cupons/validar')}
                      sx={{
                        textTransform: 'none',
                        fontWeight: 500,
                        borderRadius: 2,
                        '&:hover': {
                          bgcolor: 'rgba(255, 255, 255, 0.1)',
                        }
                      }}
                    >
                      Validar Cupons
                    </Button>
                  </>
                )}

                <Typography
                  variant="body2"
                  sx={{
                    alignSelf: 'center',
                    mr: 2,
                    fontWeight: 500,
                    opacity: 0.9
                  }}
                >
                  {user?.nome}
                </Typography>
                <Button
                  color="inherit"
                  onClick={handleLogout}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 500,
                    borderRadius: 2,
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                    }
                  }}
                >
                  Sair
                </Button>
              </Box>
            )}

            <Drawer
              anchor="right"
              open={mobileMenuOpen}
              onClose={() => setMobileMenuOpen(false)}
            >
              <Box sx={{ width: 250, pt: 2 }}>
                <Typography variant="h6" sx={{ px: 2, mb: 2 }}>
                  {user?.nome}
                </Typography>
                <List>
                  {menuItems.map((item, index) => (
                    <ListItem key={index}>
                      <Button
                        fullWidth
                        sx={{
                          justifyContent: 'flex-start',
                          color: 'inherit',
                          textTransform: 'none'
                        }}
                        onClick={() => handleMenuClick(item.path)}
                      >
                        <ListItemText primary={item.label} />
                      </Button>
                    </ListItem>
                  ))}
                  <ListItem>
                    <Button
                      fullWidth
                      sx={{
                        justifyContent: 'flex-start',
                        color: 'inherit',
                        textTransform: 'none'
                      }}
                      onClick={handleLogout}
                    >
                      <ListItemText primary="Sair" />
                    </Button>
                  </ListItem>
                </List>
              </Box>
            </Drawer>
          </>
        ) : null}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
