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
  comments: string[];
  isLoading: boolean;
};
