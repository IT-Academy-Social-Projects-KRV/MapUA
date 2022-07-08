import { UserDataType } from '../../../types';

/* eslint-disable no-unused-vars */
export enum OtherUserDataActionTypes {
  FETCH_OTHER_USER_DATA_LOADING = 'FETCH_OTHER_USER_DATA_LOADING',
  FETCH_OTHER_USER_DATA_SUCCESS = 'FETCH_OTHER_USER_DATA_SUCCESS',
  FETCH_OTHER_USER_DATA_ERROR = 'FETCH_OTHER_USER_DATA_ERROR',
  UPDATE_OTHER_USER_DATA_LOADING = 'UPDATE_OTHER_USER_DATA_LOADING',
  UPDATE_OTHER_USER_DATA_SUCCESS = 'UPDATE_OTHER_USER_DATA_SUCCESS',
  UPDATE_OTHER_USER_DATA_ERROR = 'UPDATE_OTHER_USER_DATA_ERROR',

  UPDATE_USER_DATA_AND_BAN_LOADING = 'UPDATE_USER_DATA_AND_BAN_LOADING',
  UPDATE_USER_DATA_AND_BAN_SUCCESS = 'UPDATE_USER_DATA_AND_BAN_SUCCESS',
  UPDATE_USER_DATA_AND_BAN_ERROR = 'UPDATE_USER_DATA_AND_BAN_ERROR'
}
interface FetchOtherUserLoadingAction {
  type: OtherUserDataActionTypes.FETCH_OTHER_USER_DATA_LOADING;
}
interface FetchOtherUserSuccessAction {
  type: OtherUserDataActionTypes.FETCH_OTHER_USER_DATA_SUCCESS;
  payload: UserDataType;
}
interface FetchOtherUserErrorAction {
  type: OtherUserDataActionTypes.FETCH_OTHER_USER_DATA_ERROR;
  payload: string;
}

interface UpdateOtherUserLoadingAction {
  type: OtherUserDataActionTypes.UPDATE_OTHER_USER_DATA_LOADING;
}
interface UpdateOtherUserSuccessAction {
  type: OtherUserDataActionTypes.UPDATE_OTHER_USER_DATA_SUCCESS;
  payload: Partial<UserDataType>;
}
interface UpdateOtherUserErrorAction {
  type: OtherUserDataActionTypes.UPDATE_OTHER_USER_DATA_ERROR;
  payload: string;
}

interface UpdateUserDataAndBanLoadingAction {
  type: OtherUserDataActionTypes.UPDATE_USER_DATA_AND_BAN_LOADING;
}
interface UpdateUserDataAndBanSuccessAction {
  type: OtherUserDataActionTypes.UPDATE_USER_DATA_AND_BAN_SUCCESS;
  payload: UserDataType;
}
interface UpdateUserDataAndBanErrorAction {
  type: OtherUserDataActionTypes.UPDATE_USER_DATA_AND_BAN_ERROR;
  payload: string;
}

export type OtherUserDataAction =
  | FetchOtherUserLoadingAction
  | FetchOtherUserSuccessAction
  | FetchOtherUserErrorAction
  | UpdateOtherUserLoadingAction
  | UpdateOtherUserSuccessAction
  | UpdateOtherUserErrorAction
  | UpdateUserDataAndBanLoadingAction
  | UpdateUserDataAndBanSuccessAction
  | UpdateUserDataAndBanErrorAction;
