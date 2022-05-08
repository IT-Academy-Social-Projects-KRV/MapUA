/* eslint-disable no-unused-vars */
export interface UserState {
  users: any[];
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
  FETCH_USERS = 'FETCH_USERS',
  FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS',
  FETCH_USERS_ERROR = 'FETCH_USERS_FETCH_USERS_ERROR',

  // Login
  USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST',
  USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS',
  USER_LOGIN_FAIL = 'USER_LOGIN_FAIL',
  USER_LOGOUT = 'USER_LOGOUT'
}

interface FetchUsersAction {
  type: UserActionTypes.FETCH_USERS;
}
interface FetchUsersSuccessAction {
  type: UserActionTypes.FETCH_USERS_SUCCESS;
  payload: any[];
}
interface FetchUsersErrorAction {
  type: UserActionTypes.FETCH_USERS_ERROR;
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
  | FetchUsersAction
  | FetchUsersErrorAction
  | FetchUsersSuccessAction

  // Login
  | LoginUserRequestAction
  | LoginUserSuccessAction
  | LoginUserFailAction
  | LogoutUserAction;
