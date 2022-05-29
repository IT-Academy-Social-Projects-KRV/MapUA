export type Comment<T> = {
  _id?: string;
  author: T;
  locationId: string;
  text: string;
  likes: string[];
  dislikes: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type AuthorInfo = {
  imageUrl: string;
  displayName: string;
};

export type locationState = {
  _id?: string;
  locationName: string;
  rating: {
    likes: string[];
    dislikes: string[];
  };
  coordinates: [number, number];
  arrayPhotos: string[];
  description: string;
  comments: Comment<AuthorInfo>[];
  createdAt: Date;
  updatedAt: Date;
  isLoading: boolean;
};
