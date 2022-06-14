import { UserDataType } from '../../../types';

/* eslint-disable no-unused-vars */
export enum UserDataActionTypes {
  FETCH_USER_DATA_LOADING = 'FETCH_USER_DATA_LOADING',
  FETCH_USER_DATA_SUCCESS = 'FETCH_USER_DATA_SUCCESS',
  FETCH_USER_DATA_ERROR = 'FETCH_USER_DATA_ERROR',
  UPDATE_USER_DATA_LOADING = 'UPDATE_USER_DATA_LOADING',
  UPDATE_USER_DATA_SUCCESS = 'UPDATE_USER_DATA_SUCCESS',
  UPDATE_USER_DATA_ERROR = 'UPDATE_USER_DATA_ERROR',
  DELETE_USER_DATA = 'DELETE_USER_DATA'
  // UPDATE_USER_SUBSCRIPTION_DATA_LOADING = 'UPDATE_USER_SUBSCRIPTION_DATA_LOADING',
  // UPDATE_USER_DATA_SUBSCRIPTION_SUCCESS = 'UPDATE_USER_DATA_SUBSCRIPTION_SUCCESS'
}

interface FetchUserDataLoadingAction {
  type: UserDataActionTypes.FETCH_USER_DATA_LOADING;
}
interface FetchUserDataSuccessAction {
  type: UserDataActionTypes.FETCH_USER_DATA_SUCCESS;
  payload: UserDataType;
}
interface FetchUserDataErrorAction {
  type: UserDataActionTypes.FETCH_USER_DATA_ERROR;
  payload: string;
}

interface UpdateUserDataLoadingAction {
  type: UserDataActionTypes.UPDATE_USER_DATA_LOADING;
}
interface UpdateUserDataSuccessAction {
  type: UserDataActionTypes.UPDATE_USER_DATA_SUCCESS;
  payload: Partial<UserDataType>;
}

// interface UpdateUserDataLoadingAction {
//   type: UserDataActionTypes.UPDATE_USER_SUBSCRIPTION_DATA_LOADING;
// }
// interface UpdateUserDataSuccessAction {
//   type: UserDataActionTypes.UPDATE_USER_SUBSCRIPTION_DATA_LOADING;
//   payload: Partial<UserDataType>;
// }
interface UpdateUserDataErrorAction {
  type: UserDataActionTypes.UPDATE_USER_DATA_ERROR;
  payload: string;
}

interface DeleteUserDataErrorAction {
  type: UserDataActionTypes.DELETE_USER_DATA;
}

export type UserDataAction =
  | FetchUserDataLoadingAction
  | FetchUserDataErrorAction
  | FetchUserDataSuccessAction
  | UpdateUserDataLoadingAction
  | UpdateUserDataSuccessAction
  | UpdateUserDataErrorAction
  | DeleteUserDataErrorAction;
