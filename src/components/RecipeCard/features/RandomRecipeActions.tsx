import { Box, Button } from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  getRandomRecipe: () => Promise<void>;
};

export const RandomRecipeActions: FC<Props> = ({ getRandomRecipe }) => {
  return (
    <Box>
      <Button
        variant="outlined"
        color="inherit"
        sx={{ m: 1 }}
        onClick={getRandomRecipe}
      >
        See another recipe
      </Button>
      <Link
        to="/all-recipes"
        style={{ color: 'inherit', textDecoration: 'none' }}
      >
        <Button variant="outlined" color="inherit" sx={{ m: 1 }}>
          See all recipes
        </Button>
      </Link>
    </Box>
  );
};
