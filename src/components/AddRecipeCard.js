import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Paper, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { outerPaper } from '../shared/styles/formsStyles';
import {
  paperHeading,
  mainBoxContainer,
  colors,
} from '../shared/styles/sharedStyles';
import {
  fetchRecipeById,
  manageRecipe,
} from '../shared/services/recipeService';

const initalState = {
  title: '',
  category: '',
  picture: '',
  description: '',
};

export const AddRecipeCard = ({ actionType }) => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');
  const { id } = useParams();

  const [cardDataState, setCardDataState] = useState(initalState);

  const getRecipe = async () => {
    try {
      const responseData = await fetchRecipeById(id);

      setCardDataState(responseData);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    if (actionType === 'edit') {
      getRecipe();
    } else {
      setCardDataState(initalState);
    }
  }, [actionType]);

  const handleOnChange = (event) => {
    const { name, value } = event.target;

    setCardDataState({
      ...cardDataState,
      [name]: value,
    });
  };

  const handleOnSubmit = async () => {
    try {
      await manageRecipe(actionType, id, accessToken, cardDataState);

      navigate('/all-recipes');
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Paper variant="outlined" sx={outerPaper}>
      <Box
        component="form"
        sx={{
          width: 700,
          maxWidth: '100%',
          ...mainBoxContainer,
        }}
        autoComplete="off"
      >
        <Paper
          elevation={10}
          sx={{ mb: 1.5, mt: 1.5, backgroundColor: colors.dark }}
        >
          <Typography variant="h4" sx={paperHeading}>
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
