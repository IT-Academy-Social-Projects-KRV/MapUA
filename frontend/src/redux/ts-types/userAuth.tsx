export type UserLoginState = {
  loading: boolean;
  error: {} | null;
  isAuthorized: boolean;
  id: string;
  token: string;
};
