/* eslint-disable no-unused-vars */
export interface locationsListStateType {
  locations: any[];
  bounds: boundsType;
  zoomPosition: latlngType;
}

export type latlngType = {
  lat: number;
  lng: number;
};

export type boundsType = {
  _northEast?: {
    lat?: number;
    lng?: number;
  };
  _southWest?: {
    lat?: number;
    lng?: number;
  };
};

export enum LocationsListActionsType {
  FETCH_LOCATIONS = 'FETCH_LOCATIONS',
  SET_BOUNDS = 'SET_BOUNDS',
  SET_ZOOM_POSITION = 'SET_ZOM_POSITION'
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

export type LocationListActions =
  | FetchLocationAction
  | SetBoundsAction
  | SetZoomPositionAction;
