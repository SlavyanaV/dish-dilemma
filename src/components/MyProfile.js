import React, { useEffect, useState } from 'react';
import {
  Card,
  Paper,
  Box,
  CardContent,
  Typography,
  Grid,
  Stack,
  Alert,
  AlertTitle,
  Snackbar,
} from '@mui/material';
import { SmallCard } from './SmallCard';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import InfoIcon from '@mui/icons-material/Info';
import {
  paperHeading,
  mainBoxContainer,
  colors,
  grid,
} from '../shared/styles/sharedStyles';
import { getUserDetails } from '../shared/services/userService';
import { fetchAllRecipesByUserId } from '../shared/services/recipeService';
import { useUserContext } from '../hooks/useUserContext';

export const MyProfile = () => {
  const [createdOn, setCreatedOn] = useState('');
  const [cardsDataState, setCardsDataState] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const {
    user: { accessToken, _id, email },
  } = useUserContext();

  dayjs.extend(relativeTime);

  const getUser = async () => {
    try {
      const responseData = await getUserDetails(accessToken);

      setCreatedOn(dayjs(responseData._createdOn).fromNow());
    } catch (err) {
      setAlertMessage(err.message);
      setIsOpen(true);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const getUserRecipes = async () => {
    try {
      const responseData = await fetchAllRecipesByUserId(_id);

      setCardsDataState(responseData);
    } catch (err) {
      setAlertMessage(err.message);
      setIsOpen(true);
    }
  };

  useEffect(() => {
    getUserRecipes();
  }, []);

  return (
    <Box sx={{ width: '50%', ...mainBoxContainer }}>
      <Card sx={{ minWidth: 800, mt: '80px', backgroundColor: colors.light }}>
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
        <Grid
          container
          sx={{
            m: '20px 0',
            ...grid,
          }}
        >
          {cardsDataState.map((card, index) => (
            <Grid item xs={'auto'} key={index}>
              <SmallCard card={card} />
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
              mt: 1.5,
            }}
            icon={<InfoIcon sx={{ color: colors.dark }} />}
          >
            Currently there are no recipes added by you
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
