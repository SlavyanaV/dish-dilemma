// const likesUrl = 'http://localhost:3030/data/likes';
const likesUrl = 'https://dish-dilemma-api.onrender.com/data/likes';

export const likeRecipe = async (
  like: { cardId: string; likedBy: string },
  accessToken: string
) => {
  const response = await fetch(likesUrl, {
    method: 'POST',
    headers: {
      'X-Authorization': accessToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(like),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message);
  }
};

export const getLikes = async () => {
  const response = await fetch(likesUrl);
  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message);
  } else {
    return responseData;
  }
};
