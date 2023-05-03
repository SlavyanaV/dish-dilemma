import { useState, useEffect, FC } from 'react';
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
import {
  colors,
  flexCenterContainer,
  link,
  paperHeading,
} from '../../shared/styles/sharedStyles';
import { fetchRandomRecipe } from '../../shared/services/randomRecipeService';
import {
  deleteRecipe,
  fetchRecipeById,
} from '../../shared/services/recipeService';
import { useUserContext } from '../../hooks/useUserContext';
import { RecipeType } from '../../shared/types';
import { ConfirmDialog } from '../../shared/components/ConfirmDialog/ConfirmDialog';
import { AlertMessage } from '../../shared/components/AlertMessage/AlertMessage';
import Loader from '../../shared/components/Loader/Loader';

type Props = {
  cardType?: string;
};

export const RecipeCard: FC<Props> = ({ cardType }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    user: { userId },
  } = useUserContext();

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [cardDataState, setCardDataState] = useState({} as RecipeType);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);
  const [hasFetched, setHasFetched] = useState<boolean>(false);

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  const getRecipe = async () => {
    setIsLoading(true);

    try {
      const responseData = await fetchRecipeById(id!);

      setCardDataState(responseData);
      setIsLoading(false);
      setHasFetched(true);
    } catch (err: any) {
      setAlertMessage(err.message);
      setIsOpen(true);
      setCardDataState({} as RecipeType);
      setIsLoading(false);
      setHasFetched(true);
    }
  };

  const getRandomRecipe = async () => {
    setIsLoading(true);

    try {
      const randomRecipe = await fetchRandomRecipe();

      setCardDataState(randomRecipe);
      setIsLoading(false);
      setHasFetched(true);
    } catch (err: any) {
      setAlertMessage(err.message);
      setIsOpen(true);
      setCardDataState({} as RecipeType);
      setIsLoading(false);
      setHasFetched(true);
    }
  };

  useEffect(() => {
    if (cardType !== 'main') {
      getRecipe();
    } else {
      getRandomRecipe();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardType]);

  const handleOnDelete = async () => {
    setIsDeleteLoading(true);
    try {
      await deleteRecipe(cardDataState.id);

      navigate('/all-recipes');
      setIsDeleteLoading(false);
    } catch (err: any) {
      setAlertMessage(err.message);
      setIsOpen(true);
      setIsDeleteLoading(false);
    }
  };

  if (isLoading || !hasFetched) {
    return <Loader />;
  }

  return (
    <Box sx={flexCenterContainer}>
      <Box sx={{ width: 700, mb: '50px' }}>
        <Card sx={{ backgroundColor: colors.light }}>
          <Paper elevation={10} sx={{ backgroundColor: colors.dark }}>
            <Typography variant="h4" sx={paperHeading}>
              {cardType === 'main'
                ? 'Not sure what to cook?'
                : 'Ready to cook?'}
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
            sx={{ textAlign: 'center', color: colors.dark }}
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
            <Typography variant="body2" color={colors.secondary}>
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
            ) : userId === cardDataState?.ownerId ? (
              <Box>
                <Link to={`/edit-recipe/${cardDataState?.id}`} style={link}>
                  <Button variant="outlined" color="inherit" sx={{ m: 1 }}>
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="outlined"
                  color="inherit"
                  sx={{ m: 1 }}
                  onClick={() => setIsDialogOpen(true)}
                >
                  Delete
                </Button>
                <ConfirmDialog
                  isOpen={isDialogOpen}
                  setIsOpen={setIsDialogOpen}
                  handleOnConfirm={handleOnDelete}
                  isLoading={isDeleteLoading}
                  title={'Are you sure you want to delete this recipe?'}
                  confirmBtn={'Yes'}
                  closeBtn={'No'}
                />
              </Box>
            ) : (
              <></>
            )}
            <IconButton
              sx={{ ml: 'auto' }}
              onClick={handleExpandClick}
              aria-expanded={isExpanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <CardContent sx={{ maxWidth: 650, color: colors.dark }}>
              {cardType === 'main' ? (
                <>
                  <Typography paragraph sx={{ fontWeight: 'bold' }}>
                    Ingredients:
                  </Typography>
                  <ul>
                    {cardDataState?.ingredients?.map((ingredient: string) => (
                      <li key={ingredient}>{ingredient}</li>
                    ))}
                  </ul>
                </>
              ) : (
                <></>
              )}
              <Typography paragraph sx={{ fontWeight: 'bold' }}>
                Instructions:
              </Typography>
              <Typography
                paragraph
                sx={{
                  textAlign: 'justify',
                  overflowWrap: 'anywhere',
                }}
              >
                {cardDataState?.description}
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
        <AlertMessage
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          severity={'error'}
          alertTitle={'Error'}
          alertMessage={alertMessage}
        />
      </Box>
    </Box>
  );
};
