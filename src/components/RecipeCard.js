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
  Paper,
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
      setCardDataState({});
    }
  };

  const getRandomCard = async () => {
    try {
      const response = await fetch(
        'https://themealdb.com/api/json/v1/1/random.php'
      );
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      const randomRecipe = responseData.meals.map((meal) => ({
        title: meal.strMeal,
        category: meal.strCategory,
        picture: meal.strMealThumb,
        description: meal.strInstructions,
      }));

      setCardDataState(randomRecipe[0]);
    } catch (err) {
      alert(err);
      setCardDataState({});
    }
  };

  useEffect(() => {
    if (cardType !== 'main') {
      getCard();
    } else {
      getRandomCard();
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
    <Box sx={{ width: 700, mt: '50px', mb: '50px' }}>
      <Card sx={{ backgroundColor: '#E4BF89' }}>
        <Paper elevation={10} sx={{ backgroundColor: '#394110' }}>
          <Typography
            variant="h4"
            sx={{ textAlign: 'center', pb: 1.5, pt: 1.5, color: '#E4BF89' }}
          >
            {cardType === 'main' ? 'Not sure what to cook?' : 'Ready to cook?'}
          </Typography>
        </Paper>
        <Paper
          elevation={10}
          sx={{ margin: '15px 25px 0 25px', backgroundColor: '#394110' }}
        >
          <Typography
            variant="h5"
            sx={{ textAlign: 'center', pb: 1, pt: 1, color: '#E4BF89' }}
          >
            {cardType === 'main'
              ? 'This is your random recipe:'
              : 'Here are the recipe details:'}
          </Typography>
        </Paper>
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
              <Button
                variant="outlined"
                color="inherit"
                sx={{ margin: 1 }}
                onClick={getRandomCard}
              >
                See another recipe
              </Button>
              <Link
                to="/all-recipes"
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                <Button variant="outlined" color="inherit" sx={{ margin: 1 }}>
                  See all recipes
                </Button>
              </Link>
            </Box>
          ) : userId === cardDataState?._ownerId ? (
            <Box>
              <Link
                to={`/edit-recipe/${cardDataState?._id}`}
                style={linkStyles}
              >
                <Button variant="outlined" color="inherit" sx={{ margin: 1 }}>
                  Edit
                </Button>
              </Link>
              <Button
                variant="outlined"
                color="inherit"
                sx={{ margin: 1 }}
                onClick={handleOnDelete}
              >
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
            <ExpandMoreIcon />
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
