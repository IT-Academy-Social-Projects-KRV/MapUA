import { combineReducers } from 'redux';
import { isUserAuthorizedReducer } from './isUserAuthorizedReducer';
import { userDataReducer } from './userReducer';
import { privateUserDataReducer } from './privateUserDataReducer';
import { popupLocationReducer } from './popupLocationReducer';
import { locationsListReducer } from './locationListReducer';
import { mapInfoReducer } from './mapInfoReducer';
import { filterReducer } from './filtersReducer';

export const rootReducer = combineReducers({
  isUserAuthorized: isUserAuthorizedReducer,
  userData: userDataReducer,
  privateUserData: privateUserDataReducer,
  popupLocation: popupLocationReducer,
  locationList: locationsListReducer,
  mapInfo: mapInfoReducer,
  userFilters: filterReducer
});

export type RootState = ReturnType<typeof rootReducer>;
