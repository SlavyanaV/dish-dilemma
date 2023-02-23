import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

export const Navbar = () => {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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
