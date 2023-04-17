import { LikesType } from "./types";

export const transformLikes = (likesData: LikesType[], cardId: string) => {
  const transformedLikes = likesData
    ?.filter((like) => like.cardId === cardId)
    ?.map((like) => like.likedBy);

  return transformedLikes;
};
