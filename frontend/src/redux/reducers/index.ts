import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { userLoginReducer } from './userAuthReducer';
import { popupLocationReducer } from './popupLocationReducer';
import { locationsListReducer } from './locationListReducer';
// import { filterReducer } from './filtersReducer';

export const rootReducer = combineReducers({
  user: userReducer,
  userAuth: userLoginReducer,
  popupLocation: popupLocationReducer,
  locationList: locationsListReducer
  // userFilters: filterReducer
});

export type RootState = ReturnType<typeof rootReducer>;
