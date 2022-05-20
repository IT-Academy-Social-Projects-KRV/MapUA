type UserDataType = {
  email: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  displayName: string;
  description: string;
  imageUrl: string;
  subscribers: string[];
  subscriptions: string[];
};

export type UserState = {
  data: UserDataType;
  loading: boolean;
  error: null | string;
};
