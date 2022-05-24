export type latlngType = {
  lat: number;
  lng: number;
};

export type boundsType = {
  _northEast: {
    lat: number;
    lng: number;
  };
  _southWest: {
    lat: number;
    lng: number;
  };
};

export type locationType = {
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
};

export type LocationPopOutData = {
  locationName: string;
  photoSrc: string;
};

export type lightLocationType = {
  _id?: string;
  locationName: string;
  rating: {
    likes: number;
    dislikes: number;
  };
  coordinates: [number, number];
  photoSrc: string;
};

export type UserDataType = {
  _id: string;
  email: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  displayName: string;
  description: string;
  imageUrl: string;
  subscribers: string[];
  subscriptions: string[];
  favorite: string[];
  visited: string[];
  personalLocations: string[];
};

export type LocationType = {
  locationName: string;
  coordinates: [number, number];
  descripton: string;
  arrayPhotos: [];
};

export type CoordinatesType = {
  coordinate: [number, number];
};
