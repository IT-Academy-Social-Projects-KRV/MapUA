import { locationRatingType } from '../../../types';

/* eslint-disable no-unused-vars */
export enum LocationRatingActionTypes {
  FETCH_LOCATION_RATING_LOADING = 'FETCH_LOCATION_RATING_LOADING',
  FETCH_LOCATION_RATING_SUCCESS = 'FETCH_LOCATION_RATING_SUCCESS',
  FETCH_LOCATION_RATING_ERROR = 'FETCH_LOCATION_RATING_ERROR',

  UPDATE_LOCATION_RATING_LOADING = 'UPDATE_LOCATION_RATING_LOADING',
  UPDATE_LOCATION_RATING_SUCCESS = 'UPDATE_LOCATION_RATING_SUCCESS',
  UPDATE_LOCATION_RATING_ERROR = 'UPDATE_LOCATION_RATING_ERROR'
}

interface FetchLocationRatingLoadingAction {
  type: LocationRatingActionTypes.FETCH_LOCATION_RATING_LOADING;
}
interface FetchLocationRatingSuccessAction {
  type: LocationRatingActionTypes.FETCH_LOCATION_RATING_SUCCESS;
  payload: locationRatingType;
}
interface FetchLocationRatingErrorAction {
  type: LocationRatingActionTypes.FETCH_LOCATION_RATING_ERROR;
  payload: string;
}

interface UpdateLocationRatingLoadingAction {
  type: LocationRatingActionTypes.UPDATE_LOCATION_RATING_LOADING;
}
interface UpdateLocationRatingSuccessAction {
  type: LocationRatingActionTypes.UPDATE_LOCATION_RATING_SUCCESS;
  payload: locationRatingType;
}
interface UpdateLocationRatingErrorAction {
  type: LocationRatingActionTypes.UPDATE_LOCATION_RATING_ERROR;
  payload: string;
}

export type LocationRatingActions =
  | FetchLocationRatingLoadingAction
  | FetchLocationRatingSuccessAction
  | FetchLocationRatingErrorAction
  | UpdateLocationRatingLoadingAction
  | UpdateLocationRatingSuccessAction
  | UpdateLocationRatingErrorAction;
