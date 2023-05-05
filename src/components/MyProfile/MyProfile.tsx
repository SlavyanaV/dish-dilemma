import { FC, useEffect, useState } from 'react';
import {
  Card,
  Paper,
  Box,
  CardContent,
  Typography,
  Grid,
  Stack,
  Alert,
} from '@mui/material';
import { SmallRecipeCard } from '../SmallRecipeCard/SmallRecipeCard';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import InfoIcon from '@mui/icons-material/Info';
import {
  paperHeading,
  mainBoxContainer,
  colors,
  grid,
  flexCenterContainer,
} from '../../shared/styles/sharedStyles';
import { fetchAllRecipesByUserId } from '../../shared/services/recipeService';
import { useUserContext } from '../../hooks/useUserContext';
import { CardType } from '../../shared/types';
import { auth } from '../../config/firebase';
import { AlertMessage } from '../../shared/components/AlertMessage/AlertMessage';
import { Loader } from '../../shared/components/Loader/Loader';

export const MyProfile: FC = () => {
  const [createdOn, setCreatedOn] = useState<string>('');
  const [cardsDataState, setCardsDataState] = useState<CardType[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasFetched, setHasFetched] = useState<boolean>(false);

  const {
    user: { userId, email },
  } = useUserContext();

  dayjs.extend(relativeTime);

  const getUser = async () => {
    setIsLoading(true);

    try {
      setCreatedOn(dayjs(auth.currentUser?.metadata?.creationTime).fromNow());
      setIsLoading(false);
      setHasFetched(true);
    } catch (err: any) {
      setAlertMessage(err.message);
      setIsOpen(true);
      setIsLoading(false);
      setHasFetched(true);
    }
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUserRecipes = async () => {
    setIsLoading(true);

    try {
      const responseData = await fetchAllRecipesByUserId(userId);

      setCardsDataState(responseData);
      setIsLoading(false);
    } catch (err: any) {
      if (err.message !== 'Resource not found') {
        setAlertMessage(err.message);
        setIsOpen(true);
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading || !hasFetched) {
    return <Loader />;
  }

  return (
    <Box sx={flexCenterContainer}>
      <Box sx={{ width: '50%', ...mainBoxContainer }}>
        <Card sx={{ minWidth: 800, backgroundColor: colors.light, mb: 2.5 }}>
          <CardContent>
            <Paper
              elevation={10}
              sx={{ m: '5px 10px 20px 10px', backgroundColor: colors.dark }}
            >
              <Typography variant="h4" sx={paperHeading}>
                My profile
              </Typography>
            </Paper>
            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
              <Box>
                <Typography sx={{ fontSize: 14 }} color={colors.secondary}>
                  Email address:
                </Typography>
                <Typography variant="h5" color={colors.dark}>
                  {email}
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ fontSize: 14 }} color={colors.secondary}>
                  Created:
                </Typography>
                <Typography variant="h5" color={colors.dark}>
                  {createdOn}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
        {cardsDataState.length ? (
          <Grid container sx={grid}>
            {cardsDataState.map((card, index) => (
              <Grid item xs={'auto'} key={index}>
                <SmallRecipeCard card={card} isOwn={true} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert
              severity="info"
              sx={{
                backgroundColor: colors.light,
                color: colors.dark,
              }}
              icon={<InfoIcon sx={{ color: colors.dark }} />}
            >
              Currently there are no recipes added by you
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