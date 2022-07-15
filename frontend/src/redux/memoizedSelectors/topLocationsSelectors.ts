import { createSelector } from 'reselect';
import { RootState } from '../reducers/index';

export const selectTopLocations = createSelector(
  [(state: RootState) => state.topLocations],
  topLocations => topLocations
);
