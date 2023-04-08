export const transformLikes = (likesData, cardId) => {
  const transformedLikes = likesData
    ?.filter((like) => like.cardId === cardId)
    ?.map((like) => like.likedBy);

  return transformedLikes;
};
