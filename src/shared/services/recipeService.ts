import { RecipeType } from '../types';

// const recipesUrl = 'http://localhost:3030/data/all-recipes';
const recipesUrl = 'https://dish-dilemma-api.onrender.com/data/all-recipes';

export const fetchRecipeById = async (id?: string) => {
  const response = await fetch(`${recipesUrl}/${id}`);
  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message);
  } else {
    return responseData;
  }
};

export const manageRecipe = async (
  cardDataState: RecipeType,
  accessToken: string,
  actionType?: string,
  id?: string
) => {
  const response = await fetch(
    `${recipesUrl}${actionType === 'edit' ? '/' + id : ''}`,
    {
      method: `${actionType === 'edit' ? 'PUT' : 'POST'}`,
      headers: {
        'X-Authorization': accessToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cardDataState),
    }
  );

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message);
  }
};

export const deleteRecipe = async (accessToken: string, id?: string) => {
  const response = await fetch(`${recipesUrl}/${id}`, {
    method: 'DELETE',
    headers: { 'X-Authorization': accessToken },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
};

export const fetchAllRecipes = async () => {
  const response = await fetch(recipesUrl);
  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message);
  } else {
    return responseData;
  }
};

export const fetchAllRecipesByUserId = async (userId: string) => {
  const response = await fetch(
    `${recipesUrl}?where=_ownerId%3D%22${userId}%22`
  );
  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message);
  } else {
    return responseData;
  }
};
