import { combineReducers } from 'redux';
import { isUserAuthorizedReducer } from './isUserAuthorizedReducer';
import { userDataReducer } from './userDataReducer';
import { privateUserDataReducer } from './privateUserDataReducer';
import { popupLocationReducer } from './popupLocationReducer';
import { locationsListReducer } from './locationListReducer';
import { mapInfoReducer } from './mapInfoReducer';
import { listOfFiltersOptionsReducer } from './listOfFiltersOptionsReducer';
import { createLocationReducer } from './createLocationReducer';
import { locationCommentsReducer } from './locationCommentsReducer';

export const rootReducer = combineReducers({
  isUserAuthorized: isUserAuthorizedReducer,
  userData: userDataReducer,
  privateUserData: privateUserDataReducer,
  popupLocation: popupLocationReducer,
  locationList: locationsListReducer,
  mapInfo: mapInfoReducer,
  filtersList: listOfFiltersOptionsReducer,
  createLocation: createLocationReducer,
  locationComments: locationCommentsReducer
});

export type RootState = ReturnType<typeof rootReducer>;
