import { AlertColor } from '@mui/material';
import {
  boundsType,
  locationType,
  PrivateUserDataType,
  UserDataType,
  FiltersDataType,
  CommentType,
  AuthorInfoType,
  isUserAuthorizedType,
  topLocationType,
  TopUserType
} from '../../../types';

export type InitialStateType<T> = {
  loading: boolean;
  error: null | string | Error;
  success: boolean;
  data: T;
};

// Async
export type isUserAuthorizedStateType = InitialStateType<isUserAuthorizedType>;
export type createLocationStateType = InitialStateType<boolean>;
export type userDataStateType = InitialStateType<UserDataType>;
export type topUserStateType = InitialStateType<TopUserType[]>;
export type privateUserDataStateType = InitialStateType<PrivateUserDataType>;
export type locationListStateType = InitialStateType<locationType[]>;
export type topLocationStateType = InitialStateType<topLocationType[]>;
export type popupLocationStateType = InitialStateType<locationType>;
export type otherUserDataStateType = InitialStateType<UserDataType>;
export type locationCommentsStateType = {
  comments: CommentType<AuthorInfoType>[];
};
export type deleteLocationStateType = InitialStateType<boolean>;
// Sync
export type snackbarStateType = {
  type: AlertColor | undefined;
  notification: string;
  visible: boolean;
};
export type listOfFiltersOptionsStateType = {
  filters: FiltersDataType[];
};
export type mapInfoStateType = {
  bounds: boundsType;
  locationName: string;
  selectedFilters: string[];
  authorizedFilters: string[];
};
