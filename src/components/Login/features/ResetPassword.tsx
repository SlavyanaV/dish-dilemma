import { Box, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { ConfirmDialog } from '../../../shared/components/ConfirmDialog/ConfirmDialog';
import { colors } from '../../../shared/styles/sharedStyles';
import { auth } from '../../../config/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { AlertMessage } from '../../../shared/components/AlertMessage/AlertMessage';

export const ResetPassword = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isResetLoading, setIsResetLoading] = useState<boolean>(false);
  const [resetEmail, setResetEmail] = useState<string>('');
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');

  const handleOnResetPass = async () => {
    setIsResetLoading(true);

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setIsDialogOpen(false);
      setIsResetLoading(false);
      setAlertMessage(`An email has been sent to ${resetEmail}!`);
      setIsAlertOpen(true);
    } catch (err: any) {
      setIsResetLoading(false);
      setAlertMessage(err.code);
      setIsAlertOpen(true);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'end' }}>
      <Typography
        color={colors.secondary}
        sx={{ textAlign: 'right' }}
        onClick={() => setIsDialogOpen(true)}
        className={'forgot-pass'}
      >
        Forgot your password?
      </Typography>
      <ConfirmDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        handleOnConfirm={handleOnResetPass}
        isLoading={isResetLoading}
        title={'Please enter your email'}
        confirmBtn={'Reset password'}
        closeBtn={'Cancel'}
        content={
          <TextField
            name="email"
            id="filled-required"
            label="Email"
            variant="outlined"
            sx={{ m: 2 }}
            className={'forgot-pass-input'}
            onChange={(e) => setResetEmail(e.target.value)}
          />
        }
      />
      <AlertMessage
        isOpen={isAlertOpen}
        setIsOpen={setIsAlertOpen}
        severity={
          alertMessage.startsWith('An email has been sent')
            ? 'success'
            : 'error'
        }
        alertTitle={
          alertMessage.startsWith('An email has been sent')
            ? 'Success'
            : 'Error'
        }
        alertMessage={alertMessage}
      />
    </Box>
  );
};
