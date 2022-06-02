import {
  ListOfFiltersOptionsActionTypes,
  ListOfFiltersOptionsAction
} from '../action-types/listOfFiltersOptionsActionTypes';
import { mainFilters } from '../../static/mainFIlters';
import { listOfFiltersOptionsStateType } from '../ts-types';

const initialState = {
  filters: mainFilters
};

export const listOfFiltersOptionsReducer = (
  state = initialState,
  action: ListOfFiltersOptionsAction
): listOfFiltersOptionsStateType => {
  switch (action.type) {
    case ListOfFiltersOptionsActionTypes.SET_UNAUTHORIZED_LIST_OF_FILTERS_OPTIONS:
      return {
        filters: [...action.payload.filter(f => f.forLoggedUser === false)]
      };
    case ListOfFiltersOptionsActionTypes.SET_AUTHORIZED_LIST_OF_FILTERS_OPTIONS:
      return { filters: [...action.payload] };

    default:
      return state;
  }
};
