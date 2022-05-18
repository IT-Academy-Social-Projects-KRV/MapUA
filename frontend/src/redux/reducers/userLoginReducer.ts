import { UserAction, UserActionTypes, UserLoginState } from 'redux/types/user';

const initialState: UserLoginState = {
  loading: false,
  error: null,
  isLogged: false,
  id: '',
  token: ''
};

export const userLoginReducer = (
  state = initialState,
  action: UserAction
): UserLoginState => {
  switch (action.type) {
    case UserActionTypes.USER_LOGIN_REQUEST:
      return { loading: true, error: null, isLogged: false, id: '', token: '' };
    case UserActionTypes.USER_LOGIN_SUCCESS:
      return {
        loading: false,
        error: null,
        isLogged: true,
        id: action.payload.id,
        token: action.payload.token
      };
    case UserActionTypes.USER_LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload,
        isLogged: false,
        id: '',
        token: ''
      };
    case UserActionTypes.USER_LOGOUT:
      return {
        loading: false,
        error: null,
        isLogged: false,
        id: '',
        token: ''
      };
    default:
      return state;
  }
};
