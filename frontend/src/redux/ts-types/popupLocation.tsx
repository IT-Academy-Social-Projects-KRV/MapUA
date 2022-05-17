export type locationState = {
  _id?: string;
  locationName: string;
  rating: {
    likes: number;
    dislikes: number;
  };
  coordinates: [number, number];
  photoSrc: string;
  description: string;
  comments: string[];
  isLoading: boolean;
};
