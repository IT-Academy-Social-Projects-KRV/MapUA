import {
  isUserAuthorizedAction,
  IsUserAuthorizedActionTypes
} from 'redux/action-types/isUserAuthorizedActionTypes';
import { isUserAuthorizedStateType } from '../ts-types';

const initialState: isUserAuthorizedStateType = {
  loading: false,
  error: null,
  data: {
    isAuthorized: false,
    role: null
  },
  success: false
};

export const isUserAuthorizedReducer = (
  state = initialState,
  action: isUserAuthorizedAction
): isUserAuthorizedStateType => {
  switch (action.type) {
    case IsUserAuthorizedActionTypes.LOGIN_USER_LOADING:
      return {
        loading: true,
        error: null,
        data: {
          isAuthorized: false,
          role: null
        },
        success: false
      };
    case IsUserAuthorizedActionTypes.LOGIN_USER_SUCCESS:
      return {
        loading: false,
        error: null,
        data: {
          isAuthorized: true,
          role: action.payload
        },
        success: true
      };
    case IsUserAuthorizedActionTypes.LOGIN_USER_ERROR:
      return {
        loading: false,
        error: 'error has occurred on login', // todo add translation
        data: {
          isAuthorized: false,
          role: null
        },
        success: false
      };
    case IsUserAuthorizedActionTypes.LOGOUT_USER:
      return {
        loading: false,
        error: null,
        data: {
          isAuthorized: false,
          role: null
        },
        success: false
      };

    case IsUserAuthorizedActionTypes.CHECK_USER_TOKEN_LOADING:
      return {
        ...state,
        loading: true,
        success: false
      };
    case IsUserAuthorizedActionTypes.CHECK_USER_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        data: {
          isAuthorized: true,
          role: action.payload
        },
        success: true
      };
    case IsUserAuthorizedActionTypes.CHECK_USER_TOKEN_ERROR:
      return {
        loading: false,
        error: action.payload,
        data: {
          isAuthorized: false,
          role: null
        },
        success: false
      };
    default:
      return state;
  }
};
