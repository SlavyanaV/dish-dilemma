import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Button,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import { Link } from 'react-router-dom';

export const RecipeCard = ({ cardType }) => {
  const [expanded, setExpanded] = useState(false);
  const [cardDataState, setCardDataState] = useState({});

  const accessToken = localStorage.getItem('accessToken');
  const userId = localStorage.getItem('_id');

  const navigate = useNavigate();

  const linkStyles = { color: 'inherit', textDecoration: 'none' };

  const { id } = useParams();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const getCard = async () => {
    try {
      const response = await fetch(
        `http://localhost:3030/data/all-recipes/${id}`
      );
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setCardDataState(responseData);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    if (cardType !== 'main') {
      getCard();
    } else {
      setCardDataState({});
    }
  }, [cardType]);

  const handleOnDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:3030/data/all-recipes/${cardDataState._id}`,
        {
          method: 'DELETE',
          headers: { 'X-Authorization': accessToken },
        }
      );

      if (!response.ok) {
        throw new Error();
      }

      navigate('/all-recipes');
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Box sx={{ width: 700, mt: '50px' }}>
      <Card>
        <CardHeader
          sx={{ textAlign: 'center' }}
          title={cardDataState?.title}
          subheader={cardDataState?.category}
        />
        <CardMedia
          component="img"
          height={'500'}
          image={cardDataState?.picture}
          alt="Dish picture"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            If you want to try this recipe, expand the details to see
            instructions.
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {cardType === 'main' ? (
            <Box>
              <Button color="inherit">See another recipe</Button>
              <Link
                to="/all-recipes"
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                <Button color="inherit">See all recipes</Button>
              </Link>
            </Box>
          ) : userId === cardDataState?._ownerId ? (
            <Box>
              <Link
                to={`/edit-recipe/${cardDataState?._id}`}
                style={linkStyles}
              >
                <Button color="inherit">Edit</Button>
              </Link>
              <Button color="inherit" onClick={handleOnDelete}>
                Delete
              </Button>
            </Box>
          ) : (
            <></>
          )}
          <IconButton
            sx={{ marginLeft: 'auto' }}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon/>
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent sx={{ maxWidth: 650 }}>
            <Typography paragraph>Instructions:</Typography>
            <Typography
              paragraph
              sx={{ textAlign: 'justify', overflowWrap: 'anywhere' }}
            >
              {cardDataState?.description}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Box>
  );
};

// Mock data for recipe card
const meals = [
  {
    idMeal: '53039',
    strMeal: 'Piri-piri chicken and slaw',
    strArea: 'Portuguese',
    strInstructions:
      'STEP 1\r\n\r\nWhizz together all of the marinade ingredients in a small food processor. Rub the marinade onto the chicken and leave for 1 hour at room temperature.\r\n\r\nSTEP 2\r\n\r\nHeat the oven to 190C/fan 170C/gas 5. Put the chicken in a roasting tray and cook for 1 hour 20 minutes. Rest under loose foil for 20 minutes. While the chicken is resting, mix together the slaw ingredients and season. Serve the chicken with slaw, fries and condiments.',
    strMealThumb:
      'https://www.themealdb.com/images/media/meals/hglsbl1614346998.jpg',
    strIngredient1: 'Chicken',
    strIngredient2: 'Red Chilli',
    strIngredient3: 'Garlic',
    strIngredient4: 'Ginger',
    strIngredient5: 'Dried Oregano',
    strIngredient6: 'Coriander',
    strIngredient7: 'Paprika',
    strIngredient8: 'Red Wine Vinegar',
    strIngredient9: 'Oil',
    strIngredient10: 'Red Onions',
    strIngredient11: 'Carrots',
    strIngredient12: 'Beetroot',
    strIngredient13: 'Cabbage',
    strIngredient14: 'Mayonnaise',
    strIngredient15: 'Greek Yogurt',
    strIngredient16: 'Red Wine Vinegar',
    strIngredient17: 'Cumin Seeds',
    strIngredient18: '',
    strIngredient19: '',
    strIngredient20: '',
    strMeasure1: '1.5kg',
    strMeasure2: '3 chopped',
    strMeasure3: '2 cloves',
    strMeasure4: '1 tsp ',
    strMeasure5: '1 tsp ',
    strMeasure6: '1 tsp ',
    strMeasure7: '1 tsp ',
    strMeasure8: '2 tbs',
    strMeasure9: '2 tbs',
    strMeasure10: '1 sliced',
    strMeasure11: '2',
    strMeasure12: '1',
    strMeasure13: '4 leaves',
    strMeasure14: '2 tbs',
    strMeasure15: '2 tbs',
    strMeasure16: '2 tbs',
    strMeasure17: '1 tsp ',
    strMeasure18: ' ',
    strMeasure19: ' ',
    strMeasure20: ' ',
    strSource:
      'https://www.olivemagazine.com/recipes/family/piri-piri-chicken-and-winter-slaw/',
  },
];
