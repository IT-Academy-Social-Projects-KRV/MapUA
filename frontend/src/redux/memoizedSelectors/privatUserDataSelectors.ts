import { createSelector } from 'reselect';
import { RootState } from '../reducers/index';

export const selectPrivateUserDataError = createSelector(
  [(state: RootState) => state.privateUserData.error],
  error => error
);

export const selectPrivateUserDataLoading = createSelector(
  [(state: RootState) => state.privateUserData.loading],
  loading => loading
);

export const selectPrivateUserDataEmail = createSelector(
  [(state: RootState) => state.privateUserData.data.email],
  email => email
);

export const selectPrivateUserDataCreatedAt = createSelector(
  [(state: RootState) => state.privateUserData.data.createdAt],
  createdAt => createdAt
);

export const selectPrivateUserDataUpdatedAt = createSelector(
  [(state: RootState) => state.privateUserData.data.updatedAt],
  updatedAt => updatedAt
);
