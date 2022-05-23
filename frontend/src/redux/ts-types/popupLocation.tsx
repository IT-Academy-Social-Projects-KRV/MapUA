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
  comments: string[];
  isLoading: boolean;
};
