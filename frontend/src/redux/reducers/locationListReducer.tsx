import {
  LocationListActions,
  LocationListActionsType
} from 'redux/action-types/locationListActionTypes';
import { locationListStateType, topLocationStateType } from '../ts-types';

const initialState: locationListStateType = {
  loading: false,
  error: null,
  success: false,
  data: []
};
const topLocationsInitialState: topLocationStateType = {
  loading: false,
  error: null,
  success: false,
  data: []
};

export const locationsListReducer = (
  state = initialState,
  action: LocationListActions
): locationListStateType => {
  switch (action.type) {
    case LocationListActionsType.FETCH_LOCATION_LIST_LOADING:
      return { loading: true, error: null, data: [], success: false };
    case LocationListActionsType.FETCH_LOCATION_LIST_SUCCESS:
      return {
        loading: false,
        error: null,
        data: action.payload,
        success: true
      };
    case LocationListActionsType.FETCH_LOCATION_LIST_ERROR:
      return {
        loading: false,
        error: action.payload,
        data: initialState.data,
        success: false
      };
    default:
      return state;
  }
};
export const topLocationsReducer = (
  state = topLocationsInitialState,
  action: LocationListActions
): topLocationStateType => {
  switch (action.type) {
    case LocationListActionsType.FETCH_TOP_LOCATIONS_LOADING:
      return { loading: true, error: null, data: [], success: false };
    case LocationListActionsType.FETCH_TOP_LOCATIONS_SUCCESS:
      return {
        loading: false,
        error: null,
        data: action.payload,
        success: true
      };
    case LocationListActionsType.FETCH_TOP_LOCATIONS_ERROR:
      return {
        loading: false,
        error: action.payload,
        data: topLocationsInitialState.data,
        success: false
      };
    default:
      return state;
  }
};
