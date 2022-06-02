import {
  ListOfFiltersOptionsActionTypes,
  ListOfFiltersOptionsAction
} from '../action-types/listOfFiltersOptionsActionTypes';
import { mainFilters } from '../../static/mainFIlters';
import { listOfFiltersOptionsStateType } from '../ts-types';

const initialState: listOfFiltersOptionsStateType = {
  filters: [...mainFilters.filter(f => f.forLoggedUser === false)]
};

const mainFilterLength = mainFilters.length;

export const listOfFiltersOptionsReducer = (
  state = initialState,
  action: ListOfFiltersOptionsAction
): listOfFiltersOptionsStateType => {
  switch (action.type) {
    case ListOfFiltersOptionsActionTypes.SET_UNAUTHORIZED_LIST_OF_FILTERS_OPTIONS:
      return {
        ...initialState
      };
    case ListOfFiltersOptionsActionTypes.SET_AUTHORIZED_LIST_OF_FILTERS_OPTIONS:
      return {
        filters: [
          ...mainFilters,
          {
            id: mainFilterLength + 1,
            forLoggedUser: true,
            type: 'Subscriptions',
            values: action.payload
          }
        ]
      };
    default:
      return state;
  }
};
