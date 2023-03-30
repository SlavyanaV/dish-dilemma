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
import { colors, link } from '../shared/styles/sharedStyles';

export const Navbar = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');  

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
            backgroundColor: colors.dark,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Link to="/" style={link}>
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
                  color: colors.light,
                }}
              >
                Dish Dilemma
              </Typography>
            </Link>
          </Box>
          <Box>
            <Link to="/" style={link}>
              <Button sx={{ color: colors.light }}>Random recipe</Button>
            </Link>
            <Link to="/all-recipes" style={link}>
              <Button sx={{ color: colors.light }}>All recipes</Button>
            </Link>
            {!!accessToken ? (
              <>
                <Link to="/add-recipe" style={link}>
                  <Button sx={{ color: colors.light }}>Add recipe</Button>
                </Link>
                <Link to="/my-profile" style={link}>
                  <Button sx={{ color: colors.light }}>My profile</Button>
                </Link>
                <Link to="/" style={link}>
                  <Button sx={{ color: colors.light }} onClick={handleOnLogout}>
                    Logout
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" style={link}>
                  <Button sx={{ color: colors.light }}>Login</Button>
                </Link>
                <Link to="/register" style={link}>
                  <Button sx={{ color: colors.light }}>Register</Button>
                </Link>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
