import { boundsType, latlngType } from '../../../types';

/* eslint-disable no-unused-vars */
export interface locationsListStateType {
  locations: any[];
  bounds: boundsType;
  zoomPosition: latlngType;
  locationName: string;
}

export enum LocationsListActionsType {
  FETCH_LOCATIONS = 'FETCH_LOCATIONS',
  SET_BOUNDS = 'SET_BOUNDS',
  SET_ZOOM_POSITION = 'SET_ZOM_POSITION',
  GET_LOCATION_NAME = 'GET_LOCATION_NAME'
}
interface FetchLocationAction {
  type: LocationsListActionsType.FETCH_LOCATIONS;
  payload: any[];
}

interface SetBoundsAction {
  type: LocationsListActionsType.SET_BOUNDS;
  payload: boundsType;
}

interface SetZoomPositionAction {
  type: LocationsListActionsType.SET_ZOOM_POSITION;
  payload: latlngType;
}
interface GetLocationNameAction {
  type: LocationsListActionsType.GET_LOCATION_NAME;
  payload: any;
}

export type LocationListActions =
  | FetchLocationAction
  | SetBoundsAction
  | SetZoomPositionAction
  | GetLocationNameAction;
