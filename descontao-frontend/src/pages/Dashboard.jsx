import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Home from './Home';

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated()) {
    navigate('/login');
    return null;
  }

  return <Home />;
};

export default Dashboard;
