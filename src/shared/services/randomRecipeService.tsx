import { v4 } from 'uuid';
import { RecipeType } from '../types';

export const fetchRandomRecipe = async () => {
  const response = await fetch('https://api.spoonacular.com/recipes/random', {
    headers: { 'x-api-key': '4a8fada50c5e418a800fca2e231466de' },
  });
  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message);
  }

  const randomRecipeArr = responseData.recipes.map((recipe: any) => ({
    title: recipe.title,
    category: recipe.cuisines[0] || recipe.dishTypes[0] || '',
    pictureUrl: recipe.image,
    description: recipe.instructions,
    ingredients: recipe.extendedIngredients.map((ingredient: any) => ({
      id: v4(),
      text: ingredient.original,
    })),
  }));

  const randomRecipe: RecipeType = randomRecipeArr[0];
  return randomRecipe;
};
