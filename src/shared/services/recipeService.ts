import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { CardType, RecipeType } from '../types';
import { mapFirestoreDocs } from '../utils';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

const recipesCollectionRef = collection(db, 'recipes');
const storage = getStorage();

export const fetchRecipeById = async (id: string) => {
  const recipeRef = doc(db, 'recipes', id);
  const recipe = await getDoc(recipeRef);
  const recipeData = { ...recipe.data(), id: recipe.id } as RecipeType;

  return recipeData;
};

export const manageRecipe = async (
  cardDataState: RecipeType,
  ownerId: string,
  id: string,
  actionType?: string
) => {
  const cardData: CardType = { ...cardDataState, ownerId };

  if (actionType === 'edit') {
    const recipeDoc = doc(db, 'recipes', id);
    await updateDoc(recipeDoc, cardData);
  } else {
    delete cardData.id;
    await addDoc(recipesCollectionRef, {
      ...cardData,
      ownerEmail: auth?.currentUser?.email,
    });
  }
};

export const uploadRecipePicture = async (
  pictureFile: File | undefined,
  pictureId: string
) => {
  const storageRef = ref(storage, `pictures/${pictureId}`);

  if (pictureFile) {
    await uploadBytes(storageRef, pictureFile);
  }

  const pictureUrl = await getDownloadURL(
    ref(storage, `pictures/${pictureId}`)
  );

  return pictureUrl;
};

export const deleteRecipe = async (id: string) => {
  const recipeDoc = doc(db, 'recipes', id);
  await deleteDoc(recipeDoc);
};

export const fetchAllRecipes = async () => {
  const recipesData = await getDocs(recipesCollectionRef);
  const recipes = mapFirestoreDocs(recipesData);

  return recipes as CardType[];
};

export const fetchAllRecipesByUserId = async (userId: string) => {
  const recipesQuery = query(
    recipesCollectionRef,
    where('ownerId', '==', userId)
  );
  const userRecipesData = await getDocs(recipesQuery);
  const userRecipes = mapFirestoreDocs(userRecipesData);

  return userRecipes as CardType[];
};
