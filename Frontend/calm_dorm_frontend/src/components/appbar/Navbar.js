import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <div>
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: '#355C78' }}>
        <Toolbar>
          <Typography variant="h2" component="h6" gutterBottom sx={{ fontFamily: 'Poppins', color: 'white', fontSize: '20px', cursor: 'pointer' }}>
            CalmDorm.org
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end', alignItems: 'center' }}>
            {/* Removed the search TextField and IconButton */}
          </Box>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: { xs: 'block', md: 'none' } }}
            onClick={handleOpenNavMenu}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
          >
            <MenuItem onClick={handleCloseNavMenu}>Home</MenuItem>
            <MenuItem onClick={handleCloseNavMenu}>About</MenuItem>
            <MenuItem onClick={handleCloseNavMenu}>Features</MenuItem>
            <MenuItem onClick={handleCloseNavMenu}>Contact</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
