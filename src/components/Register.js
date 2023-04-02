import React, { useState } from 'react';
import { Box, Button, TextField, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { innerPaper, outerPaper } from '../shared/styles/formsStyles';
import { paperHeading, mainBoxContainer } from '../shared/styles/sharedStyles';
import { register } from '../shared/services/userService';

export const Register = () => {
  const navigate = useNavigate();

  const [registerDataState, setRegisterDataState] = useState({
    email: '',
    password: '',
    repassword: '',
  });

  const handleOnChange = (event) => {
    const { name, value } = event.target;

    setRegisterDataState({
      ...registerDataState,
      [name]: value,
    });
  };

  const handleOnSubmit = async () => {
    try {
      const responseData = await register(registerDataState);

      navigate('/');

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
            Register your profile
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
        <TextField
          name="repassword"
          id="filled-repassword-input"
          label="Repeat password"
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
          Register
        </Button>
      </Box>
    </Paper>
  );
};
