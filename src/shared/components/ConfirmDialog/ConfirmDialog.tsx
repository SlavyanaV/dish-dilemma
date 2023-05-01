import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { FC, ReactNode } from 'react';

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleOnConfirm: () => void;
  isLoading: boolean;
  title: string;
  confirmBtn: string;
  closeBtn: string;
  content?: ReactNode;
};

export const ConfirmDialog: FC<Props> = ({
  isOpen,
  setIsOpen,
  handleOnConfirm,
  isLoading,
  title,
  confirmBtn,
  closeBtn,
  content,
}) => {
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      {content}
      <DialogActions>
        <LoadingButton
          variant="outlined"
          color="inherit"
          sx={{ m: 1, width: '100%' }}
          onClick={handleOnConfirm}
          autoFocus
          loading={isLoading}
          loadingPosition="end"
        >
          {confirmBtn}
        </LoadingButton>
        <Button
          variant="outlined"
          color="inherit"
          sx={{ m: 1, width: '100%' }}
          onClick={() => setIsOpen(false)}
        >
          {closeBtn}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
