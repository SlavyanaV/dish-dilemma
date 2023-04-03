import React, { useState, useEffect } from 'react';
import { Grid, Stack, Alert, Box, Snackbar, AlertTitle } from '@mui/material';
import { SmallCard } from './SmallCard';
import InfoIcon from '@mui/icons-material/Info';
import { mainBoxContainer, colors, grid } from '../shared/styles/sharedStyles';
import { fetchAllRecipes } from '../shared/services/recipeService';

export const CardsList = () => {
  const [cardsDataState, setCardsDataState] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const fetchRecipes = async () => {
    try {
      const responseData = await fetchAllRecipes();

      setCardsDataState(responseData);
    } catch (err) {
      setAlertMessage(err.message);
      setIsOpen(true);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <Box
      sx={{
        width: '50%',
        mt: '50px',
        ...mainBoxContainer,
      }}
    >
      {cardsDataState.length ? (
        <Grid
          container
          sx={{
            mb: '50px',
            ...grid,
          }}
        >
          {cardsDataState.map((card, index) => (
            <Grid item xs={'auto'} key={index}>
              <SmallCard card={card} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert
            severity="info"
            sx={{
              minWidth: 800,
              backgroundColor: colors.light,
              color: 'black',
              mt: 1.5,
            }}
            icon={<InfoIcon sx={{ color: colors.dark }} />}
          >
            Currently there are no recipes in database
          </Alert>
        </Stack>
      )}
      <Snackbar
        open={isOpen}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => setIsOpen(false)}
      >
        <Alert
          onClose={() => setIsOpen(false)}
          severity="error"
          variant="filled"
          sx={{ width: '100%', color: colors.light }}
        >
          <AlertTitle>Error</AlertTitle>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};
