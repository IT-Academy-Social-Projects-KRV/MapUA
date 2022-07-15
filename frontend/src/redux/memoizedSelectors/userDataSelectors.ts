import { createSelector } from 'reselect';
import { RootState } from '../reducers/index';

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

export const selectUserId = createSelector(
  [(state: RootState) => state.userData.data._id],
  userId => userId
);
