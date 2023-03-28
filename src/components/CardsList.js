import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import { SmallCard } from './SmallCard';

export const CardsList = () => {
  const [cardsDataState, setCardsDataState] = useState([]);

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

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <Grid
      container
      sx={{
        margin: '20px 0',
        display: 'grid',
        gridTemplateColumns: '500px 500px 500px',        
        columnGap: '50px',
        rowGap: '50px',
        justifyContent: 'center',
      }}
    >
      {cardsDataState.length ? (
        <>
          {cardsDataState.map((card, index) => (
            <Grid item xs={'auto'} key={index}>
              <SmallCard card={card} />
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
