import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Button, Grid, Paper, useMediaQuery, useTheme } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AuthContext from '../../context/AuthContext';

const LandingPage = () => {
  const { authToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Update the login state based on the authToken
    setIsLoggedIn(!!authToken);
  }, [authToken]);

  const handleGetStartedClick = () => {
    if (isLoggedIn) {
      navigate('/quiz');
    } else {
      alert('Please sign up first');
    }
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F0F4F8' }}>
      {/* Hero Section */}
      <Box 
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          backgroundImage: 'url(https://images.unsplash.com/photo-1644148297708-575df53b1dca?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)', 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          padding: isSmallScreen ? '2rem' : '4rem',
          position: 'relative',
        }}
      >
        {/* Overlay for better text readability */}
        <Box 
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.5)', // Dark overlay
            zIndex: 1,
          }}
        />

        <Typography 
          variant="h2" 
          component="h1" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold', 
            fontSize: isSmallScreen ? '2rem' : '3rem',
            fontFamily: 'Poppins',
            position: 'relative',
            zIndex: 2,
          }}
        >
          Welcome to Calm Dorm
        </Typography>
        <Typography 
          variant="h5" 
          sx={{ 
            mb: 4, 
            fontStyle: 'italic',
            fontFamily: 'Poppins',
            position: 'relative',
            zIndex: 2,
          }}
        >
          Your Sanctuary for Relaxation and Fun
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={handleGetStartedClick}
          sx={{
            backgroundColor: '#FF66B2',
            color: 'white',
            padding: '1rem 2rem',
            borderRadius: '30px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
            transition: 'background-color 0.3s ease, transform 0.3s ease',
            ':hover': {
              backgroundColor: '#FF3385',
              transform: 'scale(1.05)',
            },
            position: 'relative',
            zIndex: 2,
          }}
        >
          Get Started <ArrowForwardIcon sx={{ ml: 1 }} />
        </Button>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 8, px: 2 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper 
              sx={{ 
                p: 3, 
                textAlign: 'center', 
                backgroundColor: '#FFFFFF', 
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', 
                borderRadius: '15px',
                transition: 'box-shadow 0.3s ease, border 0.3s ease',
                border: '2px solid transparent',
                ':hover': {
                  cursor:'pointer',
                  boxShadow: '0px 0px 15px rgba(0, 150, 255, 0.7)', // Glowing effect
                  border: '2px solid rgba(0, 150, 255, 0.7)', // Glowing border color
                },
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, fontFamily: 'Poppins' }}>Personalized Experience</Typography>
              <Typography sx={{ fontFamily: 'Poppins' }}>Discover a range of features designed to cater to your unique preferences and needs, making your journey with us truly one-of-a-kind.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper 
              sx={{ 
                p: 3, 
                textAlign: 'center', 
                backgroundColor: '#FFFFFF', 
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', 
                borderRadius: '15px',
                transition: 'box-shadow 0.3s ease, border 0.3s ease',
                border: '2px solid transparent',
                ':hover': {
                  cursor:'pointer',
                  boxShadow: '0px 0px 15px rgba(0, 150, 255, 0.7)', // Glowing effect
                  border: '2px solid rgba(0, 150, 255, 0.7)', // Glowing border color
                },
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, fontFamily: 'Poppins' }}>Engaging Activities</Typography>
              <Typography sx={{ fontFamily: 'Poppins' }}>Immerse yourself in interactive activities that not only entertain but also refresh your mind and soothe your spirit.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper 
              sx={{ 
                p: 3, 
                textAlign: 'center', 
                backgroundColor: '#FFFFFF', 
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', 
                borderRadius: '15px',
                transition: 'box-shadow 0.3s ease, border 0.3s ease',
                border: '2px solid transparent',
                ':hover': {
                  cursor:'pointer',
                  boxShadow: '0px 0px 15px rgba(0, 150, 255, 0.7)',
                  border: '2px solid rgba(0, 150, 255, 0.7)',
                },
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, fontFamily: 'Poppins' }}>Secure and Personalized</Typography>
              <Typography sx={{ fontFamily: 'Poppins' }}>Experience a secure and personalized environment that adapts to your preferences and ensures a comfortable experience.</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LandingPage;
