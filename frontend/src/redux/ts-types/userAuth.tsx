export type UserAuthState = {
  loading: boolean;
  error: {} | null;
  isAuthorized: boolean;
  id: string;
  token: string;
};
