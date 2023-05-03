import { useState, useEffect, FC, ChangeEvent } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, TextField, Paper, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { outerPaper } from '../../shared/styles/formsStyles';
import {
  paperHeading,
  mainBoxContainer,
  colors,
  flexCenterContainer,
} from '../../shared/styles/sharedStyles';
import {
  fetchRecipeById,
  manageRecipe,
} from '../../shared/services/recipeService';
import { formValidation } from '../../shared/validations';
import { RecipeType } from '../../shared/types';
import { useUserContext } from '../../hooks/useUserContext';
import { AlertMessage } from '../../shared/components/AlertMessage/AlertMessage';

const initalState = {
  title: '',
  category: '',
  picture: '',
  description: '',
  id: '',
  ownerEmail: '',
};

type Props = {
  actionType?: string;
};

export const ManageRecipeCard: FC<Props> = ({ actionType }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    user: { userId },
  } = useUserContext();

  const [cardDataState, setCardDataState] = useState<RecipeType>(initalState);
  const [errorState, setErrorState] =
    useState<Record<string, string>>(initalState);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getRecipe = async () => {
    try {
      const responseData = await fetchRecipeById(id!);

      setCardDataState(responseData);
    } catch (err: any) {
      setAlertMessage(err.message);
      setIsOpen(true);
    }
  };

  useEffect(() => {
    if (actionType === 'edit') {
      getRecipe();
    } else {
      setCardDataState(initalState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionType]);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setCardDataState({
      ...cardDataState,
      [name]: value,
    });
  };

  const handleOnSubmit = async () => {
    const { errors, hasErrors } = formValidation(cardDataState);

    setErrorState(errors);

    if (!hasErrors) {
      setIsLoading(true);
      try {
        await manageRecipe(cardDataState, userId, id!, actionType);

        navigate('/all-recipes');
        setIsLoading(false);
      } catch (err: any) {
        setAlertMessage(err.message);
        setIsOpen(true);
        setIsLoading(false);
      }
    }
  };

  return (
    <Box sx={flexCenterContainer}>
      <Paper variant="outlined" sx={outerPaper}>
        <Box
          component="form"
          sx={{
            width: 700,
            maxWidth: '100%',
            ...mainBoxContainer,
          }}
          autoComplete="off"
        >
          <Paper
            elevation={10}
            sx={{ mb: 1.5, mt: 1.5, backgroundColor: colors.dark }}
          >
            <Typography variant="h4" sx={paperHeading}>
              {actionType === 'edit' ? 'Edit your recipe' : 'Add your recipe'}
            </Typography>
          </Paper>

          <TextField
            name="title"
            value={cardDataState.title}
            sx={{ mt: 1 }}
            id="filled-multiline-flexible"
            label="Recipe title"
            variant="outlined"
            helperText={errorState.title}
            error={!!errorState.title}
            onChange={handleOnChange}
            className={!!errorState.title ? 'input-error' : 'input-success'}
          />
          <TextField
            name="category"
            value={cardDataState.category}
            sx={{ mt: 2.5 }}
            id="filled-multiline-flexible"
            label="Category"
            variant="outlined"
            helperText={errorState.category}
            error={!!errorState.category}
            onChange={handleOnChange}
            className={!!errorState.category ? 'input-error' : 'input-success'}
          />
          <TextField
            name="picture"
            value={cardDataState.picture}
            sx={{ mt: 2.5 }}
            id="filled-multiline-flexible"
            label="Picture address"
            multiline
            maxRows={2}
            variant="outlined"
            helperText={errorState.picture}
            error={!!errorState.picture}
            onChange={handleOnChange}
            className={!!errorState.picture ? 'input-error' : 'input-success'}
          />
          <TextField
            name="description"
            value={cardDataState.description}
            sx={{ mt: 2.5 }}
            id="filled-multiline-static"
            label="Description"
            multiline
            rows={8}
            variant="outlined"
            helperText={errorState.description}
            error={!!errorState.description}
            onChange={handleOnChange}
            className={
              !!errorState.description ? 'input-error' : 'input-success'
            }
          />
          <LoadingButton
            variant="outlined"
            onClick={handleOnSubmit}
            sx={{ mt: 2.5 }}
            color="inherit"
            loading={isLoading}
            loadingPosition="end"
          >
            {actionType === 'edit' ? 'Edit recipe' : 'Add recipe'}
          </LoadingButton>
        </Box>
        <AlertMessage
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          severity={'error'}
          alertTitle={'Error'}
          alertMessage={alertMessage}
        />
      </Paper>
    </Box>
  );
};
