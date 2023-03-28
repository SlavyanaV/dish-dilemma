import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { CardActions } from '@mui/material';
import { Button } from '@mui/material';
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
    <Card sx={{ minWidth: 800 }}>
      <CardContent>
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 1.5 }}>
          My profile
        </Typography>
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
      <CardActions>
        <Button onClick={getUser} sx={{ m: 1 }} color="inherit" fullWidth>
          Test
        </Button>
      </CardActions>
    </Card>
  );
};
