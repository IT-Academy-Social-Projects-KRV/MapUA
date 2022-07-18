import { createSelector } from 'reselect';
import { RootState } from '../reducers/index';

export const selectFiltersListfilters = createSelector(
  [(state: RootState) => state.filtersList.filters],
  filters => filters
);
