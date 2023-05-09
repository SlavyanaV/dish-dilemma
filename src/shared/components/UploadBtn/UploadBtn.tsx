import { ChangeEvent, FC } from 'react';
import { Button, Stack } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { FormInput } from '../FormInput/FormInput';

type Props = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  picture: string;
  error: string;
};

export const UploadBtn: FC<Props> = ({ onChange, picture, error }) => {
  return (
    <Stack direction="column" spacing={2}>
      <Button
        variant="outlined"
        component="label"
        color="inherit"
        className="upload-btn"
        endIcon={<UploadFileIcon />}
        sx={{ width: '50%', p: 1 }}
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
      <FormInput
        disabled
        name="picture"
        value={picture}
        label="Picture name"
        helperText={error}
        error={!!error}
        className={!!error ? 'input-error' : 'input-success'}
      />
    </Stack>
  );
};
