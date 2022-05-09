import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { todoReducer } from './todoReducer';
import { toogleProfilePage } from './profilePageReducer';

export const rootReducer = combineReducers({
  user: userReducer,
  todo: todoReducer,
  toogleProfile: toogleProfilePage
});

export type RootState = ReturnType<typeof rootReducer>;
