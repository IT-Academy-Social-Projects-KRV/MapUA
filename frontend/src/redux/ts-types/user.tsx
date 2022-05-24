type UserDataType = {
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

export type UserState = {
  data: UserDataType;
  loading: boolean;
  error: null | string;
};
export type UserForm = {
  displayName: string;
  description: string;
  imageUrl: FileList;
};
