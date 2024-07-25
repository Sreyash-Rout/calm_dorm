import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { Container, Typography, Button, Box, Grid, Paper, AppBar, Toolbar, IconButton, Menu, MenuItem, TextField } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const LandingPage = () => {
  const navigate = useNavigate(); // Initialize navigate

  const handleGetStartedClick = () => {
    navigate('/quiz'); // Redirect to the quiz page
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Main Content */}
      <Container
        maxWidth="lg"
        sx={{
          backgroundColor: '#f5f5f5',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: 'center',
          flexGrow: 1,
          fontFamily: 'Poppins',
        }}
      >
        <Box sx={{ mb: 1 ,mt:-9}}>
          <img 
            src="https://i.pinimg.com/originals/9e/54/30/9e5430f7c711d7c08ff7940f58b9cf8d.jpg"  // Replace with your image URL
            alt="Calm Dorm Logo"
            style={{ height: '200px', width: '200px' }}  // Adjust size as needed
          />
        </Box>
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontFamily: 'Poppins', color: '#740F35' }}>
          <b>Calm Dorm</b>
        </Typography>
        <Typography variant="h5" paragraph sx={{ fontFamily: 'Lucida Handwriting', color: '#C06C84', fontWeight: 'bold' }}>
          Breathe Easy, Connect Deeply, and Play Joyfully
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={handleGetStartedClick} // Attach click handler
          sx={{
            backgroundColor: '#2E3B55',
            color: 'white',
            fontFamily: 'Poppins',
            transition: 'background-color 0.3s ease, box-shadow 0.1s ease, border 0.2s ease',
            ':hover': {
              backgroundColor: '#2E3B55',
              boxShadow: 20,
              border: '4px solid #82E0AA',
            },
          }}
        >
          Get Started<ArrowForwardIcon sx={{ ml: 1 }} />
        </Button>

        <Box mt={5}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Paper sx={{ p: 3, textAlign: 'center', backgroundColor: '#D5F5E3' }}>
                <Typography variant="h6" sx={{ color: '#2E3B55', fontFamily: 'Poppins' }}>Feature 1</Typography>
                <Typography sx={{ color: '#555555', fontFamily: 'Poppins' }}>Details about feature 1.</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper sx={{ p: 3, textAlign: 'center', backgroundColor: '#D5F5E3' }}>
                <Typography variant="h6" sx={{ color: '#2E3B55', fontFamily: 'Poppins' }}>Feature 2</Typography>
                <Typography sx={{ color: '#555555', fontFamily: 'Poppins' }}>Details about feature 2.</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper sx={{ p: 3, textAlign: 'center', backgroundColor: '#D5F5E3' }}>
                <Typography variant="h6" sx={{ color: '#2E3B55', fontFamily: 'Poppins' }}>Feature 3</Typography>
                <Typography sx={{ color: '#555555', fontFamily: 'Poppins' }}>Details about feature 3.</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default LandingPage;
