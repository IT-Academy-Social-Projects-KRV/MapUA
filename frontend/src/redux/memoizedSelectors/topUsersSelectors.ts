import { createSelector } from 'reselect';
import { RootState } from '../reducers/index';

export const selectTopUsers = createSelector(
  [(state: RootState) => state.topUsers],
  topUsers => topUsers
);
