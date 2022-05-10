import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { popupLocationReducer } from './popupLocationReducer';
import { locationsListReducer } from './locationListReducer';

export const rootReducer = combineReducers({
  user: userReducer,
  popupLocation: popupLocationReducer,
  locationList: locationsListReducer
});

export type RootState = ReturnType<typeof rootReducer>;
