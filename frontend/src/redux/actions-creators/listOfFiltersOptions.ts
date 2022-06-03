import { Dispatch } from 'redux';
import {
  ListOfFiltersOptionsAction,
  ListOfFiltersOptionsActionTypes
} from '../action-types/listOfFiltersOptionsActionTypes';
import {
  createLocalizatioMainFilters,
  createSubscriptionsTranslation
} from '../../static/mainFIlters';

export const setAuthorizedListOfFiltersOptions =
  (subscriptions: string[], t: any) =>
  (dispatch: Dispatch<ListOfFiltersOptionsAction>) => {
    dispatch({
      type: ListOfFiltersOptionsActionTypes.SET_AUTHORIZED_LIST_OF_FILTERS_OPTIONS,
      payload: [
        ...createLocalizatioMainFilters(t),
        {
          id: 4,
          forLoggedUser: true,
          type: createSubscriptionsTranslation(t),
          values: subscriptions
        }
      ]
    });
  };

export const setUnauthorizedListOfFiltersOptions =
  (t: any) => (dispatch: Dispatch<ListOfFiltersOptionsAction>) => {
    dispatch({
      type: ListOfFiltersOptionsActionTypes.SET_UNAUTHORIZED_LIST_OF_FILTERS_OPTIONS,
      payload: createLocalizatioMainFilters(t)
    });
  };
