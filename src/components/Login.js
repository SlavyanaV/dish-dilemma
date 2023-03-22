import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField } from '@mui/material';

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
        throw new Error(response.message);
      }

      navigate('/');

      localStorage.setItem('accessToken', responseData.accessToken);
      localStorage.setItem('username', responseData.username);
      localStorage.setItem('_id', responseData._id);
    } catch (err) {
      alert('Failed!');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <TextField
        name="email"
        id="filled-required"
        label="Username"
        variant="filled"
        helperText="*Mandatory field!"
        sx={{ m: 1, width: '25ch' }}
        onChange={handleOnChange}
      />

      <TextField
        name="password"
        id="filled-password-input"
        label="Password"
        type="password"
        variant="filled"
        autoComplete="current-password"
        helperText="*Mandatory field!"
        sx={{ m: 1, width: '25ch' }}
        onChange={handleOnChange}
      />

      <Button color="inherit" onClick={handleOnSubmit}>
        Submit
      </Button>
    </Box>
  );
};
