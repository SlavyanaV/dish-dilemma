import { Box, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { ConfirmDialog } from '../../../shared/components/ConfirmDialog/ConfirmDialog';
import { link } from '../../../shared/styles/sharedStyles';
import { FC, useState } from 'react';
import { deleteRecipe } from '../../../shared/services/recipeService';
import { AlertMessage } from '../../../shared/components/AlertMessage/AlertMessage';

type Props = {
  id: string;
};

export const CustomRecipeActions: FC<Props> = ({ id }) => {
  const navigate = useNavigate();

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

  const handleOnDelete = async () => {
    setIsDeleteLoading(true);
    try {
      await deleteRecipe(id);

      navigate('/all-recipes');
      setIsDeleteLoading(false);
    } catch (err: any) {
      setAlertMessage(err.message);
      setIsAlertOpen(true);
      setIsDeleteLoading(false);
    }
  };

  return (
    <Box>
      <Link to={`/edit-recipe/${id}`} style={link}>
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
      <AlertMessage
        isOpen={isAlertOpen}
        setIsOpen={setIsAlertOpen}
        severity={'error'}
        alertTitle={'Error'}
        alertMessage={alertMessage}
      />
    </Box>
  );
};
