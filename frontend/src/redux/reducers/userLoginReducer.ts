import { UserAction, UserActionTypes, UserLoginState } from 'redux/types/user';

const initialState: UserLoginState = {
  loading: false,
  error: null,
  isLogged: false,
  userInfo: {
    user: {
      _id: ''
    }
  }
};

export const userLoginReducer = (
  state = initialState,
  action: UserAction
): UserLoginState => {
  switch (action.type) {
    case UserActionTypes.USER_LOGIN_REQUEST:
      return { ...state, loading: true };
    case UserActionTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
        isLogged: true
      };
    case UserActionTypes.USER_LOGIN_FAIL:
      return {
        ...state,
        error: action.payload
      };
    case UserActionTypes.USER_LOGOUT:
      return {
        ...state
      };
    default:
      return state;
  }
};
