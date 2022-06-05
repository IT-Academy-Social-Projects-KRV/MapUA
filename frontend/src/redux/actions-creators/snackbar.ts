import {
  SnackbarActions,
  SnackbarActionsType
} from 'redux/action-types/snackbarActionTypes';
import { Dispatch } from 'redux';

export const SetSuccessSnackbar =
  (notification: string) => async (dispatch: Dispatch<SnackbarActions>) => {
    dispatch({
      type: SnackbarActionsType.SET_SUCCESS,
      payload: notification
    });
    setTimeout(() => {
      dispatch({
        type: SnackbarActionsType.RESET_SNACKBAR
      });
    }, 3000);
  };
export const SetErrorSnackbar =
  (notification: string) => async (dispatch: Dispatch<SnackbarActions>) => {
    dispatch({
      type: SnackbarActionsType.SET_ERROR,
      payload: notification
    });
    setTimeout(() => {
      dispatch({
        type: SnackbarActionsType.RESET_SNACKBAR
      });
    }, 3000);
  };
export const SetWarningSnackbar =
  (notification: string) => async (dispatch: Dispatch<SnackbarActions>) => {
    dispatch({
      type: SnackbarActionsType.SET_WARNING,
      payload: notification
    });
    setTimeout(() => {
      dispatch({
        type: SnackbarActionsType.RESET_SNACKBAR
      });
    }, 3000);
  };
export const SetInfoSnackbar =
  (notification: string) => async (dispatch: Dispatch<SnackbarActions>) => {
    dispatch({
      type: SnackbarActionsType.SET_INFO,
      payload: notification
    });
    setTimeout(() => {
      dispatch({
        type: SnackbarActionsType.RESET_SNACKBAR
      });
    }, 3000);
  };
export const ResetSnackbar =
  () => async (dispatch: Dispatch<SnackbarActions>) => {
    dispatch({
      type: SnackbarActionsType.RESET_SNACKBAR
    });
  };
