import { Paper, Typography, Card, CardMedia } from '@mui/material';
import { innerPaper, outerPaper } from '../../shared/styles/formsStyles';
import { paperHeading } from '../../shared/styles/sharedStyles';
import dirtyDish from '../../images/dirty-plate.jpg';
import { FC } from 'react';

export const NotFound: FC = () => {
  return (
    <Paper variant="outlined" sx={outerPaper}>
      <Paper elevation={10} sx={innerPaper}>
        <Typography variant="h4" sx={paperHeading}>
          Page not found
        </Typography>
      </Paper>
      <Card sx={{ m: '5px 10px 20px 10px' }}>
        <CardMedia
          component="img"
          image={dirtyDish}
          alt="Dish picture"
          height={'400'}
        />
      </Card>
    </Paper>
  );
};
