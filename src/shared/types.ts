export type CardType = {
  category: string;
  description: string;
  title: string;
  createdOn?: number;
  id?: string;
  ownerId: string;
  ownerEmail: string;
  pictureUrl: string;
};

export type LikesType = {
  cardId: string;
  likedBy: string;
  id: string;
};

export type Ingredient = {
  id: string;
  text: string;
};

export type RecipeType = {
  id: string;
  category: string;
  description: string;
  picture: string;
  title: string;
  ingredients: Ingredient[];
  createdOn?: number;
  ownerId?: string;
  ownerEmail: string;
  pictureId: string;
  pictureUrl: string;
};

export type LoginType = {
  email: string;
  password: string;
};

export type RegisterType = LoginType & {
  repassword: string;
};
