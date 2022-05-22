export type UserLoginState = {
  loading: boolean;
  error: {} | null;
  isLogged: boolean;
  isAuthorized: boolean;
  id: string;
  token: string;
};
