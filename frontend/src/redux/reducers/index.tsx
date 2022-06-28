import { combineReducers } from 'redux';
import { isUserAuthorizedReducer } from './isUserAuthorizedReducer';
import { topUsersReducer, userDataReducer } from './userDataReducer';
import { privateUserDataReducer } from './privateUserDataReducer';
import { popupLocationReducer } from './popupLocationReducer';
import {
  locationsListReducer,
  topLocationsReducer
} from './locationListReducer';
import { mapInfoReducer } from './mapInfoReducer';
import { listOfFiltersOptionsReducer } from './listOfFiltersOptionsReducer';
import { createLocationReducer } from './createLocationReducer';
import { locationCommentsReducer } from './locationCommentsReducer';
import { snackbarReducer } from './snackbarReducer';
import { otherUserDataReducer } from './otherUserDataReducer';
import { deleteLocationReducer } from './deleteLocationReducer';

export const rootReducer = combineReducers({
  isUserAuthorized: isUserAuthorizedReducer,
  userData: userDataReducer,
  privateUserData: privateUserDataReducer,
  popupLocation: popupLocationReducer,
  locationList: locationsListReducer,
  mapInfo: mapInfoReducer,
  filtersList: listOfFiltersOptionsReducer,
  createLocation: createLocationReducer,
  locationComments: locationCommentsReducer,
  snackbar: snackbarReducer,
  otherUserData: otherUserDataReducer,
  deleteLocation: deleteLocationReducer,
  topLocations: topLocationsReducer,
  topUsers: topUsersReducer
});

export type RootState = ReturnType<typeof rootReducer>;
