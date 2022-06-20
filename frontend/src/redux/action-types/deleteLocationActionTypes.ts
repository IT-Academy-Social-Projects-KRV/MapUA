/* eslint-disable no-unused-vars */
export enum DeleteLocationActionTypes {
  DELETE_LOCATION_LOADING = 'DELETE_LOCATION_LOADING',
  DELETE_LOCATION_SUCCESS = 'DELETE_LOCATION_SUCCESS',
  DELETE_LOCATION_ERROR = 'DELETE_LOCATION_ERROR',
  DELETE_LOCATION_RESET = 'DELETE_LOCATION_RESET'
}

interface DeleteLocationLoadingAction {
  type: DeleteLocationActionTypes.DELETE_LOCATION_LOADING;
}
interface DeleteLocationSuccessAction {
  type: DeleteLocationActionTypes.DELETE_LOCATION_SUCCESS;
}
interface DeleteLocationErrorAction {
  type: DeleteLocationActionTypes.DELETE_LOCATION_ERROR;
  payload: string;
}

interface DeleteLocationResetAction {
  type: DeleteLocationActionTypes.DELETE_LOCATION_RESET;
}
export type DeleteLocationActions =
  | DeleteLocationLoadingAction
  | DeleteLocationSuccessAction
  | DeleteLocationErrorAction
  | DeleteLocationResetAction;
