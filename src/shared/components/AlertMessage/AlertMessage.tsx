import { Alert, AlertColor, AlertTitle, Snackbar } from '@mui/material';
import { colors } from '../../styles/sharedStyles';
import { FC } from 'react';

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  severity: AlertColor;
  alertTitle: string;
  alertMessage: string;
};

export const AlertMessage: FC<Props> = ({
  isOpen,
  setIsOpen,
  severity,
  alertTitle,
  alertMessage,
}) => {
  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={4000}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      onClose={() => setIsOpen(false)}
    >
      <Alert
        onClose={() => setIsOpen(false)}
        severity={severity}
        variant="filled"
        sx={{ width: '100%', color: colors.light }}
      >
        <AlertTitle>{alertTitle}</AlertTitle>
        {alertMessage}
      </Alert>
    </Snackbar>
  );
};
