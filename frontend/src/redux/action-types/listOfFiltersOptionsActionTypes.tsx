/* eslint-disable no-unused-vars */
export enum ListOfFiltersOptionsActionTypes {
  SET_AUTHORIZED_LIST_OF_FILTERS_OPTIONS = 'SET_AUTHORIZED_FILTERS_OPTIONS',
  SET_UNAUTHORIZED_LIST_OF_FILTERS_OPTIONS = 'SET_UNAUTHORIZED_FILTERS_OPTIONS'
}

interface SetAuthorizedListOfFiltersOptionsAction {
  type: ListOfFiltersOptionsActionTypes.SET_AUTHORIZED_LIST_OF_FILTERS_OPTIONS;
  payload: string[];
}
interface SetUnauthorizedListOfFiltersOptionsAction {
  type: ListOfFiltersOptionsActionTypes.SET_UNAUTHORIZED_LIST_OF_FILTERS_OPTIONS;
}

export type ListOfFiltersOptionsAction =
  | SetAuthorizedListOfFiltersOptionsAction
  | SetUnauthorizedListOfFiltersOptionsAction;
