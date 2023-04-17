import { ChangeEvent, FC, useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { innerPaper, outerPaper } from '../shared/styles/formsStyles';
import {
  paperHeading,
  mainBoxContainer,
  colors,
} from '../shared/styles/sharedStyles';
import { register } from '../shared/services/userService';
import { formValidation } from '../shared/validations';
import { useUserContext } from '../hooks/useUserContext';
import { RegisterType } from '../shared/types';

const initialState = {
  email: '',
  password: '',
  repassword: '',
};

export const Register: FC = () => {
  const navigate = useNavigate();

  const { onLogin } = useUserContext();

  const [registerDataState, setRegisterDataState] =
    useState<RegisterType>(initialState);
  const [errorState, setErrorState] =
    useState<Record<string, string>>(initialState);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
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
      setIsLoading(true);
      try {
        const { accessToken, email, _id } = await register(registerDataState);

        onLogin({ accessToken, email, _id });
        navigate('/');
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
            Register your profile
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
        <TextField
          name="repassword"
          id="filled-repassword-input"
          label="Repeat password"
          type="password"
          variant="outlined"
          autoComplete="current-password"
          helperText={errorState.repassword}
          error={!!errorState.repassword}
          sx={{ m: 1 }}
          onChange={handleOnChange}
          className={!!errorState.repassword ? 'input-error' : 'input-success'}
        />
        <LoadingButton
          variant="outlined"
          color="inherit"
          sx={{ m: 1 }}
          onClick={handleOnSubmit}
          loading={isLoading}
          loadingPosition="end"
        >
          Register
        </LoadingButton>
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
