
// src/components/Footer.js
import React from 'react';
import { Container, Typography, Grid, Link, Box } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{ backgroundColor: '#355C78', color: '#fff', py: 2, fontFamily: 'Poppins', fontSize: '14px' }}
    >
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" sx={{ fontFamily: 'Poppins' }}>About Us</Typography>
            <ul>
              <li><Link href="#" sx={{ textDecoration: 'none', color: 'inherit', '&:hover': { color: '#740F35' } }}>Help Guide</Link></li>
              <li><Link href="#" sx={{ textDecoration: 'none', color: 'inherit', '&:hover': { color: '#740F35' } }}>Meet Our Team</Link></li>
              <li><Link href="#" sx={{ textDecoration: 'none', color: 'inherit', '&:hover': { color: '#740F35' } }}>Our Story</Link></li>
              <li><Link href="#" sx={{ textDecoration: 'none', color: 'inherit', '&:hover': { color: '#740F35' } }}>Advisory Council</Link></li>
              <li><Link href="#" sx={{ textDecoration: 'none', color: 'inherit', '&:hover': { color: '#740F35' } }}>Gallery</Link></li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" sx={{ fontFamily: 'Poppins' }}>Resources</Typography>
            <ul>
              <li><Link href="#" sx={{ textDecoration: 'none', color: 'inherit', '&:hover': { color: '#740F35' } }}>Harvard Health</Link></li>
              <li><Link href="#" sx={{ textDecoration: 'none', color: 'inherit', '&:hover': { color: '#740F35' } }}>Meditation</Link></li>
              <li><Link href="#" sx={{ textDecoration: 'none', color: 'inherit', '&:hover': { color: '#740F35' } }}>Newsletter</Link></li>
              <li><Link href="#" sx={{ textDecoration: 'none', color: 'inherit', '&:hover': { color: '#740F35' } }}>Privacy Policy</Link></li>
              <li><Link href="#" sx={{ textDecoration: 'none', color: 'inherit', '&:hover': { color: '#740F35' } }}>Terms of Usage</Link></li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" sx={{ fontFamily: 'Poppins' }}>Get In Touch</Typography>
            <ul>
              <li><Link href="#" sx={{ textDecoration: 'none', color: 'inherit', '&:hover': { color: '#740F35' } }}>FAQS</Link></li>
              <li><Link href="#" sx={{ textDecoration: 'none', color: 'inherit', '&:hover': { color: '#740F35' } }}>Contact Us</Link></li>
              <li><Link href="#" sx={{ textDecoration: 'none', color: 'inherit', '&:hover': { color: '#740F35' } }}>RIO</Link></li>
              <li><Link href="#" sx={{ textDecoration: 'none', color: 'inherit', '&:hover': { color: '#740F35' } }}>Rate Card</Link></li>
              <li><Link href="#" sx={{ textDecoration: 'none', color: 'inherit', '&:hover': { color: '#740F35' } }}>Corporation</Link></li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" sx={{ fontFamily: 'Poppins' }}>Follow Us</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Link href="#" color="inherit"><img src="https://th.bing.com/th?id=OIP.A_QLZ7Y9nBwaWnkhCbvGmQHaHZ&w=250&h=249&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2" style={{ width: 25, height: 25 }} alt="Social Icon 1" /></Link>
              <Link href="#" color="inherit"><img src="https://th.bing.com/th?id=OIF.jTWQ7bEsaiRFIayGm7Irbg&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2" style={{ width: 25, height: 25 }} alt="Social Icon 2" /></Link>
              <Link href="#" color="inherit"><img src="https://th.bing.com/th?id=OIP.TwESrblIhpd2D8XG5VDz5QHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2" style={{ width: 25, height: 25 }} alt="Social Icon 3" /></Link>
            </Box>
          </Grid>
        </Grid>
        {/* Reserved Rights Notice */}
        <Box sx={{ mt: 1, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ fontFamily: 'Poppins', color: '#fff' }}>
            © {new Date().getFullYear()} CalmDorm.org. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
