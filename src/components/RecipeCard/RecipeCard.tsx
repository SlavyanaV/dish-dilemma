import { useState, useEffect, FC } from 'react';
import { useParams } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Box,
  Paper,
} from '@mui/material';
import {
  colors,
  flexCenterContainer,
  paperHeading,
} from '../../shared/styles/sharedStyles';
import { fetchRandomRecipe } from '../../shared/services/randomRecipeService';
import { fetchRecipeById } from '../../shared/services/recipeService';
import { useUserContext } from '../../hooks/useUserContext';
import { RecipeType } from '../../shared/types';
import { AlertMessage } from '../../shared/components/AlertMessage/AlertMessage';
import { Loader } from '../../shared/components/Loader/Loader';
import { RandomRecipeActions } from './features/RandomRecipeActions';
import { CustomRecipeActions } from './features/CustomRecipeActions';
import { ExpandedDetails } from './features/ExpandedDetails';

type Props = {
  cardType?: string;
};

export const RecipeCard: FC<Props> = ({ cardType }) => {
  const { id } = useParams();
  const {
    user: { userId },
  } = useUserContext();

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [cardDataState, setCardDataState] = useState({} as RecipeType);
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  const getRecipe = async () => {
    setIsLoading(true);

    try {
      const recipe =
        cardType === 'main'
          ? await fetchRandomRecipe()
          : await fetchRecipeById(id!);

      setCardDataState(recipe);
      setIsLoading(false);
    } catch (err: any) {
      setAlertMessage(err.message);
      setIsAlertOpen(true);
      setCardDataState({} as RecipeType);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRecipe();
    setIsExpanded(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardType]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box sx={flexCenterContainer}>
      <Box sx={{ width: 700}}>
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
            image={cardDataState?.pictureUrl}
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
              <RandomRecipeActions
                getRandomRecipe={getRecipe}
                cardDataState={cardDataState}
              />
            ) : userId === cardDataState?.ownerId ? (
              <CustomRecipeActions id={cardDataState?.id} />
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
          <ExpandedDetails
            isExpanded={isExpanded}
            ingredients={cardDataState.ingredients}
            description={cardDataState.description}
          />
        </Card>
        <AlertMessage
          isOpen={isAlertOpen}
          setIsOpen={setIsAlertOpen}
          severity={'error'}
          alertTitle={'Error'}
          alertMessage={alertMessage}
        />
      </Box>
    </Box>
  );
};
