import { createSelector } from 'reselect';
import { RootState } from '../reducers/index';

//mapInfo
export const selectMapInfoFilters = createSelector(
  [(state: RootState) => state.mapInfo.selectedFilters],
  selectedFilters => selectedFilters
);

export const selectMapInfoBounds = createSelector(
  [(state: RootState) => state.mapInfo.bounds],
  bounds => bounds
);

export const selectMapInfolocationName = createSelector(
  [(state: RootState) => state.mapInfo.locationName],
  locationName => locationName
);

//userData
export const selectUserDataSubscriptions = createSelector(
  [(state: RootState) => state.userData.data.subscriptions],
  subscriptions => subscriptions
);

export const selectUserDataPersonalLocations = createSelector(
  [(state: RootState) => state.userData.data.personalLocations],
  personalLocations => personalLocations
);

export const selectUserDataVisited = createSelector(
  [(state: RootState) => state.userData.data.visited],
  visited => visited
);

export const selectUserDataFavorite = createSelector(
  [(state: RootState) => state.userData.data.favorite],
  favorite => favorite
);


//isUserAuthorized
export const selectIsUserAuthorized = createSelector(
  [(state: RootState) => state.isUserAuthorized.data.isAuthorized],
  bounds => bounds
);


//filtersList

export const selectFiltersListfilters = createSelector(
  [(state: RootState) => state.filtersList.filters],
  filters => filters
);