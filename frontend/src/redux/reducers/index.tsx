import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { userLoginReducer } from './userAuthReducer';
import { popupLocationReducer } from './popupLocationReducer';
import { locationsListReducer } from './locationListReducer';
import { filterReducer } from './filtersReducer';
import { locationCommentsReducer } from './locationCommentsReducer';

export const rootReducer = combineReducers({
  user: userReducer,
  userAuth: userLoginReducer,
  popupLocation: popupLocationReducer,
  locationList: locationsListReducer,
  userFilters: filterReducer,
  locationComments: locationCommentsReducer
});

export type RootState = ReturnType<typeof rootReducer>;
