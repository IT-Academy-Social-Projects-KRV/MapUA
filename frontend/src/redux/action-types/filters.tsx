/* eslint-disable no-unused-vars */
interface SubscriptionsDataType {
  subscriptions: string[];
}

type FiltersDataType = {
  id: number;
  forLoggedUser: boolean;
  type: string;
  values: any;
};

type FiltersList = Array<FiltersDataType>;

export interface FiltersState {
  filters: FiltersList;
  loading: boolean;
  error: null | string;
}

export enum FiltersActionTypes {
  FETCH_FILTERS = 'FETCH_FILTERS',
  FETCH_FILTERS_SUCCESS = 'FETCH_FILTERS_SUCCESS',
  FETCH_FILTERS_ERROR = 'FETCH_FILTERS_ERROR',
  FETCH_FILTERS_WITHOUT_AUTH = 'FETCH_FILTERS_WITHOUT_AUTH'
}

interface FetchFiltersAction {
  type: FiltersActionTypes.FETCH_FILTERS;
}

interface FetchFiltersSuccessAction {
  type: FiltersActionTypes.FETCH_FILTERS_SUCCESS;
  payload: SubscriptionsDataType;
}

interface FetchFiltersErrorAction {
  type: FiltersActionTypes.FETCH_FILTERS_ERROR;
  payload: string;
}

interface FetchFiltersWithoutAuth {
  type: FiltersActionTypes.FETCH_FILTERS_WITHOUT_AUTH;
}

export type FiltersAction =
  | FetchFiltersAction
  | FetchFiltersSuccessAction
  | FetchFiltersErrorAction
  | FetchFiltersWithoutAuth;
