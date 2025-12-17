import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated, isAssociado, isComercio } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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
          <Box sx={{ display: 'flex', gap: 2 }}>
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
        ) : (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button color="inherit" onClick={() => navigate('/login')}>
              Login
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
