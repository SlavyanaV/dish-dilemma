import { ChangeEvent, FC } from 'react';
import { Button, Stack } from '@mui/material';

type Props = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const UploadBtn: FC<Props> = ({ onChange }) => {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Button variant="outlined" component="label" color="inherit">
        Upload
        <input
          hidden
          accept="image/*"
          multiple
          type="file"
          onChange={onChange}
        />
      </Button>
    </Stack>
  );
};
