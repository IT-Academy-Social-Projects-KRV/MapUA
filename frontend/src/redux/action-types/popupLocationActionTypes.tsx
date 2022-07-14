import { locationPopupType } from '../../../types';

/* eslint-disable no-unused-vars */
export enum LocationActionTypes {
  FETCH_LOCATION_LOADING = 'FETCH_LOCATION_LOADING',
  FETCH_LOCATION_SUCCESS = 'FETCH_LOCATION_SUCCESS',
  FETCH_LOCATION_ERROR = 'FETCH_LOCATION_ERROR',

  TOGGLE_VISITED_FIELD_LOADING = 'TOGGLE_VISITED_FIELD_LOADING',
  TOGGLE_VISITED_FIELD_SUCCESS = 'TOGGLE_VISITED_FIELD_SUCCESS',
  TOGGLE_VISITED_FIELD_ERROR = 'TOGGLE_VISITED_FIELD_ERROR',

  TOGGLE_FAVORITE_FIELD_LOADING = 'TOGGLE_FAVORITE_FIELD_LOADING',
  TOGGLE_FAVORITE_FIELD_SUCCESS = 'TOGGLE_FAVORITE_FIELD_SUCCESS',
  TOGGLE_FAVORITE_FIELD_ERROR = 'TOGGLE_FAVORITE_FIELD_ERROR',

  UPDATE_LOCATION_LOADING = 'UPDATE_LOCATION_LOADING',
  UPDATE_LOCATION_SUCCESS = 'UPDATE_LOCATION_SUCCESS',
  UPDATE_LOCATION_ERROR = 'UPDATE_LOCATION_ERROR',

  ADD_COMMENT_LOADING = 'ADD_COMMENT_LOADING',
  ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS',
  ADD_COMMENT_ERROR = 'ADD_COMMENT_ERROR',

  UPDATE_LOCATION_DATA_LOADING = 'UPDATE_LOCATION_DATA_LOADING',
  UPDATE_LOCATION_DATA_SUCCESS = 'UPDATE_LOCATION_DATA_SUCCESS',
  UPDATE_LOCATION_DATA_ERROR = 'UPDATE_LOCATION_DATA_ERROR',

  ADD_REPORT_TO_LOCATION_LOADING = 'ADD_REPORT_TO_LOCATION_LOADING',
  ADD_REPORT_TO_LOCATION_SUCCESS = 'ADD_REPORT_TO_LOCATION_SUCCESS',
  ADD_REPORT_TO_LOCATION_ERROR = 'ADD_REPORT_TO_LOCATION_ERROR',

  DELETE_REPORT_TO_LOCATION_LOADING = 'DELETE_REPORT_TO_LOCATION_LOADING',
  DELETE_REPORT_TO_LOCATION_SUCCESS = 'DELETE_REPORT_TO_LOCATION_SUCCESS',
  DELETE_REPORT_TO_LOCATION_ERROR = 'DELETE_REPORT_TO_LOCATION_ERROR',

  LOCATION_DATA_CLEAR = 'LOCATION_DATA_CLEAR'
}

interface FetchLocationLoadingAction {
  type: LocationActionTypes.FETCH_LOCATION_LOADING;
}
interface FetchLocationSuccessAction {
  type: LocationActionTypes.FETCH_LOCATION_SUCCESS;
  payload: locationPopupType;
}
interface FetchLocationErrorAction {
  type: LocationActionTypes.FETCH_LOCATION_ERROR;
  payload: string;
}

interface ToggleVisitedFieldLoadingAction {
  type: LocationActionTypes.TOGGLE_VISITED_FIELD_LOADING;
}
interface ToggleVisitedFieldSuccessAction {
  type: LocationActionTypes.TOGGLE_VISITED_FIELD_SUCCESS;
  payload: locationPopupType;
}
interface ToggleVisitedFieldErrorAction {
  type: LocationActionTypes.TOGGLE_VISITED_FIELD_ERROR;
  payload: string;
}

interface ToggleFavoriteFieldLoadingAction {
  type: LocationActionTypes.TOGGLE_FAVORITE_FIELD_LOADING;
}
interface ToggleFavoriteFieldSuccessAction {
  type: LocationActionTypes.TOGGLE_FAVORITE_FIELD_SUCCESS;
  payload: locationPopupType;
}
interface ToggleFavoriteFieldErrorAction {
  type: LocationActionTypes.TOGGLE_FAVORITE_FIELD_ERROR;
  payload: string;
}

interface UpdateLocationLoadingAction {
  type: LocationActionTypes.UPDATE_LOCATION_LOADING;
}
interface UpdateLocationSuccessAction {
  type: LocationActionTypes.UPDATE_LOCATION_SUCCESS;
  payload: locationPopupType;
}
interface UpdateLocationErrorAction {
  type: LocationActionTypes.UPDATE_LOCATION_ERROR;
  payload: string;
}
interface UpdateLocationDataLoadingAction {
  type: LocationActionTypes.UPDATE_LOCATION_DATA_LOADING;
}
interface UpdateLocationDataSuccessAction {
  type: LocationActionTypes.UPDATE_LOCATION_DATA_SUCCESS;
  payload: locationPopupType;
}
interface UpdateLocationDataErrorAction {
  type: LocationActionTypes.UPDATE_LOCATION_DATA_ERROR;
  payload: string;
}

interface AddReportToLocationDataLoadingAction {
  type: LocationActionTypes.ADD_REPORT_TO_LOCATION_LOADING;
}
interface AddReportToLocationDataSuccessAction {
  type: LocationActionTypes.ADD_REPORT_TO_LOCATION_SUCCESS;
  payload: locationPopupType;
}
interface AddReportToLocationDataErrorAction {
  type: LocationActionTypes.ADD_REPORT_TO_LOCATION_ERROR;
  payload: string;
}

interface DeclineReportToLocationDataLoadingAction {
  type: LocationActionTypes.DELETE_REPORT_TO_LOCATION_LOADING;
}
interface DeclineReportToLocationDataSuccsessAction {
  type: LocationActionTypes.DELETE_REPORT_TO_LOCATION_SUCCESS;
  payload: locationPopupType;
}
interface DeclineReportToLocationDataErrorAction {
  type: LocationActionTypes.DELETE_REPORT_TO_LOCATION_ERROR;
  payload: string;
}

interface LocationDataClearAction {
  type: LocationActionTypes.LOCATION_DATA_CLEAR;
}

export type LocationActions =
  | FetchLocationLoadingAction
  | FetchLocationSuccessAction
  | FetchLocationErrorAction
  | ToggleVisitedFieldLoadingAction
  | ToggleVisitedFieldSuccessAction
  | ToggleVisitedFieldErrorAction
  | ToggleFavoriteFieldLoadingAction
  | ToggleFavoriteFieldSuccessAction
  | ToggleFavoriteFieldErrorAction
  | UpdateLocationLoadingAction
  | UpdateLocationSuccessAction
  | UpdateLocationErrorAction
  | UpdateLocationDataLoadingAction
  | UpdateLocationDataSuccessAction
  | UpdateLocationDataErrorAction
  | AddReportToLocationDataLoadingAction
  | AddReportToLocationDataSuccessAction
  | AddReportToLocationDataErrorAction
  | DeclineReportToLocationDataLoadingAction
  | DeclineReportToLocationDataSuccsessAction
  | DeclineReportToLocationDataErrorAction
  | LocationDataClearAction;
