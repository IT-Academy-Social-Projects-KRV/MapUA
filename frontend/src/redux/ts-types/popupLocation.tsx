export type Comment = {
  author: string;
  text: string;
  likes: string[];
  dislikes: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type locationState = {
  _id?: string;
  locationName: string;
  rating: {
    likes: number;
    dislikes: number;
  };
  coordinates: [number, number];
  arrayPhotos: string[];
  description: string;
  comments: Comment[];
  isLoading: boolean;
};
