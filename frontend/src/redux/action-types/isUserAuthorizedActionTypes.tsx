/* eslint-disable no-unused-vars */
export enum IsUserAuthorizedActionTypes {
  LOGIN_USER_LOADING = 'LOGIN_USER_LOADING',
  LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS',
  LOGIN_USER_ERROR = 'LOGIN_USER_ERROR',
  CHECK_USER_TOKEN_LOADING = 'CHECK_USER_TOKEN_LOADING',
  CHECK_USER_TOKEN_SUCCESS = 'CHECK_USER_TOKEN_SUCCESS',
  CHECK_USER_TOKEN_ERROR = 'CHECK_USER_TOKEN_ERROR',
  LOGOUT_USER = 'LOGOUT_USER'
}

interface LoginUserLoadingAction {
  type: IsUserAuthorizedActionTypes.LOGIN_USER_LOADING;
}
interface LoginUserSuccessAction {
  type: IsUserAuthorizedActionTypes.LOGIN_USER_SUCCESS;
  payload: string;
}
interface LoginUserErrorAction {
  type: IsUserAuthorizedActionTypes.LOGIN_USER_ERROR;
  payload: string;
}

interface CheckUserTokenLoadingAction {
  type: IsUserAuthorizedActionTypes.CHECK_USER_TOKEN_LOADING;
}
interface CheckUserTokenSuccessAction {
  type: IsUserAuthorizedActionTypes.CHECK_USER_TOKEN_SUCCESS;
  payload: string;
}
interface CheckUserTokenErrorAction {
  type: IsUserAuthorizedActionTypes.CHECK_USER_TOKEN_ERROR;
  payload: string;
}

interface LogoutUserAction {
  type: IsUserAuthorizedActionTypes.LOGOUT_USER;
}
export type isUserAuthorizedAction =
  | LoginUserLoadingAction
  | LoginUserSuccessAction
  | LoginUserErrorAction
  | CheckUserTokenLoadingAction
  | CheckUserTokenSuccessAction
  | CheckUserTokenErrorAction
  | LogoutUserAction;
