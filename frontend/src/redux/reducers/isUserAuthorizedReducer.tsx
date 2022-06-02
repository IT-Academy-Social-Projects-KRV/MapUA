import {
  isUserAuthorizedAction,
  IsUserAuthorizedActionTypes
} from 'redux/action-types/isUserAuthorizedActionTypes';
import { isUserAuthorizedStateType } from '../ts-types';

const initialState: isUserAuthorizedStateType = {
  loading: true,
  error: null,
  data: false,
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
        data: false,
        success: false
      };
    case IsUserAuthorizedActionTypes.LOGIN_USER_SUCCESS:
      return {
        loading: false,
        error: null,
        data: true,
        success: true
      };
    case IsUserAuthorizedActionTypes.LOGIN_USER_ERROR:
      return {
        loading: false,
        error: 'error has occurred on login', // todo add translation
        data: false,
        success: false
      };
    case IsUserAuthorizedActionTypes.LOGOUT_USER:
      return {
        loading: false,
        error: null,
        data: false,
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
        data: true,
        success: true
      };
    case IsUserAuthorizedActionTypes.CHECK_USER_TOKEN_ERROR:
      return {
        loading: false,
        error: action.payload,
        data: false,
        success: false
      };
    default:
      return state;
  }
};
