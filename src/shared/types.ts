export type CardType = {
  category: string;
  description: string;
  picture: string;
  title: string;
  createdOn: number;
  id: string;
  ownerId: string;
};

export type LikesType = {
  cardId: string;
  likedBy: string;
  createdOn: number;
  id: string;
  ownerId: string;
};

export type RecipeType = {
  category: string;
  description: string;
  picture: string;
  title: string;
  ingredients?: string[];
  createdOn?: number;
  id?: string;
  ownerId?: string;
};

export type LoginType = {
  email: string;
  password: string;
};

export type RegisterType = LoginType & {
  repassword: string;
};
