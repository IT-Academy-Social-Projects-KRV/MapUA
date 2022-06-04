/* eslint-disable no-unused-vars */
export enum SnackbarActionsType {
  SET_SUCCESS = 'SET_SUCCESS',
  SET_ERROR = 'SET_ERROR',
  SET_WARNING = 'SET_WARNING',
  SET_INFO = 'SET_INFO',
  RESET_SNACKBAR = 'RESET_SNACKBAR'
}

interface SetSuccessAction {
  type: SnackbarActionsType.SET_SUCCESS;
  payload: string;
}
interface SetErrorAction {
  type: SnackbarActionsType.SET_ERROR;
  payload: string;
}
interface SetWarningAction {
  type: SnackbarActionsType.SET_WARNING;
  payload: string;
}
interface SetInfoAction {
  type: SnackbarActionsType.SET_INFO;
  payload: string;
}
interface ResetSnackbarAction {
  type: SnackbarActionsType.RESET_SNACKBAR;
}

export type SnackbarActions =
  | SetSuccessAction
  | SetErrorAction
  | SetWarningAction
  | SetInfoAction
  | ResetSnackbarAction;
