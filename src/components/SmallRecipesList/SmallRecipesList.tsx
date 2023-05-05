import { useState, useEffect, FC, ChangeEvent } from 'react';
import { Grid, Stack, Alert, Box, Pagination } from '@mui/material';
import { SmallRecipeCard } from '../SmallRecipeCard/SmallRecipeCard';
import InfoIcon from '@mui/icons-material/Info';
import {
  mainBoxContainer,
  colors,
  grid,
  flexCenterContainer,
} from '../../shared/styles/sharedStyles';
import { getLikes } from '../../shared/services/likesService';
import { CardType, LikesType } from '../../shared/types';
import { fetchAllRecipes } from '../../shared/services/recipeService';
import { AlertMessage } from '../../shared/components/AlertMessage/AlertMessage';
import { Loader } from '../../shared/components/Loader/Loader';
import { usePagination } from '../../hooks/usePagination';

const RECIPES_PER_PAGE = 9;

export const SmallRecipesList: FC = () => {
  const [cardsDataState, setCardsDataState] = useState<CardType[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [likesData, setLikesData] = useState<LikesType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const currentPageData = usePagination(
    cardsDataState,
    RECIPES_PER_PAGE,
    currentPage
  );

  const count = Math.ceil(cardsDataState.length / RECIPES_PER_PAGE);

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

  const handleOnPageChange = (_: ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

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
        {cardsDataState.length ? (
          <>
            <Grid
              container
              sx={{
                mb: 2.5,
                ...grid,
              }}
            >
              {currentPageData.map((card, index) => (
                <Grid item xs={'auto'} key={index}>
                  <SmallRecipeCard
                    card={card}
                    likesData={likesData}
                    isOwn={false}
                  />
                </Grid>
              ))}
            </Grid>
            <Pagination
              sx={{ display: 'flex', justifyContent: 'center', mb: 2.5 }}
              count={count}
              size="large"
              page={currentPage}
              shape={'rounded'}
              variant="outlined"
              onChange={handleOnPageChange}
            />
          </>
        ) : (
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert
              severity="info"
              sx={{
                minWidth: 800,
                backgroundColor: colors.light,
                color: colors.dark,
              }}
              icon={<InfoIcon sx={{ color: colors.dark }} />}
            >
              Currently there are no recipes in database
            </Alert>
          </Stack>
        )}
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
