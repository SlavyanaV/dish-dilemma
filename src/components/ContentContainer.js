import { Box } from '@mui/material';
import { RecipeCard } from './RecipeCard';

export const ContentContainer = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#adb773',
      }}
    >
      <RecipeCard />
    </Box>
  );
};
