import { combineReducers } from 'redux';
import { popupLocationReduser } from './popupLocationReduser';
import { locationsListReduser } from './locationListReduser';

export const rootReducer = combineReducers({
  popupLocation: popupLocationReduser,
  locationList: locationsListReduser
});

export type RootState = ReturnType<typeof rootReducer>;
