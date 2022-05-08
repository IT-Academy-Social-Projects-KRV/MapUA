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
export enum UserActionTypes {
  FETCH_USER = 'FETCH_USER',
  FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS',
  FETCH_USER_ERROR = 'FETCH_USER_ERROR'
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
export type UserAction =
  | FetchUserAction
  | FetchUserErrorAction
  | FetchUserSuccessAction;
