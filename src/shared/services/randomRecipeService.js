export const fetchRandomRecipe = async () => {
  const response = await fetch(
    'https://themealdb.com/api/json/v1/1/random.php'
  );
  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message);
  }

  const randomRecipe = responseData.meals.map((meal) => ({
    title: meal.strMeal,
    category: meal.strCategory,
    picture: meal.strMealThumb,
    description: meal.strInstructions,
  }));

  return randomRecipe[0];
};
