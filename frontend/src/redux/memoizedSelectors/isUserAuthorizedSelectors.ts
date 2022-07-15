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
