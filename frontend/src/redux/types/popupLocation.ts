/* eslint-disable no-unused-vars */
export interface locationState {
  _id: string;
  locationName: string;
  rating: {
    likes: string[];
    dislikes: string[];
  };
  coordinates: [number, number];
  arrayPhotos: string[];
  description: string;
  comments: string[];
  isLoading: boolean;
}
export enum LocationActionTypes {
  FETCH_lOCATION = 'FETCH_lOCATION',
  UPDATE_LOCATION = 'UPDATE_LOCATION',
  LOADING_START = 'LOADING_START',
  LOADING_END = 'LOADING_END'
}
interface FetchLocationAction {
  type: LocationActionTypes.FETCH_lOCATION;
  payload: locationState;
}
interface UpdateLocationAction {
  type: LocationActionTypes.UPDATE_LOCATION;
  payload: locationState;
}
interface StartLoadingLocationAction {
  type: LocationActionTypes.LOADING_START;
}
interface EndLoadingLocationAction {
  type: LocationActionTypes.LOADING_END;
}

export type LocationActions =
  | FetchLocationAction
  | UpdateLocationAction
  | StartLoadingLocationAction
  | EndLoadingLocationAction;
