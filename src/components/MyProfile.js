import React, { useEffect, useState } from 'react';
import { Card, Paper, Box, CardContent, Typography } from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

export const MyProfile = () => {
  const userEmail = localStorage.getItem('email');
  const accessToken = localStorage.getItem('accessToken');

  dayjs.extend(relativeTime);

  const [createdOn, setCreatedOn] = useState('');

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

  return (
    <Card sx={{ minWidth: 800, mt: '50px', backgroundColor: '#E4BF89' }}>
      <CardContent>
        <Paper
          elevation={10}
          sx={{ margin: '5px 10px 20px 10px', backgroundColor: '#394110' }}
        >
          <Typography
            variant="h4"
            sx={{ textAlign: 'center', pb: 1.5, pt: 1.5, color: '#E4BF89' }}
          >
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
  );
};
