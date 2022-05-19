import {
  UserAuthAction,
  UserAuthActionTypes
} from 'redux/action-types/userAuthActionTypes';
import { UserInfo, UserLoginState } from 'redux/ts-types/userAuth';

const initialState: UserLoginState = {
  loading: false,
  error: null,
  isLogged: false,
  userInfo: {} as UserInfo
};

export const userLoginReducer = (
  state = initialState,
  action: UserAuthAction
): UserLoginState => {
  switch (action.type) {
    case UserAuthActionTypes.USER_LOGIN_REQUEST:
      return {
        loading: true,
        error: null,
        isLogged: false,
        userInfo: {} as UserInfo
      };
    case UserAuthActionTypes.USER_LOGIN_SUCCESS:
      return {
        loading: false,
        error: null,
        isLogged: true,
        userInfo: action.payload
      };
    case UserAuthActionTypes.USER_LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload,
        isLogged: false,
        userInfo: {} as UserInfo
      };
    case UserAuthActionTypes.USER_LOGOUT:
      return {
        loading: false,
        error: null,
        isLogged: false,
        userInfo: {} as UserInfo
      };
    default:
      return state;
  }
};
