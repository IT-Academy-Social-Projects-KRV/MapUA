/* eslint-disable no-unused-vars */
export interface locationState {
  _id?: string;
  locationName: string;
  rating: {
    likes: number;
    dislikes: number;
  };
  coordinates: [number, number];
  photoSrc: string;
  description: string;
  comments: string[];
  isLoading: boolean;
}
export enum LocationActionTypes {
  FETCH_lOCATION = 'FETCH_lOCATION',
  LOADING_START = 'LOADING_START',
  LOADING_END = 'LOADING_END'
}
interface FetchLocationAction {
  type: LocationActionTypes.FETCH_lOCATION;
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
  | StartLoadingLocationAction
  | EndLoadingLocationAction;
