import { ChangeEvent, FC } from 'react';
import { Button, Stack, TextField } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';

type Props = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  picture: string;
  error: string;
};

export const UploadBtn: FC<Props> = ({ onChange, picture, error }) => {
  return (
    <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 2.5 }}>
      <Button
        variant="outlined"
        component="label"
        color="inherit"
        className="upload-btn"
        endIcon={<UploadFileIcon />}
        sx={{ width: '35%', p: 1 }}
      >
        Upload Picture
        <input
          hidden
          accept="image/*"
          multiple
          type="file"
          onChange={onChange}
        />
      </Button>
      <TextField
        disabled
        sx={{ width: '65%' }}
        name="picture"
        value={picture}
        id="filled-multiline-flexible"
        label="Picture name"
        variant="outlined"
        helperText={error}
        error={!!error}
        className={!!error ? 'input-error' : 'input-success'}
      />
    </Stack>
  );
};
