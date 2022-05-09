import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { todoReducer } from './todoReducer';
import { userLoginReducer } from './userLoginReducer';
import { popupLocationReduser } from './popupLocationReduser';
import { locationsListReduser } from './locationListReduser';

export const rootReducer = combineReducers({
  user: userReducer,
  todo: todoReducer,
  userLogin: userLoginReducer,
  popupLocation: popupLocationReduser,
  locationList: locationsListReduser
});

export type RootState = ReturnType<typeof rootReducer>;
