import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import { Login } from './Login/Login';
import { RecipeCard } from './RecipeCard/RecipeCard';
import { Register } from './Register/Register';
import { AllRecipes } from './AllRecipes/AllRecipes';
import { ManageRecipeCard } from './ManageRecipeCard/ManageRecipeCard';
import { MyProfile } from './MyProfile/MyProfile';
import { PrivateRoutes } from './RoutesGuards/PrivateRoutes';
import { PublicRoutes } from './RoutesGuards/PublicRoutes';
import { NotFound } from './NotFound/NotFound';
import { FC } from 'react';
import backgroundImg from '../images/background-image.png';

export const ContentContainer: FC = () => {
  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 3.5rem)',
        background: `url(${backgroundImg}) #39411099`,
        backgroundSize: 'cover',
        backgroundBlendMode: 'multiply',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        paddingTop: '6%',
        paddingBottom: 'calc(6% - 3.5rem)'
      }}
    >
      <Routes>
        <Route path="/" element={<RecipeCard cardType={'main'} />} />
        <Route path="/all-recipes" element={<AllRecipes />} />
        <Route path="/recipe-details/:id" element={<RecipeCard />} />
        <Route element={<PublicRoutes />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/add-recipe" element={<ManageRecipeCard />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route
            path="/edit-recipe/:id"
            element={<ManageRecipeCard actionType={'edit'} />}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Box>
  );
};
