import { createSelector } from 'reselect';
import { RootState } from '../reducers/index';

export const selectIsSuccess = createSelector(
  [(state: RootState) => state.createLocation.success],
  success => success
);

export const selectIsLoading = createSelector(
  [(state: RootState) => state.createLocation.loading],
  loading => loading
);
