import {
  UserAuthAction,
  IsUserAuthorizedActionTypes
} from 'redux/action-types/isUserAuthorizedActionTypes';
import { isUserAuthorizedStateType } from '../ts-types';

const initialState: isUserAuthorizedStateType = {
  loading: false,
  error: null,
  data: false
};

export const isUserAuthorizedReducer = (
  state = initialState,
  action: UserAuthAction
): isUserAuthorizedStateType => {
  switch (action.type) {
    case IsUserAuthorizedActionTypes.LOGIN_USER_LOADING:
      return {
        loading: true,
        error: null,
        data: false
      };
    case IsUserAuthorizedActionTypes.LOGIN_USER_SUCCESS:
      return {
        loading: false,
        error: null,
        data: true
      };
    case IsUserAuthorizedActionTypes.LOGIN_USER_ERROR:
      return {
        loading: false,
        error: 'error has occurred on login', // todo add translation
        data: false
      };
    case IsUserAuthorizedActionTypes.LOGOUT_USER:
      return {
        loading: false,
        error: null,
        data: false
      };

    case IsUserAuthorizedActionTypes.CHECK_USER_TOKEN_LOADING:
      return {
        ...state,
        loading: true
      };
    case IsUserAuthorizedActionTypes.CHECK_USER_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        data: true
      };
    case IsUserAuthorizedActionTypes.CHECK_USER_TOKEN_ERROR:
      return {
        loading: false,
        error: action.payload,
        data: false
      };
    default:
      return state;
  }
};
