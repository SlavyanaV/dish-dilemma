import { Box } from '@mui/material';
import { Login } from './Login';
import { RecipeCard } from './RecipeCard';
import { Register } from './Register';
import { CardsList } from './CardsList';
import { AddRecipeCard } from './AddRecipeCard';

export const ContentContainer = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#adb773',
      }}
    >
      <RecipeCard size={'main'} />
      <Register />
      <Login />
      <CardsList />
      <AddRecipeCard />
    </Box>
  );
};
