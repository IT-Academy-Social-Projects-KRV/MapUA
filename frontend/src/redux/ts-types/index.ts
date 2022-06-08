import { AlertColor } from '@mui/material';
import {
  boundsType,
  locationType,
  PrivateUserDataType,
  UserDataType,
  FiltersDataType,
  CommentType,
  AuthorInfoType
} from '../../../types';

export type InitialStateType<T> = {
  loading: boolean;
  error: null | string | Error;
  success: boolean;
  data: T;
};

// Async
export type isUserAuthorizedStateType = InitialStateType<boolean>;
export type createLocationStateType = InitialStateType<boolean>;
export type userDataStateType = InitialStateType<UserDataType>;
export type privateUserDataStateType = InitialStateType<PrivateUserDataType>;
export type locationListStateType = InitialStateType<locationType[]>;
export type popupLocationStateType = InitialStateType<locationType>;
export type locationCommentsStateType = {
  comments: CommentType<AuthorInfoType>[];
};
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
