import { UserAction, UserActionTypes, UserLoginState } from 'redux/types/user';

const initialState: UserLoginState = {
  loading: false,
  error: null,
  isAuthorized: false,
  userInfo: {}
};

export const userLoginReducer = (
  state = initialState,
  action: UserAction
): UserLoginState => {
  switch (action.type) {
    case UserActionTypes.USER_LOGIN_REQUEST:
      return { loading: true, error: null, isAuthorized: false, userInfo: {} };
    case UserActionTypes.USER_LOGIN_SUCCESS:
      return {
        loading: false,
        error: null,
        isAuthorized: true,
        userInfo: action.payload
      };
    case UserActionTypes.USER_LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload,
        isAuthorized: false,
        userInfo: {}
      };
    case UserActionTypes.USER_LOGOUT:
      return { loading: false, error: null, isAuthorized: false, userInfo: {} };
    // Check if user authorized every time when component mounted
    case UserActionTypes.IF_USER_AUTORIZED_REQUEST:
      return {
        ...state,
        loading: true
      };
    case UserActionTypes.IF_USER_AUTORIZED_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthorized: true
      };
    default:
      return state;
  }
};
