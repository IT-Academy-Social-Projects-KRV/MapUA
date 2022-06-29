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
export type isUserAuthorizedType = {
  isAuthorized: boolean;
  role: string | null;
};
export type AuthorInfoType = {
  _id: string;
  imageUrl: string;
  displayName: string;
};
export type CommentType<T> = {
  comments: CommentType<AuthorInfoType>[];
  _id: string;
  author: T;
  locationId: string;
  text: string;
  likes: string[];
  dislikes: string[];
  parentComment: string;
  createdAt?: Date;
  updatedAt?: Date;
  deleted: boolean;
};
export type AddCommentType<T> = {
  author: T;
  locationId: string;
  text: string;
  likes: string[];
  dislikes: string[];
  createdAt?: Date;
  updatedAt?: Date;
};
export type locationType = {
  _id: string;
  author?: AuthorInfoType;
  locationName: string;
  rating: {
    likes: string[];
    dislikes: string[];
  };
  coordinates: [number, number];
  arrayPhotos: string[];
  description: string;
  reported: boolean;
  createdAt: Date;
  updatedAt: Date;
  verificationStatus: string;
};

export type updateLocationType = {
  locationName: string;
  arrayPhotos: string[];
  description: string;
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
  displayName: string;
  description: string;
  imageUrl: string;
  subscribers: AuthorInfoType[];
  subscriptions: AuthorInfoType[];
  favorite: string[];
  visited: string[];
  personalLocations: string[];
};
export type PrivateUserDataType = {
  email: string;
  createdAt: Date | string;
  updatedAt: Date | string;
};
export type UserForm = {
  displayName: string;
  description: string;
  imageUrl: FileList;
};

export type LocationForm = {
  locationName: any;
  description: any;
  imageUrl: FileList;
};

export type FiltersDataType = {
  id: number;
  forLoggedUser: boolean;
  type: string;
  values: any;
};
