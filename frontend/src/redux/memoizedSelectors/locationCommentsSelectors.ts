import { createSelector } from 'reselect';
import { RootState } from '../reducers/index';

export const selectComments = createSelector(
  [(state: RootState) => state.locationComments.comments],
  comments => comments
);
