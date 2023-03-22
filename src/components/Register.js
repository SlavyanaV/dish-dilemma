import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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
      const response = await fetch('http://localhost:3030/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: registerDataState.email,
          password: registerDataState.password,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      navigate('/');

      localStorage.setItem('accessToken', responseData.accessToken);
      localStorage.setItem('email', responseData.email);
      localStorage.setItem('_id', responseData._id);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <TextField
        name="email"
        id="filled-required"
        label="Email"
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

      <TextField
        name="repassword"
        id="filled-repassword-input"
        label="Repeat password"
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
