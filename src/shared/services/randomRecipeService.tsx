import { RecipeType } from "../types";

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
    picture: recipe.image,
    description: (
      //in order to display properly some of the recipes, that are returned as html string by the api
      <div dangerouslySetInnerHTML={{ __html: recipe.instructions }}></div>
    ),
    ingredients: recipe.extendedIngredients.map(
      (ingredient: any) => ingredient.original
    ),
  }));

  const randomRecipe: RecipeType = randomRecipeArr[0];
  return randomRecipe;
};
