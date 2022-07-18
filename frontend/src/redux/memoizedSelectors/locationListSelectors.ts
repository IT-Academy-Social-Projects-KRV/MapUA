import { createSelector } from 'reselect';
import { RootState } from '../reducers/index';

export const selectLocationList = createSelector(
  [(state: RootState) => state.locationList.data],
  locationList => locationList
);

export const selectLocationsListLoading = createSelector(
  [(state: RootState) => state.locationList.loading],
  loading => loading
);
