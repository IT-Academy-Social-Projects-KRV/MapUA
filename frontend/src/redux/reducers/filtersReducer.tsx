import {
  FiltersAction,
  FiltersActionTypes,
  FiltersState
} from '../action-types/filters';

const initialState: FiltersState = {
  filters: [],
  loading: false,
  error: null
};

export const filterReducer = (
  state = initialState,
  action: FiltersAction
): FiltersState => {
  switch (action.type) {
    case FiltersActionTypes.FETCH_FILTERS:
      return { loading: true, error: null, filters: [...action.payload] };
    case FiltersActionTypes.FETCH_FILTERS_WITHOUT_AUTH:
      return {
        loading: false,
        error: null,
        filters: [...action.payload.filter(f => f.forLoggedUser === false)]
      };
    case FiltersActionTypes.FETCH_FILTERS_SUCCESS:
      return {
        loading: false,
        error: null,
        filters: [
          ...state.filters,

          {
            ...action.payload
          }
        ]
      };
    case FiltersActionTypes.FETCH_FILTERS_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
