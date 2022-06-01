import { Dispatch } from 'redux';
import {
  ListOfFiltersOptionsAction,
  ListOfFiltersOptionsActionTypes
} from '../action-types/listOfFiltersOptionsActionTypes';

export const setAuthorizedListOfFiltersOptions =
  (subscriptions: string[]) =>
  (dispatch: Dispatch<ListOfFiltersOptionsAction>) => {
    dispatch({
      type: ListOfFiltersOptionsActionTypes.SET_AUTHORIZED_LIST_OF_FILTERS_OPTIONS,
      payload: subscriptions
    });
  };

export const setUnauthorizedListOfFiltersOptions =
  () => (dispatch: Dispatch<ListOfFiltersOptionsAction>) => {
    dispatch({
      type: ListOfFiltersOptionsActionTypes.SET_UNAUTHORIZED_LIST_OF_FILTERS_OPTIONS
    });
  };
