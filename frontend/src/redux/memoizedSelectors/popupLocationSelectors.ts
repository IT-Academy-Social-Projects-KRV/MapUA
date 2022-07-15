import { createSelector } from 'reselect';
import { RootState } from '../reducers/index';

export const selectLocationId = createSelector(
  [(state: RootState) => state.popupLocation.data._id],
  locationId => locationId
);

export const selectLocationData = createSelector(
  [(state: RootState) => state.popupLocation],
  locationData => locationData
);

export const selectRaiting = createSelector(
  [(state: RootState) => state.popupLocation.data.rating],
  rating => rating
);

export const selectVerificationStatus = createSelector(
  [(state: RootState) => state.popupLocation.data.verificationStatus],
  verificationStatus => verificationStatus
);

export const selectAuthor = createSelector(
  [(state: RootState) => state.popupLocation.data.author],
  author => author
);

export const selectReported = createSelector(
  [(state: RootState) => state.popupLocation.data.reported],
  reported => reported
);

export const selectCreatedAt = createSelector(
  [(state: RootState) => state.popupLocation.data.createdAt],
  createdAt => createdAt
);

export const selectDescription = createSelector(
  [(state: RootState) => state.popupLocation.data.description],
  description => description
);

export const selectPopUpLocationName = createSelector(
  [(state: RootState) => state.popupLocation.data.locationName],
  locationName => locationName
);

export const selectArrayPhotos = createSelector(
  [(state: RootState) => state.popupLocation.data.arrayPhotos],
  arrayPhotos => arrayPhotos
);
