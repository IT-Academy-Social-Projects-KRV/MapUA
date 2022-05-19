export type UserLoginState = {
  loading: boolean;
  error: {} | null;
  isLogged: boolean;
  userInfo: UserInfo;
};

export type UserInfo = {
  user: User;
  token: string;
};

export type User = {
  email: string;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
};
