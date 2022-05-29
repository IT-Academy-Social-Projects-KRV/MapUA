import {
  locationState,
  Comment,
  AuthorInfo
} from 'redux/ts-types/popupLocation';

/* eslint-disable no-unused-vars */

export enum LocationActionTypes {
  FETCH_lOCATION = 'FETCH_lOCATION',
  UPDATE_LOCATION = 'UPDATE_LOCATION',
  LOADING_START = 'LOADING_START',
  LOADING_END = 'LOADING_END',
  ADD_COMMENT = 'ADD_COMMENT',
  FETCH_COMMENTS = 'FETCH_COMMENTS'
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

interface AddCommentAction {
  type: LocationActionTypes.ADD_COMMENT;
  payload: Comment<AuthorInfo>;
}

interface FetchCommentsAction {
  type: LocationActionTypes.FETCH_COMMENTS;
  payload: Comment<AuthorInfo>[];
}

export type LocationActions =
  | FetchLocationAction
  | UpdateLocationAction
  | StartLoadingLocationAction
  | EndLoadingLocationAction
  | AddCommentAction
  | FetchCommentsAction;
