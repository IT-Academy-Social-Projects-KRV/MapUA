import {
  UserAuthAction,
  UserAuthActionTypes
} from 'redux/action-types/userAuthActionTypes';
import { UserAuthState } from 'redux/ts-types/userAuth';

const initialState: UserAuthState = {
  loading: false,
  error: null,
  isAuthorized: false,
  id: '',
  token: ''
};

export const userLoginReducer = (
  state = initialState,
  action: UserAuthAction
): UserAuthState => {
  switch (action.type) {
    case UserAuthActionTypes.USER_LOGIN_REQUEST:
      return {
        loading: true,
        error: null,
        isAuthorized: false,
        id: '',
        token: ''
      };
    case UserAuthActionTypes.USER_LOGIN_SUCCESS:
      return {
        loading: false,
        error: null,
        isAuthorized: true,
        // eslint-disable-next-line no-underscore-dangle
        id: action.payload.user._id,
        token: action.payload.token
      };
    case UserAuthActionTypes.USER_LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload,
        isAuthorized: false,
        id: '',
        token: ''
      };
    case UserAuthActionTypes.USER_LOGOUT:
      return {
        loading: false,
        error: null,
        id: '',
        isAuthorized: false,
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
