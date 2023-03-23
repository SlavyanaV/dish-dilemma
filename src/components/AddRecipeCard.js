import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const AddRecipeCard = () => {
  const [cardDataState, setCardDataState] = useState({
    title: '',
    category: '',
    picture: '',
    description: '',
  });

  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');

  const handleOnChange = (event) => {
    const { name, value } = event.target;

    setCardDataState({
      ...cardDataState,
      [name]: value,
    });
  };

  const handleOnSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3030/data/all-recipes', {
        method: 'POST',
        headers: {
          'X-Authorization': accessToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cardDataState),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      navigate('/all-recipes');
    } catch (err) {
      alert(err);
    }
  };

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
        name="title"
        sx={{ m: 1 }}
        id="filled-multiline-flexible"
        label="Recipe title"
        fullWidth
        multiline
        maxRows={2}
        variant="filled"
        onChange={handleOnChange}
      />
      <TextField
        name="category"
        sx={{ m: 1 }}
        id="filled-multiline-flexible"
        label="Category"
        fullWidth
        multiline
        maxRows={2}
        variant="filled"
        onChange={handleOnChange}
      />
      <TextField
        name="picture"
        sx={{ m: 1 }}
        id="filled-multiline-flexible"
        label="Picture address"
        fullWidth
        multiline
        maxRows={2}
        variant="filled"
        onChange={handleOnChange}
      />
      <TextField
        name="description"
        sx={{ m: 1 }}
        id="filled-multiline-static"
        label="Description"
        fullWidth
        multiline
        rows={8}
        variant="filled"
        onChange={handleOnChange}
      />
      <Button onClick={handleOnSubmit} sx={{ m: 1 }} color="inherit" fullWidth>
        Add recipe
      </Button>
    </Box>
  );
};
