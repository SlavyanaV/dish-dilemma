// export const fetchRandomRecipe = async () => {
//   const response = await fetch(
//     'https://themealdb.com/api/json/v1/1/random.php'
//   );
//   const responseData = await response.json();

//   if (!response.ok) {
//     throw new Error(responseData.message);
//   }

//   const randomRecipe = responseData.meals.map((meal) => ({
//     title: meal.strMeal,
//     category: meal.strCategory,
//     picture: meal.strMealThumb,
//     description: meal.strInstructions,
//   }));

//   return randomRecipe[0];
// };

//back up random recipe api
export const fetchRandomRecipe = async () => {
  const response = await fetch('https://api.spoonacular.com/recipes/random', {
    headers: { 'x-api-key': '4a8fada50c5e418a800fca2e231466de' },
  });
  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message);
  }

  const randomRecipe = responseData.recipes.map((recipe) => ({
    title: recipe.title,
    category: recipe.cuisines[0] || recipe.dishTypes[0] || '',
    picture: recipe.image,
    description: (
      //in order to display properly some of the recipes, that are returned as html string by the api
      <div dangerouslySetInnerHTML={{ __html: recipe.instructions }}></div>
    ),
  }));

  return randomRecipe[0];
};
