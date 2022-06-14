import {
  LocationDataAction,
  LocationDataActionTypes
} from '../action-types/updateLocationActionTypes';

import { updateLocationStateType } from '../ts-types';

const initialState: updateLocationStateType = {
  loading: false,
  error: null,
  success: false,
  data: {
    locationName: '',
    arrayPhotos: [],
    description: ''
  }
};

export const updateLocationDataReducer = (
  state = initialState,
  action: LocationDataAction
): updateLocationStateType => {
  switch (action.type) {
    case LocationDataActionTypes.UPDATE_LOCATION_DATA_LOADING:
      return {
        loading: true,
        error: null,
        data: initialState.data,
        success: false
      };
    case LocationDataActionTypes.UPDATE_LOCATION_DATA_SUCCESS:
      return {
        loading: false,
        error: null,
        data: action.payload,
        success: true
      };
    case LocationDataActionTypes.UPDATE_LOCATION_DATA_ERROR:
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
