/* eslint-disable no-unused-vars */
export enum CreateLocationActionTypes {
  CREATE_LOCATION_LOADING = 'CREATE_LOCATION_LOADING',
  CREATE_LOCATION_SUCCESS = 'CREATE_LOCATION_SUCCESS',
  CREATE_LOCATION_ERROR = 'CREATE_LOCATION_ERROR',
  AFTER_CREATE_LOCATION_RESET = 'AFTER_CREATE_LOCATION_RESET'
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
interface AfterCreateLocationReset {
  type: CreateLocationActionTypes.AFTER_CREATE_LOCATION_RESET;
}
export type CreateLocationAction =
  | CreateLocationLoadingAction
  | CreateLocationSuccessAction
  | CreateLocationErrorAction
  | AfterCreateLocationReset;
