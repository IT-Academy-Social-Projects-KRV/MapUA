/* eslint-disable no-unused-vars */
export enum UserAuthActionTypes {
  USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST',
  USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS',
  USER_LOGIN_FAIL = 'USER_LOGIN_FAIL',
  USER_LOGOUT = 'USER_LOGOUT'
}
interface LoginUserRequestAction {
  type: UserAuthActionTypes.USER_LOGIN_REQUEST;
}
interface LoginUserSuccessAction {
  type: UserAuthActionTypes.USER_LOGIN_SUCCESS;
  payload: { id: string; token: string };
}
interface LoginUserFailAction {
  type: UserAuthActionTypes.USER_LOGIN_FAIL;
  payload: {};
}
interface LogoutUserAction {
  type: UserAuthActionTypes.USER_LOGOUT;
}

export type UserAuthAction =
  | LoginUserRequestAction
  | LoginUserSuccessAction
  | LoginUserFailAction
  | LogoutUserAction;
