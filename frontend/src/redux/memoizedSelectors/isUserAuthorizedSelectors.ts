import { createSelector } from 'reselect';
import { RootState } from '../reducers/index';

export const selectIsUserAuthorized = createSelector(
  [(state: RootState) => state.isUserAuthorized.data.isAuthorized],
  isAuthorized => isAuthorized
);

export const selectUserRole = createSelector(
  [(state: RootState) => state.isUserAuthorized.data.role],
  role => role
);

export const selectIsUserAuthorizedError = createSelector(
  [(state: RootState) => state.isUserAuthorized.error],
  error => error
);

export const selectIsUserAuthorizedLoading = createSelector(
  [(state: RootState) => state.isUserAuthorized.loading],
  loading => loading
);
