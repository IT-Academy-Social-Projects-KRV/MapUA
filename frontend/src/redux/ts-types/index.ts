import {
  boundsType,
  locationType,
  PrivateUserDataType,
  UserDataType,
  FiltersDataType
} from '../../../types';

export type InitialStateType<T> = {
  loading: boolean;
  error: null | string | {} | Error;
  data: T;
};

// Async
export type isUserAuthorizedStateType = InitialStateType<boolean>;
export type userDataStateType = InitialStateType<UserDataType>;
export type privateUserDataStateType = InitialStateType<PrivateUserDataType>;
export type locationListStateType = InitialStateType<locationType[]>;
export type popupLocationStateType = InitialStateType<locationType>;

// Sync
export type listOfFiltersOptionsStateType = {
  filters: FiltersDataType[];
};
export type mapInfoStateType = {
  bounds: boundsType;
  locationName: string;
  selectedFilters: string[];
};
