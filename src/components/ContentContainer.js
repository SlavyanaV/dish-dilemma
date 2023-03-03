import { Box } from '@mui/material';
import { Login } from './Login';
import { RecipeCard } from './RecipeCard';
import { Register } from './Register';

export const ContentContainer = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#adb773',
      }}
    >
      {/* <RecipeCard /> */}
      {/* <Register /> */}
      <Login />
    </Box>
  );
};
