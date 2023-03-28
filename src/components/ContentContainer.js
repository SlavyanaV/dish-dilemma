import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import { Login } from './Login';
import { RecipeCard } from './RecipeCard';
import { Register } from './Register';
import { CardsList } from './CardsList';
import { AddRecipeCard } from './AddRecipeCard';
import { MyProfile } from './MyProfile';

export const ContentContainer = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Routes>
        <Route path="/" element={<RecipeCard cardType={'main'} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/all-recipes" element={<CardsList />} />
        <Route path="/add-recipe" element={<AddRecipeCard />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route
          path="/edit-recipe/:id"
          element={<AddRecipeCard actionType={'edit'} />}
        />
        <Route path="/recipe-details/:id" element={<RecipeCard />} />
      </Routes>
    </Box>
  );
};
