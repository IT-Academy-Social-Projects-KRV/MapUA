import { createSelector } from 'reselect';
import { RootState } from '../reducers/index';

export const selectOtherUserDataSubscriptions = createSelector(
  [(state: RootState) => state.otherUserData.data.subscriptions],
  subscriptions => subscriptions
);

export const selectOtherUserDataSubscribers = createSelector(
  [(state: RootState) => state.otherUserData.data.subscribers],
  subscribers => subscribers
);

export const selectOtherUserDataDescription = createSelector(
  [(state: RootState) => state.otherUserData.data.description],
  description => description
);

export const selectOtherUserDataError = createSelector(
  [(state: RootState) => state.otherUserData.error],
  error => error
);

export const selectOtherUserDataLoading = createSelector(
  [(state: RootState) => state.otherUserData.loading],
  loading => loading
);

export const selectOtherUserId = createSelector(
  [(state: RootState) => state.otherUserData.data._id],
  otherUserId => otherUserId
);

export const selectOtherUserDisplayName = createSelector(
  [(state: RootState) => state.otherUserData.data.displayName],
  displayName => displayName
);

export const selectOtherUserAvatar= createSelector(
  [(state: RootState) => state.otherUserData.data.imageUrl],
  imageUrl => imageUrl
);
