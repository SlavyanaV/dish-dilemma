import React, { useState, useEffect } from 'react';
import { Grid, Stack, Alert, Box } from '@mui/material';
import { SmallCard } from './SmallCard';
import InfoIcon from '@mui/icons-material/Info';

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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '50%',
        mt: '50px',
      }}
    >
      {cardsDataState.length ? (
        <Grid
          container
          sx={{
            mb: '50px',
            display: 'grid',
            gridTemplateColumns: '500px 500px 500px',
            columnGap: '50px',
            rowGap: '50px',
            justifyContent: 'center',
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
              backgroundColor: '#E4BF89',
              color: 'black',
              mt: 1.5,
            }}
            icon={<InfoIcon sx={{ color: '#394110' }} />}
          >
            Currently there are no recipes in database
          </Alert>
        </Stack>
      )}
    </Box>
  );
};
