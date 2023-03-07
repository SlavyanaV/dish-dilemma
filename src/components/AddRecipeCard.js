import * as React from 'react';
import { Box, TextField, Button } from '@mui/material';

export const AddRecipeCard = () => {
  return (
    <Box
      component="form"
      sx={{
        width: 700,
        maxWidth: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        sx={{ m: 1 }}
        id="filled-multiline-flexible"
        label="Recipe title"
        fullWidth
        multiline
        maxRows={2}
        variant="filled"
      />
      <TextField
        sx={{ m: 1 }}
        id="filled-multiline-flexible"
        label="Category"
        fullWidth
        multiline
        maxRows={2}
        variant="filled"
      />
      <TextField
        sx={{ m: 1 }}
        id="filled-multiline-flexible"
        label="Picture address"
        fullWidth
        multiline
        maxRows={2}
        variant="filled"
      />
      <TextField
        sx={{ m: 1 }}
        id="filled-multiline-static"
        label="Description"
        fullWidth
        multiline
        rows={8}
        variant="filled"
      />
      <Button sx={{ m: 1 }} color="inherit" fullWidth>
        Add recipe
      </Button>
    </Box>
  );
};
