/* eslint-disable no-unused-vars */
import { locationType } from '../../../types';

export enum LocationListActionsType {
  FETCH_LOCATION_LIST_LOADING = 'FETCH_LOCATION_LIST_LOADING',
  FETCH_LOCATION_LIST_SUCCESS = 'FETCH_LOCATION_LIST_SUCCESS',
  FETCH_LOCATION_LIST_ERROR = 'FETCH_LOCATION_LIST_ERROR'
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

export type LocationListActions =
  | FetchLocationListLoadingAction
  | FetchLocationListSuccessAction
  | FetchLocationListErrorAction;
