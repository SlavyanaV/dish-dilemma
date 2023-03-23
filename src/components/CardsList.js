import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import { RecipeCard } from './RecipeCard';

export const CardsList = () => {
  const [cardsDataState, setCardsDataState] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch('http://localhost:3030/data/all-recipes');
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setCardsDataState(responseData);
      } catch (err) {
        alert(err);
      }
    };
    fetchCards();
  }, []);

  return (
    <Grid
      container
      spacing={5}
      sx={{ display: 'flex', justifyContent: 'space-around' }}
    >
      {cardsDataState.length ? (
        <>
          {cardsDataState.map((card, index) => (
            <Grid item xs={'auto'} key={index}>
              <RecipeCard card={card} />
            </Grid>
          ))}
        </>
      ) : (
        <Typography variant="h3" sx={{ marginTop: '50px' }}>
          No recipes found
        </Typography>
      )}
    </Grid>
  );
};
