import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Paper, Typography } from '@mui/material';
import { innerPaper, outerPaper } from '../shared/styles/formsStyles';
import { paperHeading, mainBoxContainer } from '../shared/styles/sharedStyles';
import { login } from '../shared/services/userService';

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
      const responseData = await login(loginDataState);

      navigate('/my-profile');

      localStorage.setItem('accessToken', responseData.accessToken);
      localStorage.setItem('email', responseData.email);
      localStorage.setItem('_id', responseData._id);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Paper variant="outlined" sx={outerPaper}>
      <Box sx={mainBoxContainer}>
        <Paper elevation={10} sx={innerPaper}>
          <Typography variant="h4" sx={paperHeading}>
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
          sx={{ m: 1 }}
          onClick={handleOnSubmit}
        >
          Login
        </Button>
      </Box>
    </Paper>
  );
};
