/* eslint-disable no-unused-vars */
export enum CreateLocationActionTypes {
  CREATE_LOCATION_LOADING = 'CREATE_LOCATION_LOADING',
  CREATE_LOCATION_SUCCESS = 'CREATE_LOCATION_SUCCESS',
  CREATE_LOCATION_ERROR = 'CREATE_LOCATION_ERROR'
}

interface CreateLocationLoadingAction {
  type: CreateLocationActionTypes.CREATE_LOCATION_LOADING;
}
interface CreateLocationSuccessAction {
  type: CreateLocationActionTypes.CREATE_LOCATION_SUCCESS;
}
interface CreateLocationErrorAction {
  type: CreateLocationActionTypes.CREATE_LOCATION_ERROR;
  payload: string;
}

export type CreateLocationAction =
  | CreateLocationLoadingAction
  | CreateLocationSuccessAction
  | CreateLocationErrorAction;
