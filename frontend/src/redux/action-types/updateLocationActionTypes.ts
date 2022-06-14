import { updateLocationType } from '../../../types';

/* eslint-disable no-unused-vars */
export enum LocationDataActionTypes {
  UPDATE_LOCATION_DATA_LOADING = 'UPDATE_LOCATION_DATA_LOADING',
  UPDATE_LOCATION_DATA_SUCCESS = 'UPDATE_LOCATION_DATA_SUCCESS',
  UPDATE_LOCATION_DATA_ERROR = 'UPDATE_LOCATION_DATA_ERROR'
}

interface UpdateLocationDataLoadingAction {
  type: LocationDataActionTypes.UPDATE_LOCATION_DATA_LOADING;
}
interface UpdateLocationDataSuccessAction {
  type: LocationDataActionTypes.UPDATE_LOCATION_DATA_SUCCESS;
  payload: updateLocationType;
}
interface UpdateLocationDataErrorAction {
  type: LocationDataActionTypes.UPDATE_LOCATION_DATA_ERROR;
  payload: string;
}

export type LocationDataAction =
  | UpdateLocationDataLoadingAction
  | UpdateLocationDataSuccessAction
  | UpdateLocationDataErrorAction;
