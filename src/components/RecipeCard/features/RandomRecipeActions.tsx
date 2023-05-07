import { Box, Button } from '@mui/material';
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { ConfirmDialog } from '../../../shared/components/ConfirmDialog/ConfirmDialog';
import { RecipeType } from '../../../shared/types';
import { manageRecipe } from '../../../shared/services/recipeService';
import { useUserContext } from '../../../hooks/useUserContext';
import { AlertMessage } from '../../../shared/components/AlertMessage/AlertMessage';

type Props = {
  getRandomRecipe: () => Promise<void>;
  cardDataState: RecipeType;
};

export const RandomRecipeActions: FC<Props> = ({
  getRandomRecipe,
  cardDataState,
}) => {
  const {
    user: { userId },
  } = useUserContext();

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const [isAddDisabled, setIsAddDisabled] = useState<boolean>(false);

  const handleOnAddRecipe = async () => {
    setIsLoading(true);
    try {
      await manageRecipe(cardDataState, userId);

      setIsLoading(false);
      setIsDialogOpen(false);
      setIsAlertOpen(true);
      setAlertMessage('The recipe has been added to the recipes list');
      setIsAddDisabled(true);
    } catch (err: any) {
      setAlertMessage(err.message);
      setIsAlertOpen(true);
      setIsLoading(false);
      setIsDialogOpen(false);
    }
  };

  return (
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
      <Button
        variant="outlined"
        color="inherit"
        sx={{ m: 1 }}
        onClick={() => setIsDialogOpen(true)}
        disabled={isAddDisabled}
      >
        Add recipe to list
      </Button>
      <ConfirmDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        handleOnConfirm={handleOnAddRecipe}
        isLoading={isLoading}
        title={'Are you sure you want to add this recipe to the recipe list?'}
        confirmBtn={'Yes'}
        closeBtn={'No'}
      />
      <AlertMessage
        isOpen={isAlertOpen}
        setIsOpen={setIsAlertOpen}
        severity={
          alertMessage.startsWith('The recipe has been added')
            ? 'success'
            : 'error'
        }
        alertTitle={
          alertMessage.startsWith('The recipe has been added')
            ? 'Success'
            : 'Error'
        }
        alertMessage={alertMessage}
      />
    </Box>
  );
};
