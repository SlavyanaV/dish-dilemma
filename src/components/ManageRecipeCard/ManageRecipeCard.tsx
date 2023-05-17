import { useState, useEffect, FC, ChangeEvent } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Box,
  TextField,
  Paper,
  Typography,
  Button,
  Stack,
} from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { useNavigate, useParams } from 'react-router-dom';
import { outerPaper } from '../../shared/styles/formsStyles';
import {
  paperHeading,
  colors,
  flexCenterContainer,
} from '../../shared/styles/sharedStyles';
import {
  fetchRecipeById,
  manageRecipe,
  uploadRecipePicture,
} from '../../shared/services/recipeService';
import { formValidation } from '../../shared/validations';
import { RecipeType } from '../../shared/types';
import { useUserContext } from '../../hooks/useUserContext';
import { AlertMessage } from '../../shared/components/AlertMessage/AlertMessage';
import { UploadBtn } from '../../shared/components/UploadBtn/UploadBtn';
import { v4 } from 'uuid';
import { IngredientField } from './features/IngredientField';
import { FormInput } from '../../shared/components/FormInput/FormInput';

const initalState = {
  title: '',
  category: '',
  picture: '',
  description: '',
  id: '',
  ownerEmail: '',
  pictureId: '',
  pictureUrl: '',
  ingredients: [{ id: v4(), text: '' }],
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
  const [errorState, setErrorState] = useState<Record<string, any>>({
    ...initalState,
    ingredients: {},
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pictureFile, setPictureFile] = useState<File>();

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

  const handleOnAdd = () => {
    setCardDataState({
      ...cardDataState,
      ingredients: [...cardDataState.ingredients, { id: v4(), text: '' }],
    });
  };

  const handleOnSubmit = async () => {
    const { errors, hasErrors } = formValidation(cardDataState);

    setErrorState(errors);

    if (!hasErrors) {
      setIsLoading(true);
      try {
        let pictureUrl = cardDataState.pictureUrl;

        if (!pictureUrl) {
          pictureUrl = await uploadRecipePicture(
            pictureFile,
            cardDataState.pictureId
          );
        }

        const cardDto = {
          ...cardDataState,
          pictureUrl,
        };

        await manageRecipe(cardDto, userId, id!, actionType);

        navigate('/all-recipes');
        setIsLoading(false);
      } catch (err: any) {
        setAlertMessage(err.message);
        setIsOpen(true);
        setIsLoading(false);
      }
    }
  };

  const handleOnUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = (e.target.files as FileList)[0];

    setPictureFile(file);

    setCardDataState({
      ...cardDataState,
      picture: file.name,
      pictureId: v4(),
    });
  };

  return (
    <Box sx={flexCenterContainer}>
      <Paper
        variant="outlined"
        sx={{ ...outerPaper, width: '50em' }}
        className="form-container"
      >
        <Stack spacing={2} component="form" autoComplete="off">
          <Paper
            elevation={10}
            sx={{ mb: 1.5, mt: 1.5, backgroundColor: colors.dark }}
          >
            <Typography variant="h4" sx={paperHeading}>
              {actionType === 'edit' ? 'Edit your recipe' : 'Add your recipe'}
            </Typography>
          </Paper>
          <FormInput
            name="title"
            value={cardDataState.title}
            label="Recipe title"
            placeholder="Enter recipe titile"
            helperText={errorState.title}
            error={!!errorState.title}
            onChange={handleOnChange}
            className={!!errorState.title ? 'input-error' : 'input-success'}
          />
          <FormInput
            name="category"
            value={cardDataState.category}
            label="Category"
            placeholder="Enter recipe category"
            helperText={errorState.category}
            error={!!errorState.category}
            onChange={handleOnChange}
            className={!!errorState.category ? 'input-error' : 'input-success'}
          />
          <UploadBtn
            onChange={handleOnUpload}
            picture={cardDataState.picture}
            error={errorState.picture as string}
          />
          <Button
            variant="outlined"
            component="label"
            color="inherit"
            className="upload-btn"
            onClick={handleOnAdd}
            endIcon={<AddBoxOutlinedIcon />}
            sx={{ width: '50%', p: 1, mt: 2.5 }}
          >
            Add ingredient
          </Button>
          {cardDataState.ingredients.map((ingredient, index) => (
            <IngredientField
              key={ingredient.id}
              ingredient={ingredient}
              error={errorState?.ingredients?.[ingredient.id]}
              cardDataState={cardDataState}
              setCardDataState={setCardDataState}
              index={index}
            />
          ))}
          <TextField
            name="description"
            value={cardDataState.description}
            sx={{ mt: 2.5 }}
            id="filled-multiline-static"
            label="Description"
            multiline
            rows={6}
            variant="outlined"
            size="small"
            placeholder="Enter recipe description"
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
            sx={{ mt: 2.5, p: 1.5 }}
            color="inherit"
            loading={isLoading}
            loadingPosition="end"
          >
            {actionType === 'edit' ? 'Edit recipe' : 'Add recipe'}
          </LoadingButton>
        </Stack>
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
