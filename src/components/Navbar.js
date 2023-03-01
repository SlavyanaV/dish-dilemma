import * as React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Button,
  Tooltip,
  IconButton,
  Avatar,
} from '@mui/material';

export const Navbar = () => {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#394110' }}>
          <Box>
            <Tooltip title="Open Home page">
              <IconButton>
                <Avatar
                  alt="Home page"
                  src="https://i.ibb.co/NxBkmyC/favicon.png"
                />
              </IconButton>
            </Tooltip>
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
