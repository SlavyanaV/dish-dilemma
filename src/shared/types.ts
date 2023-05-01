export type CardType = {
  category: string;
  description: string;
  picture: string;
  title: string;
  createdOn?: number;
  id?: string;
  ownerId: string;
  ownerEmail: string;
};

export type LikesType = {
  cardId: string;
  likedBy: string;
  id: string;
};

export type RecipeType = {
  id: string;
  category: string;
  description: string;
  picture: string;
  title: string;
  ingredients?: string[];
  createdOn?: number;
  ownerId?: string;
  ownerEmail: string;
};

export type LoginType = {
  email: string;
  password: string;
};

export type RegisterType = LoginType & {
  repassword: string;
};
