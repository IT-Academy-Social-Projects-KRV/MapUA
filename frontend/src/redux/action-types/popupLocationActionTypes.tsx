import { locationType, Comment } from '../../../types';

/* eslint-disable no-unused-vars */
export enum LocationActionTypes {
  FETCH_LOCATION_LOADING = 'FETCH_LOCATION_LOADING',
  FETCH_LOCATION_SUCCESS = 'FETCH_LOCATION_SUCCESS',
  FETCH_LOCATION_ERROR = 'FETCH_LOCATION_ERROR',

  UPDATE_LOCATION_LOADING = 'UPDATE_LOCATION_LOADING',
  UPDATE_LOCATION_SUCCESS = 'UPDATE_LOCATION_SUCCESS',
  UPDATE_LOCATION_ERROR = 'UPDATE_LOCATION_ERROR',

  ADD_COMMENT_LOADING = 'ADD_COMMENT_LOADING',
  ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS',
  ADD_COMMENT_ERROR = 'ADD_COMMENT_ERROR'
}

interface FetchLocationLoadingAction {
  type: LocationActionTypes.FETCH_LOCATION_LOADING;
}
interface FetchLocationSuccessAction {
  type: LocationActionTypes.FETCH_LOCATION_SUCCESS;
  payload: locationType;
}
interface FetchLocationErrorAction {
  type: LocationActionTypes.FETCH_LOCATION_ERROR;
  payload: string;
}

interface UpdateLocationLoadingAction {
  type: LocationActionTypes.UPDATE_LOCATION_LOADING;
}
interface UpdateLocationSuccessAction {
  type: LocationActionTypes.UPDATE_LOCATION_SUCCESS;
  payload: locationType;
}
interface UpdateLocationErrorAction {
  type: LocationActionTypes.UPDATE_LOCATION_ERROR;
  payload: string;
}

interface AddCommentLoadingAction {
  type: LocationActionTypes.ADD_COMMENT_LOADING;
}
interface AddCommentSuccessAction {
  type: LocationActionTypes.ADD_COMMENT_SUCCESS;
  payload: Comment;
}
interface AddCommentErrorAction {
  type: LocationActionTypes.ADD_COMMENT_ERROR;
  payload: string;
}

export type LocationActions =
  | FetchLocationLoadingAction
  | FetchLocationSuccessAction
  | FetchLocationErrorAction
  | UpdateLocationLoadingAction
  | UpdateLocationSuccessAction
  | UpdateLocationErrorAction
  | AddCommentLoadingAction
  | AddCommentSuccessAction
  | AddCommentErrorAction;
