import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Paper, Typography } from '@mui/material';

export const Login = () => {
  const [loginDataState, setLoginDataState] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleOnChange = (event) => {
    const { name, value } = event.target;

    setLoginDataState({
      ...loginDataState,
      [name]: value,
    });
  };

  const handleOnSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3030/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginDataState),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      navigate('/my-profile');

      localStorage.setItem('accessToken', responseData.accessToken);
      localStorage.setItem('email', responseData.email);
      localStorage.setItem('_id', responseData._id);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        minWidth: 500,
        mt: '50px',
        padding: '20px',
        backgroundColor: '#E4BF89',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Paper
          elevation={10}
          sx={{ margin: '5px 10px 20px 10px', backgroundColor: '#394110' }}
        >
          <Typography
            variant="h4"
            sx={{ textAlign: 'center', pb: 1.5, pt: 1.5, color: '#E4BF89' }}
          >
            Log into your profile
          </Typography>
        </Paper>
        <TextField
          name="email"
          id="filled-required"
          label="Email"
          variant="outlined"
          color="success"
          helperText="*Mandatory field!"
          sx={{ m: 1 }}
          onChange={handleOnChange}
        />

        <TextField
          name="password"
          id="filled-password-input"
          label="Password"
          type="password"
          variant="outlined"
          color="success"
          autoComplete="current-password"
          helperText="*Mandatory field!"
          sx={{ m: 1 }}
          onChange={handleOnChange}
        />
        <Button
          variant="outlined"
          color="inherit"
          sx={{ margin: 1 }}
          onClick={handleOnSubmit}
        >
          Submit
        </Button>
      </Box>
    </Paper>
  );
};
