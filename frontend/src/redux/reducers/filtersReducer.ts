import {
  FiltersAction,
  FiltersActionTypes,
  FiltersState
} from '../types/filters';
import { mainFilters } from '../../static/mainFIlters';

const initialState: FiltersState = {
  filters: [],
  loading: false,
  error: null
};

const mainFilterLength = mainFilters.length;

export const filterReducer = (
  state = initialState,
  action: FiltersAction
): FiltersState => {
  switch (action.type) {
    case FiltersActionTypes.FETCH_FILTERS:
      return { loading: true, error: null, filters: [...mainFilters] };
    case FiltersActionTypes.FETCH_FILTERS_WITHOUT_AUTH:
      return {
        loading: false,
        error: null,
        filters: [...mainFilters.filter(f => f.forLoggedUser === false)]
      };
    case FiltersActionTypes.FETCH_FILTERS_SUCCESS:
      return {
        loading: false,
        error: null,
        filters: [
          // ...state.filters,
          ...mainFilters,
          {
            id: mainFilterLength + 1,
            forLoggedUser: true,
            type: 'Subscriptions',
            values: action.payload
          }
        ]
      };
    case FiltersActionTypes.FETCH_FILTERS_ERROR:
      return {
        loading: false,
        error: action.payload,
        filters: [...mainFilters]
      };
    default:
      return state;
  }
};
