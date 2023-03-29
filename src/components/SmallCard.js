import {
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';

export const SmallCard = ({ card }) => {
  const linkStyles = { color: 'inherit', textDecoration: 'none' };

  return (
    <Card sx={{ backgroundColor: '#E4BF89' }}>
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
        <Link to={`/recipe-details/${card._id}`} style={linkStyles}>
          <Button variant="outlined" color="inherit">
            See details
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};
