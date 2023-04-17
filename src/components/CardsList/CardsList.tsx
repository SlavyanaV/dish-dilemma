import { useState, useEffect, FC } from 'react';
import {
  Grid,
  Stack,
  Alert,
  Box,
  Snackbar,
  AlertTitle,
  CircularProgress,
} from '@mui/material';
import { SmallCard } from '../SmallCard/SmallCard';
import InfoIcon from '@mui/icons-material/Info';
import {
  mainBoxContainer,
  colors,
  grid,
  loader,
} from '../../shared/styles/sharedStyles';
import { fetchAllRecipes } from '../../shared/services/recipeService';
import { getLikes } from '../../shared/services/likesService';
import { CardType, LikesType } from '../../shared/types';

export const CardsList: FC = () => {
  const [cardsDataState, setCardsDataState] = useState<CardType[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasFetched, setHasFetched] = useState<boolean>(false);
  const [likesData, setLikesData] = useState<LikesType[]>([]);

  const fetchRecipes = async () => {
    setIsLoading(true);

    try {
      const responseData: CardType[] = await fetchAllRecipes();

      setCardsDataState(responseData);
      setIsLoading(false);
      setHasFetched(true);
    } catch (err: any) {
      if (err.message !== 'Resource not found') {
        setAlertMessage(err.message);
        setIsOpen(true);
      }
      setIsLoading(false);
      setHasFetched(true);
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
  }, []);

  if (isLoading || !hasFetched) {
    return <CircularProgress sx={loader} size={100} />;
  }

  return (
    <Box
      sx={{
        width: '50%',
        mt: '50px',
        ...mainBoxContainer,
      }}
    >
      {cardsDataState.length ? (
        <Grid
          container
          sx={{
            mb: '50px',
            ...grid,
          }}
        >
          {cardsDataState.map((card, index) => (
            <Grid item xs={'auto'} key={index}>
              <SmallCard card={card} likesData={likesData} isOwn={false} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert
            severity="info"
            sx={{
              minWidth: 800,
              backgroundColor: colors.light,
              color: colors.dark,
              mt: 1.5,
            }}
            icon={<InfoIcon sx={{ color: colors.dark }} />}
          >
            Currently there are no recipes in database
          </Alert>
        </Stack>
      )}
      <Snackbar
        open={isOpen}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => setIsOpen(false)}
      >
        <Alert
          onClose={() => setIsOpen(false)}
          severity="error"
          variant="filled"
          sx={{ width: '100%', color: colors.light }}
        >
          <AlertTitle>Error</AlertTitle>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};
