import {
  CreateLocationAction,
  CreateLocationActionTypes
} from 'redux/action-types/createLocationActionTypes';
import { createLocationStateType } from '../ts-types';

const initialState: createLocationStateType = {
  loading: false,
  error: null,
  data: false,
  success: false
};

export const createLocationReducer = (
  state = initialState,
  action: CreateLocationAction
): createLocationStateType => {
  switch (action.type) {
    case CreateLocationActionTypes.CREATE_LOCATION_LOADING:
      return {
        loading: true,
        error: null,
        data: false,
        success: false
      };
    case CreateLocationActionTypes.CREATE_LOCATION_SUCCESS:
      return {
        loading: false,
        error: null,
        data: true,
        success: true
      };
    case CreateLocationActionTypes.AFTER_CREATE_LOCATION_RESET:
      return {
        loading: false,
        error: null,
        data: false,
        success: false
      };
    case CreateLocationActionTypes.CREATE_LOCATION_ERROR:
      return {
        loading: false,
        error: action.payload,
        data: false,
        success: false
      };
    default:
      return state;
  }
};
