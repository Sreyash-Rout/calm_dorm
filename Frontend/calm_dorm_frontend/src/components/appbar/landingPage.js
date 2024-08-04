import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Button, Grid, Paper, useMediaQuery, useTheme } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const LandingPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleGetStartedClick = () => {
    navigate('/quiz');
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
            <Paper sx={{ p: 3, textAlign: 'center', backgroundColor: '#FFFFFF', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: '15px' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, fontFamily: 'Poppins' }}>Feature 1</Typography>
              <Typography sx={{ fontFamily: 'Poppins' }}>Discover how our first feature enhances your experience.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, textAlign: 'center', backgroundColor: '#FFFFFF', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: '15px' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, fontFamily: 'Poppins' }}>Feature 2</Typography>
              <Typography sx={{ fontFamily: 'Poppins' }}>Explore the second feature that sets us apart.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, textAlign: 'center', backgroundColor: '#FFFFFF', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: '15px' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, fontFamily: 'Poppins' }}>Feature 3</Typography>
              <Typography sx={{ fontFamily: 'Poppins' }}>Learn about our third feature designed for your enjoyment.</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LandingPage;
