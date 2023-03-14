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
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const linkStyles = { color: 'inherit', textDecoration: 'none' };

  return (
    <Box>
      <AppBar position="static">
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
                }}
              >
                Dish Dilemma
              </Typography>
            </Link>
          </Box>
          <Box>
            <Link to="/" style={linkStyles}>
              <Button color="inherit">Random recipe</Button>
            </Link>
            <Link to="/all-recipes" style={linkStyles}>
              <Button color="inherit">All recipes</Button>
            </Link>
            <Link to="/add-recipe" style={linkStyles}>
              <Button color="inherit">Add recipe</Button>
            </Link>
            <Link to="/login" style={linkStyles}>
              <Button color="inherit">Login</Button>
            </Link>
            <Link to="/register" style={linkStyles}>
              <Button color="inherit">Register</Button>
            </Link>
            <Link to="/" style={linkStyles}>
              <Button color="inherit">Logout</Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
