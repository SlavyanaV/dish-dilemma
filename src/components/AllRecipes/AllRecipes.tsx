import { useState, useEffect, FC } from 'react';
import { Box } from '@mui/material';
import {
  mainBoxContainer,
  flexCenterContainer,
} from '../../shared/styles/sharedStyles';
import { getLikes } from '../../shared/services/likesService';
import { CardType, LikesType } from '../../shared/types';
import { fetchAllRecipes } from '../../shared/services/recipeService';
import { AlertMessage } from '../../shared/components/AlertMessage/AlertMessage';
import { Loader } from '../../shared/components/Loader/Loader';
import { SmallRecipesList } from '../../shared/components/SmallRecipesList/SmallRecipesList';

export const AllRecipes: FC = () => {
  const [cardsDataState, setCardsDataState] = useState<CardType[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [likesData, setLikesData] = useState<LikesType[]>([]);

  const fetchRecipes = async () => {
    setIsLoading(true);

    try {
      const recipes = await fetchAllRecipes();

      setCardsDataState(recipes);
      setIsLoading(false);
    } catch (err: any) {
      if (err.message !== 'Resource not found') {
        setAlertMessage(err.message);
        setIsOpen(true);
      }
      setIsLoading(false);
    }
  };

  const fetchLikes = async () => {
    try {
      const likesData: LikesType[] = await getLikes();
      setLikesData(likesData);
    } catch (err: any) {
      setAlertMessage(err.message);
      setIsOpen(true);
    }
  };

  useEffect(() => {
    fetchRecipes();
    fetchLikes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box sx={flexCenterContainer}>
      <Box
        sx={{
          width: '50%',
          ...mainBoxContainer,
        }}
      >
        <SmallRecipesList
          cardsDataState={cardsDataState}
          likesData={likesData}
        />
        <AlertMessage
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          severity={'error'}
          alertTitle={'Error'}
          alertMessage={alertMessage}
        />
      </Box>
    </Box>
  );
};
