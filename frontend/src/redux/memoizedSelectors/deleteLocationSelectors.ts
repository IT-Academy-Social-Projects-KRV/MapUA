import { createSelector } from 'reselect';
import { RootState } from '../reducers/index';

export const selectLocationIsDeleted = createSelector(
  [(state: RootState) => state.deleteLocation.data],
  isDeleted => isDeleted
);
