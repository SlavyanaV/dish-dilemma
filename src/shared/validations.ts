import { Ingredient } from './types';

export const formValidation = (formState: Record<string, any>) => {
  const { id, ownerEmail, pictureUrl, ingredients, ...dataToValidate } =
    formState;
  const errors: Record<string, any> = { ingredients: [] };

  Object.keys(dataToValidate).forEach((key) => {
    switch (key) {
      case 'picture':
        errors[key] = !formState[key] ? 'Field is mandatory' : '';
        break;
      case 'repassword':
        if (formState.repassword !== formState.password) {
          errors[key] = 'Passwords must match';
        }
        break;
      default:
        errors[key] =
          formState[key]?.length < 3
            ? 'The field must contain at least 3 symbols'
            : '';
    }
  });

  ingredients.forEach((ingredient: Ingredient) => {
    errors.ingredients[ingredient.id] =
      ingredient.text.length < 5
        ? 'The field must contain at least 5 symbols'
        : '';
  });

  const hasErrors = Object.keys(errors).some((key) => {
    if (key === 'ingredients') {
      return Object.values(errors.ingredients)?.some((value) => value);
    } else {
      return errors[key];
    }
  });

  return { errors, hasErrors };
};
