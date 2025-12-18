import React from 'react';
import { Paper, Box, Typography, Button } from '@mui/material';

const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  buttonText, 
  onClick, 
  color = 'primary',
  height = '240px' 
}) => {
  const getColorConfig = () => {
    switch (color) {
      case 'secondary':
        return {
          main: 'secondary.main',
          light: 'secondary.light',
          shadow: 'rgba(16, 185, 129, 0.15)',
          buttonColor: 'secondary'
        };
      case 'tertiary':
        return {
          main: '#6366f1',
          light: '#6366f1',
          shadow: 'rgba(99, 102, 241, 0.15)',
          buttonColor: 'primary'
        };
      default:
        return {
          main: 'primary.main',
          light: 'primary.light',
          shadow: 'rgba(37, 99, 235, 0.15)',
          buttonColor: 'primary'
        };
    }
  };

  const colorConfig = getColorConfig();

  return (
    <Paper 
      sx={{ 
        p: 4, 
        textAlign: 'center', 
        height,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.3s ease',
        border: '1px solid',
        borderColor: 'divider',
        '&:hover': {
          transform: onClick ? 'translateY(-4px)' : 'none',
          boxShadow: `0 12px 24px -4px ${colorConfig.shadow}`,
          borderColor: colorConfig.light
        }
      }}
      onClick={onClick}
    >
      <Box sx={{ mb: 2 }}>
        <Box 
          sx={{ 
            width: 60, 
            height: 60, 
            borderRadius: '50%', 
            bgcolor: colorConfig.main, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            mx: 'auto', 
            mb: 2,
        boxShadow: `0 4px 12px ${colorConfig.shadow.replace('0.15', '0.3')}`
      }}
    >
      {typeof icon === 'string' ? (
        <Typography variant="h4" sx={{ color: 'white' }}>
          {icon}
        </Typography>
      ) : (
        icon
      )}
    </Box>
      </Box>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: colorConfig.main }}>
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {description}
      </Typography>
      {buttonText && (
        <Button
          variant="contained"
          color={color === 'tertiary' ? 'primary' : colorConfig.buttonColor}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 500,
            px: 3,
            ...(color === 'tertiary' && {
              bgcolor: '#6366f1',
              color: 'white',
              '&:hover': { bgcolor: '#5b51f5' }
            }),
            ...(color === 'secondary' && {
              color: 'white'
            })
          }}
        >
          {buttonText}
        </Button>
      )}
    </Paper>
  );
};

export default FeatureCard;
