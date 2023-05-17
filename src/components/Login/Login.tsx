import { ChangeEvent, FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Paper, Typography, Stack } from '@mui/material';
import { innerPaper, outerPaper } from '../../shared/styles/formsStyles';
import {
  paperHeading,
  colors,
  link,
  flexCenterContainer,
} from '../../shared/styles/sharedStyles';
import { formValidation } from '../../shared/validations';
import { LoginType } from '../../shared/types';
import { auth } from '../../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { AlertMessage } from '../../shared/components/AlertMessage/AlertMessage';
import { ResetPassword } from './features/ResetPassword';
import { FormInput } from '../../shared/components/FormInput/FormInput';

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
    <Box sx={flexCenterContainer}>
      <Paper variant="outlined" sx={outerPaper} className='form-container'>
          <Stack spacing={2} component='form' autoComplete='off'>
            <Paper elevation={10} sx={innerPaper}>
              <Typography variant="h4" sx={paperHeading}>
                Log into your profile
              </Typography>
            </Paper>
            <FormInput
              name="email"
              label="Email"
              helperText={errorState.email}
              placeholder="Enter your email"
              error={!!errorState.email}
              onChange={handleOnChange}
              className={!!errorState.email ? 'input-error' : 'input-success'}
            />
            <FormInput
              name="password"
              label="Password"
              type="password"
              helperText={errorState.password}
              placeholder="Enter your password"
              error={!!errorState.password}
              onChange={handleOnChange}
              className={
                !!errorState.password ? 'input-error' : 'input-success'
              }
            />
            <ResetPassword />
            <LoadingButton
              variant="outlined"
              color="inherit"
              sx={{ p: 1.5 }}
              onClick={handleOnSubmit}
              loading={isLoading}
              loadingPosition="end"
            >
              Login
            </LoadingButton>
            <Typography color={colors.secondary} sx={{ textAlign: 'center' }}>
              <Link to="/register" style={link}>
                Not registered yet?
              </Link>
            </Typography>
          </Stack>
        <AlertMessage
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          severity={'error'}
          alertTitle={'Error'}
          alertMessage={alertMessage}
        />
      </Paper>
    </Box>
  );
};
