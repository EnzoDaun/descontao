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
import { Menu as MenuIcon } from '@mui/icons-material';
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
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          Descontão
        </Typography>

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
                <Button color="inherit" onClick={() => navigate('/dashboard')}>
                  Dashboard
                </Button>

                {isAssociado() && (
                  <>
                    <Button color="inherit" onClick={() => navigate('/cupons/disponiveis')}>
                      Cupons Disponíveis
                    </Button>
                    <Button color="inherit" onClick={() => navigate('/cupons/meus')}>
                      Meus Cupons
                    </Button>
                  </>
                )}

                {isComercio() && (
                  <>
                    <Button color="inherit" onClick={() => navigate('/cupons/criar')}>
                      Criar Cupons
                    </Button>
                    <Button color="inherit" onClick={() => navigate('/cupons/gerenciar')}>
                      Gerenciar Cupons
                    </Button>
                    <Button color="inherit" onClick={() => navigate('/cupons/validar')}>
                      Validar Cupons
                    </Button>
                  </>
                )}

                <Typography variant="body2" sx={{ alignSelf: 'center', mr: 2 }}>
                  {user?.nome}
                </Typography>
                <Button color="inherit" onClick={handleLogout}>
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
                    <ListItem
                      button
                      key={index}
                      onClick={() => handleMenuClick(item.path)}
                    >
                      <ListItemText primary={item.label} />
                    </ListItem>
                  ))}
                  <ListItem button onClick={handleLogout}>
                    <ListItemText primary="Sair" />
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
