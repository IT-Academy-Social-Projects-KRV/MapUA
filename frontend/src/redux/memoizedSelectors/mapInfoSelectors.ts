import { createSelector } from 'reselect';
import { RootState } from '../reducers/index';

export const selectMapInfoFilters = createSelector(
  [(state: RootState) => state.mapInfo.selectedFilters],
  selectedFilters => selectedFilters
);

export const selectAuthorizedFilters = createSelector(
  [(state: RootState) => state.mapInfo.authorizedFilters],
  authorizedFilters => authorizedFilters
);

export const selectMapInfoBounds = createSelector(
  [(state: RootState) => state.mapInfo.bounds],
  bounds => bounds
);

export const selectMapInfolocationName = createSelector(
  [(state: RootState) => state.mapInfo.locationName],
  locationName => locationName
);
