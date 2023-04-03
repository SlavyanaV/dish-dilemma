import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Paper,
  Typography,
  Snackbar,
  Alert,
  AlertTitle,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { innerPaper, outerPaper } from '../shared/styles/formsStyles';
import {
  paperHeading,
  mainBoxContainer,
  colors,
} from '../shared/styles/sharedStyles';
import { register } from '../shared/services/userService';
import { formValidation } from '../shared/validations';

const initialState = {
  email: '',
  password: '',
  repassword: '',
};

export const Register = () => {
  const navigate = useNavigate();

  const [registerDataState, setRegisterDataState] = useState(initialState);
  const [errorState, setErrorState] = useState(initialState);
  const [isOpen, setIsOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleOnChange = (event) => {
    const { name, value } = event.target;

    setRegisterDataState({
      ...registerDataState,
      [name]: value,
    });
  };

  const handleOnSubmit = async () => {
    const { errors, hasErrors } = formValidation(registerDataState);

    setErrorState(errors);

    if (!hasErrors) {
      try {
        const responseData = await register(registerDataState);

        navigate('/');

        localStorage.setItem('accessToken', responseData.accessToken);
        localStorage.setItem('email', responseData.email);
        localStorage.setItem('_id', responseData._id);
      } catch (err) {
        setAlertMessage(err.message);
        setIsOpen(true);
      }
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
          helperText={errorState.email}
          error={!!errorState.email}
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
          helperText={errorState.password}
          error={!!errorState.password}
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
          helperText={errorState.repassword}
          error={!!errorState.repassword}
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
    </Paper>
  );
};
