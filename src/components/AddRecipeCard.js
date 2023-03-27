import React, { useState, useEffect } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const initalState = {
  title: '',
  category: '',
  picture: '',
  description: '',
}

export const AddRecipeCard = ({ actionType }) => {
  const [cardDataState, setCardDataState] = useState(initalState);

  const { id } = useParams();

  const getCard = async () => {
    try {
      const response = await fetch(
        `http://localhost:3030/data/all-recipes/${id}`
      );
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setCardDataState(responseData);
    } catch (err) {
      alert(err);
    }
  };

  
  useEffect(() => {
    if (actionType === 'edit') {
      getCard();
    } else {
      setCardDataState(initalState)
    }
  }, [actionType]);

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
      const response = await fetch(
        `http://localhost:3030/data/all-recipes${
          actionType === 'edit' ? '/' + id : ''
        }`,
        {
          method: `${actionType === 'edit' ? 'PUT' : 'POST'}`,
          headers: {
            'X-Authorization': accessToken,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cardDataState),
        }
      );

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
        value={cardDataState.title}
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
        value={cardDataState.category}
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
        value={cardDataState.picture}
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
        value={cardDataState.description}
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
        {actionType === 'edit' ? 'Edit recipe' : 'Add recipe'}
      </Button>
    </Box>
  );
};
