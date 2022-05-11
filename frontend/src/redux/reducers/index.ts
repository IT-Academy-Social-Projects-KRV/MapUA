import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { userLoginReducer } from './userLoginReducer';
import { popupLocationReducer } from './popupLocationReducer';
import { locationsListReducer } from './locationListReducer';

export const rootReducer = combineReducers({
  user: userReducer,
  userLogin: userLoginReducer,
  popupLocation: popupLocationReducer,
  locationList: locationsListReducer
});

export type RootState = ReturnType<typeof rootReducer>;
