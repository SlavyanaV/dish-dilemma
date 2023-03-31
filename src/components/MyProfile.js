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

export const MyProfile = () => {
  const [createdOn, setCreatedOn] = useState('');
  const [cardsDataState, setCardsDataState] = useState([]);

  const userEmail = localStorage.getItem('email');
  const userId = localStorage.getItem('_id');
  const accessToken = localStorage.getItem('accessToken');

  dayjs.extend(relativeTime);

  const getUser = async () => {
    try {
      const response = await fetch('http://localhost:3030/users/me', {
        method: 'GET',
        headers: {
          'X-Authorization': accessToken,
        },
      });
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setCreatedOn(dayjs(responseData._createdOn).fromNow());
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const fetchUserCards = async () => {
    try {
      const response = await fetch(
        `http://localhost:3030/data/all-recipes?where=_ownerId%3D%22${userId}%22`
      );
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setCardsDataState(responseData);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    fetchUserCards();
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
              <Typography sx={{ fontSize: 14 }} color="text.secondary">
                Email address:
              </Typography>
              <Typography variant="h5">{userEmail}</Typography>
            </Box>
            <Box>
              <Typography sx={{ fontSize: 14 }} color="text.secondary">
                Created:
              </Typography>
              <Typography variant="h5">{createdOn}</Typography>
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
              color: 'black',
              mt: 1.5,
            }}
            icon={<InfoIcon sx={{ color: colors.dark }} />}
          >
            Currently there are no recipes added by you
          </Alert>
        </Stack>
      )}
    </Box>
  );
};
