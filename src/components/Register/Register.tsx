import { ChangeEvent, FC, useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Paper, Typography, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { innerPaper, outerPaper } from '../../shared/styles/formsStyles';
import {
  paperHeading,
  flexCenterContainer,
} from '../../shared/styles/sharedStyles';
import { formValidation } from '../../shared/validations';
import { RegisterType } from '../../shared/types';
import { auth } from '../../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { AlertMessage } from '../../shared/components/AlertMessage/AlertMessage';
import { FormInput } from '../../shared/components/FormInput/FormInput';

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
    <Box sx={flexCenterContainer}>
      <Paper variant="outlined" sx={outerPaper} className='form-container'>
        <Stack spacing={2} component="form" autoComplete="off">
          <Paper elevation={10} sx={innerPaper}>
            <Typography variant="h4" sx={paperHeading}>
              Register your profile
            </Typography>
          </Paper>
          <FormInput
            name="email"
            label="Email"
            placeholder="Enter an email"
            helperText={errorState.email}
            error={!!errorState.email}
            onChange={handleOnChange}
            className={!!errorState.email ? 'input-error' : 'input-success'}
          />
          <FormInput
            name="password"
            label="Password"
            type="password"
            placeholder="Enter a password"
            helperText={errorState.password}
            error={!!errorState.password}
            onChange={handleOnChange}
            className={!!errorState.password ? 'input-error' : 'input-success'}
          />
          <FormInput
            name="repassword"
            label="Repeat password"
            type="password"
            placeholder="Repeat the password"
            helperText={errorState.repassword}
            error={!!errorState.repassword}
            onChange={handleOnChange}
            className={
              !!errorState.repassword ? 'input-error' : 'input-success'
            }
          />
          <LoadingButton
            variant="outlined"
            color="inherit"
            sx={{ m: 1, p: 1.5 }}
            onClick={handleOnSubmit}
            loading={isLoading}
            loadingPosition="end"
          >
            Register
          </LoadingButton>
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
