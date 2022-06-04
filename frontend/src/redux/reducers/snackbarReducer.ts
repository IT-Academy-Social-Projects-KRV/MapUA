import { snackbarStateType } from '../ts-types';
import {
  SnackbarActions,
  SnackbarActionsType
} from '../action-types/snackbarActionTypes';

const initialState: snackbarStateType = {
  type: undefined,
  notification: '',
  visible: false
};

export const snackbarReducer = (
  state = initialState,
  action: SnackbarActions
): snackbarStateType => {
  switch (action.type) {
    case SnackbarActionsType.SET_SUCCESS:
      return {
        type: 'success',
        notification: action.payload,
        visible: true
      };
    case SnackbarActionsType.SET_ERROR:
      return {
        type: 'error',
        notification: action.payload,
        visible: true
      };
    case SnackbarActionsType.SET_WARNING:
      return {
        type: 'warning',
        notification: action.payload,
        visible: true
      };
    case SnackbarActionsType.SET_INFO:
      return {
        type: 'info',
        notification: action.payload,
        visible: true
      };
    case SnackbarActionsType.RESET_SNACKBAR:
      return {
        type: undefined,
        notification: '',
        visible: false
      };
    default:
      return state;
  }
};
