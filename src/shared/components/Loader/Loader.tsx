import { Box, CircularProgress } from '@mui/material';
import { flexCenterContainer, loader } from '../../styles/sharedStyles';

export const Loader = () => {
  return (
    <Box sx={flexCenterContainer}>
      <CircularProgress sx={loader} size={100} />
    </Box>
  );
};
