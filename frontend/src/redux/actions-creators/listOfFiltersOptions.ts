import { Dispatch } from 'redux';
import {
  ListOfFiltersOptionsAction,
  ListOfFiltersOptionsActionTypes
} from '../action-types/listOfFiltersOptionsActionTypes';
import {
  createLocalizationMainFilters,
  createSubscriptionsTranslation
} from '../../static/mainFIlters';
import { AuthorInfoType } from '../../../types';

export const setAuthorizedListOfFiltersOptions =
  (subscriptions: AuthorInfoType[], t: any) =>
  (dispatch: Dispatch<ListOfFiltersOptionsAction>) => {
    dispatch({
      type: ListOfFiltersOptionsActionTypes.SET_AUTHORIZED_LIST_OF_FILTERS_OPTIONS,
      payload: [
        ...createLocalizationMainFilters(t),
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
      payload: createLocalizationMainFilters(t)
    });
  };
