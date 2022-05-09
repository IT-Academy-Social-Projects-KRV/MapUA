/* eslint-disable no-unused-vars */
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

export interface UserState {
  data: UserDataType;
  loading: boolean;
  error: null | string;
}

// Login
export interface UserLoginState {
  loading: boolean;
  error: {} | null;
  isLogged: boolean;
  userInfo: {};
}

export enum UserActionTypes {
  FETCH_USER = 'FETCH_USER',
  FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS',
  FETCH_USER_ERROR = 'FETCH_USER_ERROR',

  // Login
  USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST',
  USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS',
  USER_LOGIN_FAIL = 'USER_LOGIN_FAIL',
  USER_LOGOUT = 'USER_LOGOUT'
}
interface FetchUserAction {
  type: UserActionTypes.FETCH_USER;
}
interface FetchUserSuccessAction {
  type: UserActionTypes.FETCH_USER_SUCCESS;
  payload: UserDataType;
}
interface FetchUserErrorAction {
  type: UserActionTypes.FETCH_USER_ERROR;
  payload: string;
}

// Login
interface LoginUserRequestAction {
  type: UserActionTypes.USER_LOGIN_REQUEST;
}
interface LoginUserSuccessAction {
  type: UserActionTypes.USER_LOGIN_SUCCESS;
  payload: string;
}
interface LoginUserFailAction {
  type: UserActionTypes.USER_LOGIN_FAIL;
  payload: {};
}
interface LogoutUserAction {
  type: UserActionTypes.USER_LOGOUT;
}

export type UserAction =
  | FetchUserAction
  | FetchUserErrorAction
  | FetchUserSuccessAction
  // Login
  | LoginUserRequestAction
  | LoginUserSuccessAction
  | LoginUserFailAction
  | LogoutUserAction;
