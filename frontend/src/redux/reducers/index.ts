import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { todoReducer } from './todoReducer';
import { userLoginReducer } from './userLoginReducer';

export const rootReducer = combineReducers({
  user: userReducer,
  todo: todoReducer,
  userLogin: userLoginReducer
});

export type RootState = ReturnType<typeof rootReducer>;
