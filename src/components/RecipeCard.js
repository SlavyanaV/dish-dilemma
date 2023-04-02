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
  Dialog,
  DialogTitle,
  DialogActions,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { colors, link, paperHeading } from '../shared/styles/sharedStyles';
import { fetchRandomRecipe } from '../shared/services/randomRecipeService';
import {
  deleteRecipe,
  fetchRecipeById,
} from '../shared/services/recipeService';

export const RecipeCard = ({ cardType }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const accessToken = localStorage.getItem('accessToken');
  const userId = localStorage.getItem('_id');

  const [expanded, setExpanded] = useState(false);
  const [cardDataState, setCardDataState] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const getRecipe = async () => {
    try {
      const responseData = await fetchRecipeById(id);

      setCardDataState(responseData);
    } catch (err) {
      alert(err);
      setCardDataState({});
    }
  };

  const getRandomRecipe = async () => {
    try {
      const randomRecipe = await fetchRandomRecipe();

      setCardDataState(randomRecipe);
    } catch (err) {
      alert(err);
      setCardDataState({});
    }
  };

  useEffect(() => {
    if (cardType !== 'main') {
      getRecipe();
    } else {
      getRandomRecipe();
    }
  }, [cardType]);

  const handleOnDelete = async () => {
    try {
      await deleteRecipe(cardDataState._id, accessToken);

      navigate('/all-recipes');
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Box sx={{ width: 700, mt: '80px', mb: '50px' }}>
      <Card sx={{ backgroundColor: colors.light }}>
        <Paper elevation={10} sx={{ backgroundColor: colors.dark }}>
          <Typography variant="h4" sx={paperHeading}>
            {cardType === 'main' ? 'Not sure what to cook?' : 'Ready to cook?'}
          </Typography>
        </Paper>
        <Paper
          elevation={10}
          sx={{ m: '15px 25px 0 25px', backgroundColor: colors.dark }}
        >
          <Typography
            variant="h5"
            sx={{ textAlign: 'center', pb: 1, pt: 1, color: colors.light }}
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
          height={'400'}
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
                sx={{ m: 1 }}
                onClick={getRandomRecipe}
              >
                See another recipe
              </Button>
              <Link
                to="/all-recipes"
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                <Button variant="outlined" color="inherit" sx={{ m: 1 }}>
                  See all recipes
                </Button>
              </Link>
            </Box>
          ) : userId === cardDataState?._ownerId ? (
            <Box>
              <Link to={`/edit-recipe/${cardDataState?._id}`} style={link}>
                <Button variant="outlined" color="inherit" sx={{ m: 1 }}>
                  Edit
                </Button>
              </Link>
              <Button
                variant="outlined"
                color="inherit"
                sx={{ m: 1 }}
                onClick={() => setIsOpen(true)}
              >
                Delete
              </Button>
              <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
                <DialogTitle id="alert-dialog-title">
                  Are you sure you want to delete this recipe?
                </DialogTitle>
                <DialogActions>
                  <Button
                    variant="outlined"
                    color="inherit"
                    sx={{ m: 1 }}
                    onClick={() => setIsOpen(false)}
                  >
                    No
                  </Button>
                  <Button
                    variant="outlined"
                    color="inherit"
                    sx={{ m: 1 }}
                    onClick={handleOnDelete}
                    autoFocus
                  >
                    Yes
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
          ) : (
            <></>
          )}
          <IconButton
            sx={{ ml: 'auto' }}
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
