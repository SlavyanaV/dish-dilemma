import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { LikesType } from '../types';
import { mapFirestoreDocs } from '../utils';

const likesCollectionRef = collection(db, 'likes');

export const likeRecipe = async (like: { cardId: string; likedBy: string }) => {
  await addDoc(likesCollectionRef, like);
};

export const getLikes = async () => {
  const likesData = await getDocs(likesCollectionRef);
  const likes = mapFirestoreDocs(likesData);

  return likes as LikesType[];
};
