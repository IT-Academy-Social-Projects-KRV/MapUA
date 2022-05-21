/* eslint-disable no-unused-vars */
export enum UserAuthActionTypes {
  USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST',
  USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS',
  USER_LOGIN_FAIL = 'USER_LOGIN_FAIL',
  USER_LOGOUT = 'USER_LOGOUT',
  // Check if user authorized every time when component mounted
  IF_USER_AUTORIZED_REQUEST = 'IF_USER_AUTORIZED_REQUEST',
  IF_USER_AUTORIZED_SUCCESS = 'IF_USER_AUTORIZED_SUCCESS',
  IF_USER_AUTORIZED_ERROR = 'IF_USER_AUTORIZED_ERROR'
}
interface LoginUserRequestAction {
  type: UserAuthActionTypes.USER_LOGIN_REQUEST;
}
interface LoginUserSuccessAction {
  type: UserAuthActionTypes.USER_LOGIN_SUCCESS;
  payload: { user: { _id: string }; token: string };
}
interface LoginUserFailAction {
  type: UserAuthActionTypes.USER_LOGIN_FAIL;
  payload: {};
}
interface LogoutUserAction {
  type: UserAuthActionTypes.USER_LOGOUT;
}
// Check if user authorized every time when component mounted
interface IsUserAuthorizedRequestAction {
  type: UserAuthActionTypes.IF_USER_AUTORIZED_REQUEST;
}
interface IsUserAuthorizedSucsessAction {
  type: UserAuthActionTypes.IF_USER_AUTORIZED_SUCCESS;
  payload: boolean;
}
interface IsUserAuthorizedErrorAction {
  type: UserAuthActionTypes.IF_USER_AUTORIZED_ERROR;
  payload: string;
}
export type UserAuthAction =
  | LoginUserRequestAction
  | LoginUserSuccessAction
  | LoginUserFailAction
  | LogoutUserAction
  // Check if user authorized every time when component mounted
  | IsUserAuthorizedRequestAction
  | IsUserAuthorizedSucsessAction
  | IsUserAuthorizedErrorAction;
