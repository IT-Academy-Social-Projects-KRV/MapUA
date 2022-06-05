/* eslint-disable no-unused-vars */
export enum ListOfFiltersOptionsActionTypes {
  SET_AUTHORIZED_LIST_OF_FILTERS_OPTIONS = 'SET_AUTHORIZED_FILTERS_OPTIONS',
  SET_UNAUTHORIZED_LIST_OF_FILTERS_OPTIONS = 'SET_UNAUTHORIZED_FILTERS_OPTIONS'
}
type FiltersDataType = {
  id: number;
  forLoggedUser: boolean;
  type: string;
  values: any;
};

type FiltersList = Array<FiltersDataType>;

interface SetAuthorizedListOfFiltersOptionsAction {
  type: ListOfFiltersOptionsActionTypes.SET_AUTHORIZED_LIST_OF_FILTERS_OPTIONS;
  payload: FiltersList;
}
interface SetUnauthorizedListOfFiltersOptionsAction {
  type: ListOfFiltersOptionsActionTypes.SET_UNAUTHORIZED_LIST_OF_FILTERS_OPTIONS;
  payload: FiltersList;
}

export type ListOfFiltersOptionsAction =
  | SetAuthorizedListOfFiltersOptionsAction
  | SetUnauthorizedListOfFiltersOptionsAction;
