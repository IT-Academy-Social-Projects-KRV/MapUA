import { PrivateUserDataType } from '../../../types';

/* eslint-disable no-unused-vars */
export enum PrivateUserDataActionTypes {
  FETCH_PRIVATE_USER_DATA_LOADING = 'FETCH_PRIVATE_USER_DATA_LOADING',
  FETCH_PRIVATE_USER_DATA_SUCCESS = 'FETCH_PRIVATE_USER_DATA_SUCCESS',
  FETCH_PRIVATE_USER_DATA_ERROR = 'FETCH_PRIVATE_USER_DATA_ERROR',
  UPDATE_PRIVATE_USER_DATA_LOADING = 'UPDATE_PRIVATE_USER_DATA_LOADING',
  UPDATE_PRIVATE_USER_DATA_SUCCESS = 'UPDATE_PRIVATE_USER_DATA_SUCCESS',
  UPDATE_PRIVATE_USER_DATA_ERROR = 'UPDATE_PRIVATE_USER_DATA_ERROR',
  DELETE_PRIVATE_USER_DATA = 'DELETE_PRIVATE_USER_DATA'
}

interface FetchPrivateUserDataLoadingAction {
  type: PrivateUserDataActionTypes.FETCH_PRIVATE_USER_DATA_LOADING;
}
interface FetchPrivateUserDataSuccessAction {
  type: PrivateUserDataActionTypes.FETCH_PRIVATE_USER_DATA_SUCCESS;
  payload: PrivateUserDataType;
}
interface FetchPrivateUserDataErrorAction {
  type: PrivateUserDataActionTypes.FETCH_PRIVATE_USER_DATA_ERROR;
  payload: string;
}

interface UpdatePrivateUserDataLoadingAction {
  type: PrivateUserDataActionTypes.UPDATE_PRIVATE_USER_DATA_LOADING;
}
interface UpdatePrivateUserDataSuccessAction {
  type: PrivateUserDataActionTypes.UPDATE_PRIVATE_USER_DATA_SUCCESS;
  payload: Partial<PrivateUserDataType>;
}
interface UpdatePrivateUserDataErrorAction {
  type: PrivateUserDataActionTypes.UPDATE_PRIVATE_USER_DATA_ERROR;
  payload: string;
}

interface DeleteUserDataErrorAction {
  type: PrivateUserDataActionTypes.DELETE_PRIVATE_USER_DATA;
}

export type PrivateUserDataAction =
  | FetchPrivateUserDataLoadingAction
  | FetchPrivateUserDataErrorAction
  | FetchPrivateUserDataSuccessAction
  | UpdatePrivateUserDataLoadingAction
  | UpdatePrivateUserDataSuccessAction
  | UpdatePrivateUserDataErrorAction
  | DeleteUserDataErrorAction;
