import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Paper, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const initalState = {
  title: '',
  category: '',
  picture: '',
  description: '',
};

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
      setCardDataState(initalState);
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
    <Paper
      variant="outlined"
      sx={{
        minWidth: 500,
        mt: '50px',
        padding: '20px',
        backgroundColor: '#E4BF89',
      }}
    >
      <Box
        component="form"
        sx={{
          width: 700,
          maxWidth: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
        autoComplete="off"
      >
        <Paper
          elevation={10}
          sx={{ mb: 1.5, mt: 1.5, backgroundColor: '#394110' }}
        >
          <Typography
            variant="h4"
            sx={{ textAlign: 'center', pb: 1.5, pt: 1.5, color: '#E4BF89' }}
          >
            {actionType === 'edit' ? 'Edit your recipe' : 'Add your recipe'}
          </Typography>
        </Paper>

        <TextField
          name="title"
          value={cardDataState.title}
          sx={{ mt: 1 }}
          id="filled-multiline-flexible"
          label="Recipe title"
          variant="outlined"
          color="success"
          onChange={handleOnChange}
        />
        <TextField
          name="category"
          value={cardDataState.category}
          sx={{ mt: 2.5 }}
          id="filled-multiline-flexible"
          label="Category"
          variant="outlined"
          color="success"
          onChange={handleOnChange}
        />
        <TextField
          name="picture"
          value={cardDataState.picture}
          sx={{ mt: 2.5 }}
          id="filled-multiline-flexible"
          label="Picture address"
          multiline
          maxRows={2}
          variant="outlined"
          color="success"
          onChange={handleOnChange}
        />
        <TextField
          name="description"
          value={cardDataState.description}
          sx={{ mt: 2.5 }}
          id="filled-multiline-static"
          label="Description"
          multiline
          rows={8}
          variant="outlined"
          color="success"
          onChange={handleOnChange}
        />
        <Button
          variant="outlined"
          onClick={handleOnSubmit}
          sx={{ mt: 2.5 }}
          color="inherit"
        >
          {actionType === 'edit' ? 'Edit recipe' : 'Add recipe'}
        </Button>
      </Box>
    </Paper>
  );
};
