export type CardType = {
  category: string;
  description: string;
  picture: string;
  title: string;
  _createdOn: number;
  _id: string;
  _ownerId: string;
};

export type LikesType = {
  cardId: string;
  likedBy: string;
  _createdOn: number;
  _id: string;
  _ownerId: string;
};

export type RecipeType = {
  category: string;
  description: string;
  picture: string;
  title: string;
  ingredients?: string[];
  _createdOn?: number;
  _id?: string;
  _ownerId?: string;
};

export type LoginType = {
  email: string;
  password: string;
};

export type RegisterType = LoginType & {
  repassword: string;
};
