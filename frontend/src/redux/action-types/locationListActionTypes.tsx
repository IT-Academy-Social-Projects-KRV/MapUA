/* eslint-disable no-unused-vars */
import { locationType, topLocationType } from '../../../types';

export enum LocationListActionsType {
  FETCH_LOCATION_LIST_LOADING = 'FETCH_LOCATION_LIST_LOADING',
  FETCH_LOCATION_LIST_SUCCESS = 'FETCH_LOCATION_LIST_SUCCESS',
  FETCH_LOCATION_LIST_ERROR = 'FETCH_LOCATION_LIST_ERROR',
  FETCH_TOP_LOCATIONS_LOADING = 'FETCH_TOP_LOCATIONS_LOADING',
  FETCH_TOP_LOCATIONS_SUCCESS = 'FETCH_TOP_LOCATIONS_SUCCESS',
  FETCH_TOP_LOCATIONS_ERROR = 'FETCH_TOP_LOCATIONS_ERROR'
}

interface FetchLocationListLoadingAction {
  type: LocationListActionsType.FETCH_LOCATION_LIST_LOADING;
}
interface FetchLocationListSuccessAction {
  type: LocationListActionsType.FETCH_LOCATION_LIST_SUCCESS;
  payload: locationType[];
}
interface FetchLocationListErrorAction {
  type: LocationListActionsType.FETCH_LOCATION_LIST_ERROR;
  payload: string;
}
interface FetchTopLocationLoadingAction {
  type: LocationListActionsType.FETCH_TOP_LOCATIONS_LOADING;
}
interface FetchTopLocationSuccessAction {
  type: LocationListActionsType.FETCH_TOP_LOCATIONS_SUCCESS;
  payload: topLocationType[];
}
interface FetchTopLocationErrorAction {
  type: LocationListActionsType.FETCH_TOP_LOCATIONS_ERROR;
  payload: string;
}

export type LocationListActions =
  | FetchLocationListLoadingAction
  | FetchLocationListSuccessAction
  | FetchLocationListErrorAction
  | FetchTopLocationLoadingAction
  | FetchTopLocationSuccessAction
  | FetchTopLocationErrorAction;
