import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import RegisterAssociado from './pages/RegisterAssociado';
import RegisterComercio from './pages/RegisterComercio';
import EsqueciSenha from './pages/EsqueciSenha';
import RedefinirSenha from './pages/RedefinirSenha';
import Dashboard from './pages/Dashboard';
import CuponsDisponiveis from './pages/CuponsDisponiveis';
import MeusCupons from './pages/MeusCupons';
import CriarCupom from './pages/CriarCupom';
import GerenciarCupons from './pages/GerenciarCupons';
import ValidarCupons from './pages/ValidarCupons';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/esqueci-senha" element={<EsqueciSenha />} />
            <Route path="/reset-password" element={<RedefinirSenha />} />
            <Route path="/register/associado" element={<RegisterAssociado />} />
            <Route path="/register/comercio" element={<RegisterComercio />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cupons/disponiveis" element={<CuponsDisponiveis />} />
            <Route path="/cupons/meus" element={<MeusCupons />} />
            <Route path="/cupons/criar" element={<CriarCupom />} />
            <Route path="/cupons/gerenciar" element={<GerenciarCupons />} />
            <Route path="/cupons/validar" element={<ValidarCupons />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
