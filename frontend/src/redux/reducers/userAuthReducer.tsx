import {
  UserAuthAction,
  UserAuthActionTypes
} from 'redux/action-types/userAuthActionTypes';
import { UserLoginState } from 'redux/ts-types/userAuth';

const initialState: UserLoginState = {
  loading: false,
  error: null,
  isLogged: false,
  isAuthorized: false,
  id: '',
  token: ''
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
        isAuthorized: false,
        id: '',
        token: ''
      };
    case UserAuthActionTypes.USER_LOGIN_SUCCESS:
      return {
        loading: false,
        error: null,
        isLogged: true,
        id: action.payload.id,
        isAuthorized: true,
        // eslint-disable-next-line no-underscore-dangle
        id: action.payload.user._id,
        token: action.payload.token
      };
    case UserAuthActionTypes.USER_LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload,
        isLogged: false,
        isAuthorized: false,
        id: '',
        token: ''
      };
    case UserAuthActionTypes.USER_LOGOUT:
      return {
        loading: false,
        error: null,
        isLogged: false,
        id: '',
        token: ''
      };
        isAuthorized: false,
        id: '',
        token: ''
      };

    // Check if user authorized every time when component mounted
    case UserAuthActionTypes.IF_USER_AUTORIZED_REQUEST:
      return {
        ...state,
        loading: true
      };
    case UserAuthActionTypes.IF_USER_AUTORIZED_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthorized: true
      };
    default:
      return state;
  }
};
