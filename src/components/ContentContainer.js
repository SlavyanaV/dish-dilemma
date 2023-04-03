import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import { Login } from './Login';
import { RecipeCard } from './RecipeCard';
import { Register } from './Register';
import { CardsList } from './CardsList';
import { ManageRecipeCard } from './ManageRecipeCard';
import { MyProfile } from './MyProfile';

export const ContentContainer = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: '50px',
      }}
    >
      <Routes>
        <Route path="/" element={<RecipeCard cardType={'main'} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/all-recipes" element={<CardsList />} />
        <Route path="/add-recipe" element={<ManageRecipeCard />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route
          path="/edit-recipe/:id"
          element={<ManageRecipeCard actionType={'edit'} />}
        />
        <Route path="/recipe-details/:id" element={<RecipeCard />} />
      </Routes>
    </Box>
  );
};
