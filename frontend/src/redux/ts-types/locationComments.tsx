export type Comment<T> = {
  _id?: string;
  author: T;
  locationId: string;
  text: string;
  likes: string[];
  dislikes: string[];
  createdAt?: Date;
  updatedAt?: Date;
};

export type AuthorInfo = {
  imageUrl: string;
  displayName: string;
};

export type locationCommentsState = {
  comments: Comment<AuthorInfo>[];
};
