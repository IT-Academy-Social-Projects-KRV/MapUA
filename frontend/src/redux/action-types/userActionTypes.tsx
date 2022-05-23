import { UserDataType } from '../../../types';

/* eslint-disable no-unused-vars */
export enum UserActionTypes {
  FETCH_USER = 'FETCH_USER',
  FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS',
  FETCH_USER_ERROR = 'FETCH_USER_ERROR',
  UPDATE_USER = 'UPDATE_USER'
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
interface UpdateUserAction {
  type: UserActionTypes.UPDATE_USER;
  payload: Partial<UserDataType>;
}

export type UserAction =
  | UpdateUserAction
  | FetchUserAction
  | FetchUserErrorAction
  | FetchUserSuccessAction;
