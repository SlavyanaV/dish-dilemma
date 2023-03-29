import * as React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Button,
  Tooltip,
  IconButton,
  Avatar,
  Typography,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');

  const linkStyles = { color: 'inherit', textDecoration: 'none' };

  const handleOnLogout = async () => {
    try {
      const response = await fetch('http://localhost:3030/users/logout', {
        method: 'GET',
        headers: { 'X-Authorization': accessToken },
      });

      if (!response.ok) {
        throw new Error();
      }

      localStorage.clear();

      navigate('/login');
    } catch (err) {
      alert('Failed to log out!');
    }
  };

  return (
    <Box>
      <AppBar component="nav">
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: '#394110',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Link to="/" style={linkStyles}>
              <Tooltip title="Open Home page">
                <IconButton>
                  <Avatar
                    alt="Home page"
                    src="https://i.ibb.co/NxBkmyC/favicon.png"
                  />
                </IconButton>
              </Tooltip>
              <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  ml: 2,
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: '#E4BF89',
                }}
              >
                Dish Dilemma
              </Typography>
            </Link>
          </Box>
          <Box>
            <Link to="/" style={linkStyles}>
              <Button sx={{ color: '#E4BF89' }}>Random recipe</Button>
            </Link>
            <Link to="/all-recipes" style={linkStyles}>
              <Button sx={{ color: '#E4BF89' }}>All recipes</Button>
            </Link>
            {!!accessToken ? (
              <>
                <Link to="/add-recipe" style={linkStyles}>
                  <Button sx={{ color: '#E4BF89' }}>Add recipe</Button>
                </Link>
                <Link to="/my-profile" style={linkStyles}>
                  <Button sx={{ color: '#E4BF89' }}>My profile</Button>
                </Link>
                <Link to="/" style={linkStyles}>
                  <Button sx={{ color: '#E4BF89' }} onClick={handleOnLogout}>
                    Logout
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" style={linkStyles}>
                  <Button sx={{ color: '#E4BF89' }}>Login</Button>
                </Link>
                <Link to="/register" style={linkStyles}>
                  <Button sx={{ color: '#E4BF89' }}>Register</Button>
                </Link>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
