import {
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { colors, link } from '../shared/styles/sharedStyles';

export const SmallCard = ({ card }) => {
  return (
    <Card sx={{ backgroundColor: colors.light }}>
      <CardMedia
        component="img"
        height="300"
        image={card?.picture}
        alt="Dish picture"
      />
      <CardHeader
        sx={{ textAlign: 'center' }}
        title={card?.title}
        subheader={card?.category}
      />
      <CardActions
        disableSpacing
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        <Link to={`/recipe-details/${card._id}`} style={link}>
          <Button variant="outlined" color="inherit">
            See details
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};
