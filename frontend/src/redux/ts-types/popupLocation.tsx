export type Comment = {
  author: string;
  text: string;
  likes: string[];
  dislikes: string[];
  createdAt: Date;
  updatedAt: Date;
};

export interface locationState {
  _id?: string;
  author: string;
  locationName: string;
  rating: {
    likes: string[];
    dislikes: string[];
  };
  coordinates: [number, number];
  arrayPhotos: string[];
  description: string;
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
  isLoading: boolean;
};
