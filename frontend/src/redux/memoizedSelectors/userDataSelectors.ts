import { createSelector } from 'reselect';
import { RootState } from '../reducers/index';

export const selectUserDataSubscriptions = createSelector(
  [(state: RootState) => state.userData.data.subscriptions],
  subscriptions => subscriptions
);

export const selectUserDataSubscribers = createSelector(
  [(state: RootState) => state.userData.data.subscribers],
  subscribers => subscribers
);

export const selectUserDataDescription = createSelector(
  [(state: RootState) => state.userData.data.description],
  description => description
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

export const selectUserDataError = createSelector(
  [(state: RootState) => state.userData.error],
  error => error
);

export const selectUserDataLoading = createSelector(
  [(state: RootState) => state.userData.loading],
  loading => loading
);

export const selectUserDisplayName = createSelector(
  [(state: RootState) => state.userData.data.displayName],
  displayName => displayName
);

export const selectUserAvatar = createSelector(
  [(state: RootState) => state.userData.data.imageUrl],
  imageUrl => imageUrl
);
