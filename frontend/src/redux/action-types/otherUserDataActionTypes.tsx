import { UserDataType } from '../../../types';
/* eslint-disable no-unused-vars */
export enum OtherUserDataActionTypes {
  FETCH_OTHER_USER_DATA_LOADING = 'FETCH_OTHER_USER_DATA_LOADING',
  FETCH_OTHER_USER_DATA_SUCCESS = 'FETCH_OTHER_USER_DATA_SUCCESS',
  FETCH_OTHER_USER_DATA_ERROR = 'FETCH_OTHER_USER_DATA_ERROR'
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

export type OtherUserDataAction =
  | FetchOtherUserLoadingAction
  | FetchOtherUserSuccessAction
  | FetchOtherUserErrorAction;
