import { Stack, TextField, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { Ingredient, RecipeType } from '../../../shared/types';
import { ChangeEvent, FC } from 'react';

type Props = {
  ingredient: Ingredient;
  error: string;
  cardDataState: RecipeType;
  setCardDataState: React.Dispatch<React.SetStateAction<RecipeType>>;
  index: number
};

export const IngredientField: FC<Props> = ({
  ingredient,
  error,
  cardDataState,
  setCardDataState,
  index
}) => {
  const handleOnIngredientChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const nextIngredients = [...cardDataState.ingredients];

    nextIngredients[index].text = event.target.value;

    setCardDataState({
      ...cardDataState,
      ingredients: nextIngredients,
    });
  };

  const handleOnRemove = (id: string) => {
    const filteredIngredients = cardDataState.ingredients.filter(
      (ingredient) => ingredient.id !== id
    );

    setCardDataState({ ...cardDataState, ingredients: filteredIngredients });
  };

  return (
    <Stack
      key={ingredient.id}
      direction="row"
      alignItems="center"
      justifyContent={'space-between'}
      spacing={2}
      sx={{ mt: 2.5 }}
    >
      <TextField
        name="ingredient"
        value={ingredient.text}
        sx={{ width: '92%' }}
        id="filled-multiline-flexible"
        label="Ingredient"
        variant="outlined"
        placeholder="Enter recipe ingredient"
        helperText={error}
        error={!!error}
        onChange={(e) => handleOnIngredientChange(index, e)}
        className={!!error ? 'input-error' : 'input-success'}
      />
      <IconButton
        disabled={cardDataState?.ingredients?.length <= 1}
        onClick={() => handleOnRemove(ingredient.id)}
      >
        <ClearIcon />
      </IconButton>
    </Stack>
  );
};
