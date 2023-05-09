import { TextField, TextFieldProps } from '@mui/material';
import { FC } from 'react';

export const FormInput: FC<TextFieldProps> = ({
  name,
  label,
  value,
  type = 'text',
  disabled,
  helperText,
  placeholder,
  error,
  onChange,
  className,
}) => {
  return (
    <TextField
      name={name}
      label={label}
      value={value}
      type={type}
      variant="outlined"
      size="small"
      disabled={disabled}
      helperText={helperText}
      placeholder={placeholder}
      error={error}
      onChange={onChange}
      className={className}
      sx={{width: '100%'}}
    />
  );
};
