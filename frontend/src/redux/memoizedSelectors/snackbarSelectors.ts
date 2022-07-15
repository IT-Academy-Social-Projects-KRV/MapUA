import { createSelector } from 'reselect';
import { RootState } from '../reducers/index';

export const selectSnackbarType = createSelector(
  [(state: RootState) => state.snackbar.type],
  type => type
);

export const selectSnackbarVisible = createSelector(
  [(state: RootState) => state.snackbar.visible],
  visible => visible
);

export const selectSnackbarNotification = createSelector(
  [(state: RootState) => state.snackbar.notification],
  notification => notification
);
