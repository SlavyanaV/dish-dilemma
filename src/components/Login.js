import * as React from 'react';
import {
  Box,
  Button,
  IconButton,
  FilledInput,
  InputLabel,
  InputAdornment,
  FormHelperText,
  FormControl,
  TextField,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <TextField
        label="Enter username"
        id="filled-start-adornment"
        sx={{ m: 1, width: '25ch' }}
        variant="filled"
        helperText="*Mandatory field!"
      />
      <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
        <InputLabel htmlFor="filled-adornment-password">
          Enter password
        </InputLabel>
        <FilledInput
          id="filled-adornment-password"
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        <FormHelperText id="filled-adornment-password">
          *Mandatory field!
        </FormHelperText>
      </FormControl>
      <Button color="inherit">Submit</Button>
    </Box>
  );
};
