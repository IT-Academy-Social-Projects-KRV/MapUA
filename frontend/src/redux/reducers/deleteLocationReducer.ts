import {
  DeleteLocationActionTypes,
  DeleteLocationActions
} from 'redux/action-types/deleteLocationActionTypes';
import { deleteLocationStateType } from '../ts-types';

export const initialState: deleteLocationStateType = {
  loading: false,
  error: null,
  success: false,
  data: false
};

export const deleteLocationReducer = (
  state = initialState,
  action: DeleteLocationActions
): deleteLocationStateType => {
  switch (action.type) {
    case DeleteLocationActionTypes.DELETE_LOCATION_LOADING:
      return {
        loading: true,
        error: null,
        data: initialState.data,
        success: false
      };
    case DeleteLocationActionTypes.DELETE_LOCATION_SUCCESS:
      return {
        loading: false,
        error: null,
        data: true,
        success: true
      };
    case DeleteLocationActionTypes.DELETE_LOCATION_ERROR:
      return {
        loading: true,
        error: action.payload,
        data: initialState.data,
        success: false
      };

    case DeleteLocationActionTypes.DELETE_LOCATION_RESET:
      return { ...initialState };

    default:
      return state;
  }
};
