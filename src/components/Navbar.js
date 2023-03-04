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

export const Navbar = () => {
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
              href="/"
              sx={{
                ml: 2,
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Dish Dilemma
            </Typography>
          </Box>
          <Box>
            <Button color="inherit">Random recipe</Button>
            <Button color="inherit">All recipes</Button>
            <Button color="inherit">Add recipe</Button>
            <Button color="inherit">Login</Button>
            <Button color="inherit">Register</Button>
            <Button color="inherit">Logout</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
