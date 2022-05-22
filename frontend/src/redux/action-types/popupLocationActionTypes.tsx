import { locationState, Comment } from 'redux/ts-types/popupLocation';

/* eslint-disable no-unused-vars */

export enum LocationActionTypes {
  FETCH_lOCATION = 'FETCH_lOCATION',
  LOADING_START = 'LOADING_START',
  LOADING_END = 'LOADING_END',
  ADD_COMMENT = 'ADD_COMMENT'
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

interface AddCommentAction {
  type: LocationActionTypes.ADD_COMMENT;
  payload: Comment;
}

export type LocationActions =
  | FetchLocationAction
  | StartLoadingLocationAction
  | EndLoadingLocationAction
  | AddCommentAction;
