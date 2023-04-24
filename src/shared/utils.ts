import { DocumentData, QuerySnapshot } from 'firebase/firestore';
import { LikesType } from './types';

export const transformLikes = (likesData: LikesType[], cardId: string) => {
  const transformedLikes = likesData
    ?.filter((like) => like.cardId === cardId)
    ?.map((like) => like.likedBy);

  return transformedLikes;
};

export const mapFirestoreDocs = (data: QuerySnapshot<DocumentData>) =>
  data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
