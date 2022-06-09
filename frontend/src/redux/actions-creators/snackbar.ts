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
  };
export const SetErrorSnackbar =
  (notification: string) => async (dispatch: Dispatch<SnackbarActions>) => {
    dispatch({
      type: SnackbarActionsType.SET_ERROR,
      payload: notification
    });
  };
export const SetWarningSnackbar =
  (notification: string) => async (dispatch: Dispatch<SnackbarActions>) => {
    dispatch({
      type: SnackbarActionsType.SET_WARNING,
      payload: notification
    });
  };
export const SetInfoSnackbar =
  (notification: string) => async (dispatch: Dispatch<SnackbarActions>) => {
    dispatch({
      type: SnackbarActionsType.SET_INFO,
      payload: notification
    });
  };
export const ResetSnackbar =
  () => async (dispatch: Dispatch<SnackbarActions>) => {
    dispatch({
      type: SnackbarActionsType.RESET_SNACKBAR
    });
  };
