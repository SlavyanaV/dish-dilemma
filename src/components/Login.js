import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Box,
  TextField,
  Paper,
  Typography,
  Snackbar,
  Alert,
  AlertTitle,
} from '@mui/material';
import { innerPaper, outerPaper } from '../shared/styles/formsStyles';
import {
  paperHeading,
  mainBoxContainer,
  colors,
  link,
} from '../shared/styles/sharedStyles';
import { login } from '../shared/services/userService';
import { formValidation } from '../shared/validations';
import { useUserContext } from '../hooks/useUserContext';

const initialState = {
  email: '',
  password: '',
};

export const Login = () => {
  const navigate = useNavigate();

  const { onLogin } = useUserContext();

  const [loginDataState, setLoginDataState] = useState(initialState);
  const [errorState, setErrorState] = useState(initialState);
  const [isOpen, setIsOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = (event) => {
    const { name, value } = event.target;

    setLoginDataState({
      ...loginDataState,
      [name]: value,
    });
  };

  const handleOnSubmit = async () => {
    const { errors, hasErrors } = formValidation(loginDataState);

    setErrorState(errors);

    if (!hasErrors) {
      setIsLoading(true);
      try {
        const { accessToken, email, _id } = await login(loginDataState);

        onLogin({ accessToken, email, _id });
        navigate('/my-profile');
        setIsLoading(false);
      } catch (err) {
        setAlertMessage(err.message);
        setIsOpen(true);
        setIsLoading(false);
      }
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
          helperText={errorState.email}
          error={!!errorState.email}
          sx={{ m: 1 }}
          onChange={handleOnChange}
          className={!!errorState.email ? 'input-error' : 'input-success'}
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
          className={!!errorState.password ? 'input-error' : 'input-success'}
        />
        <LoadingButton
          variant="outlined"
          color="inherit"
          sx={{ m: 1 }}
          onClick={handleOnSubmit}
          loading={isLoading}
          loadingPosition="end"
        >
          Login
        </LoadingButton>
      </Box>
      <Typography color={colors.secondary} sx={{ textAlign: 'center' }}>
        <Link to="/register" style={link}>
          Not registered yet?
        </Link>
      </Typography>
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
