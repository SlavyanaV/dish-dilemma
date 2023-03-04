import * as React from 'react';
import { Grid } from '@mui/material';
import { RecipeCard } from './RecipeCard';

export const CardsList = () => {
  return (
    <Grid
      container
      spacing={5}
      sx={{ display: 'flex', justifyContent: 'space-around' }}
    >
      <Grid item xs={'auto'}>
        <RecipeCard />
      </Grid>
      <Grid item xs={'auto'}>
        <RecipeCard />
      </Grid>
      <Grid item xs={'auto'}>
        <RecipeCard />
      </Grid>
      <Grid item xs={'auto'}>
        <RecipeCard />
      </Grid>
      <Grid item xs={'auto'}>
        <RecipeCard />
      </Grid>
      <Grid item xs={'auto'}>
        <RecipeCard />
      </Grid>
      <Grid item xs={'auto'}>
        <RecipeCard />
      </Grid>
      <Grid item xs={'auto'}>
        <RecipeCard />
      </Grid>
      <Grid item xs={'auto'}>
        <RecipeCard />
      </Grid>
    </Grid>
  );
};
