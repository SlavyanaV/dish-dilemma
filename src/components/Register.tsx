import { ChangeEvent, FC, useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, TextField, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { innerPaper, outerPaper } from '../shared/styles/formsStyles';
import { paperHeading, mainBoxContainer } from '../shared/styles/sharedStyles';
import { formValidation } from '../shared/validations';
import { RegisterType } from '../shared/types';
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { AlertMessage } from '../shared/components/AlertMessage/AlertMessage';

const initialState = {
  email: '',
  password: '',
  repassword: '',
};

export const Register: FC = () => {
  const navigate = useNavigate();

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
        await createUserWithEmailAndPassword(
          auth,
          registerDataState.email,
          registerDataState.password
        );

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
