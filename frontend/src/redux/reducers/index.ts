import { combineReducers } from 'redux';
import { popupLocationReducer } from './popupLocationReducer';
import { locationsListReducer } from './locationListReducer';

export const rootReducer = combineReducers({
  popupLocation: popupLocationReducer,
  locationList: locationsListReducer
});

export type RootState = ReturnType<typeof rootReducer>;
