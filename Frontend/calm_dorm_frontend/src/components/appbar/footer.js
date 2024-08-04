
// Footer.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: 'black', color: 'white', textAlign: 'center', padding: '1rem 0', bottom: 0, width: '100%' }}>
      <Typography variant="body1">© 2024 Calm Dorm. All rights reserved.</Typography>
    </Box>
  );
};

export default Footer;
