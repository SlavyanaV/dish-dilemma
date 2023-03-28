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
        // backgroundImage:
        //   'url("https://i.ibb.co/s1yNGV6/Psychozub-Realistic-wooden-kitchen-board-with-kitchen-utensils-f6c72a8a-d4c0-4be8-9e3b-aca73ea1dff6.png")',

        // minHeight: '100vh',
        // backgroundPosition: 'center',
        // backgroundRepeat: 'no-repeat',
        // backgroundSize: 'cover',
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
        <Route path="/card-details/:id" element={<RecipeCard />} />
      </Routes>
    </Box>
  );
};
