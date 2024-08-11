import React, { useState, useContext } from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Menu, MenuItem, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/landing');
    window.location.reload();
  };


  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: 'black' }}>
        <Toolbar>
          <Typography
            variant="h2"
            component={Link}
            to="/"
            gutterBottom
            sx={{
              fontFamily: 'Poppins',
              color: 'yellow',
              fontSize: '20px',
              cursor: 'pointer',
              textDecoration: 'none',
              '&:hover': {
                color: 'white',
              }
            }}
          >
            CalmDorm.org
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'flex-end',
              alignItems: 'center'
            }}
          >
            {user ? (
              <>
                <Typography sx={{ color: 'yellow', marginRight: '1rem', fontFamily: 'Poppins' }}>
                  Hello, {user.username}!
                </Typography>
                <Button
                  sx={{
                    color: 'yellow',
                    fontFamily: 'Poppins',
                    ':hover': {
                      color: 'white',
                    }
                  }}
                  onClick={handleLogout}
                >
                  Sign Out
                </Button>

              </>
            ) : (
              <Button
                color="inherit"
                component={Link}
                to="/"
                sx={{
                  color: 'yellow',
                  fontFamily: 'Poppins',
                  ':hover': {
                    color: 'white',
                  }
                }}
              >
                Login / Signup
              </Button>
            )}
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
