import { ChangeEvent, FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, TextField, Paper, Typography } from '@mui/material';
import { innerPaper, outerPaper } from '../../shared/styles/formsStyles';
import {
  paperHeading,
  mainBoxContainer,
  colors,
  link,
} from '../../shared/styles/sharedStyles';
import { formValidation } from '../../shared/validations';
import { LoginType } from '../../shared/types';
import { auth } from '../../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { AlertMessage } from '../../shared/components/AlertMessage/AlertMessage';
import { ResetPassword } from './features/ResetPassword';

const initialState = {
  email: '',
  password: '',
};

export const Login: FC = () => {
  const navigate = useNavigate();

  const [loginDataState, setLoginDataState] = useState<LoginType>(initialState);
  const [errorState, setErrorState] =
    useState<Record<string, string>>(initialState);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
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
        await signInWithEmailAndPassword(
          auth,
          loginDataState.email,
          loginDataState.password
        );

        navigate('/my-profile');
        setIsLoading(false);
      } catch (err: any) {
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
          autoComplete="current-password"
          helperText={errorState.password}
          error={!!errorState.password}
          sx={{ m: 1 }}
          onChange={handleOnChange}
          className={!!errorState.password ? 'input-error' : 'input-success'}
        />
        <ResetPassword />
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
      <AlertMessage
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        severity={'error'}
        alertTitle={'Error'}
        alertMessage={alertMessage}
      />
    </Paper>
  );
};
