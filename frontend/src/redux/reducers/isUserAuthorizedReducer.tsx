import {
  UserAuthAction,
  UserAuthActionTypes
} from 'redux/action-types/userAuthActionTypes';
import { InitialStateType } from '../ts-types';

const initialState: InitialStateType<boolean> = {
  loading: false,
  error: null,
  data: false
};

export const isUserAuthorizedReducer = (
  state = initialState,
  action: UserAuthAction
): InitialStateType<boolean> => {
  switch (action.type) {
    case UserAuthActionTypes.USER_LOGIN_REQUEST:
      return {
        loading: true,
        error: null,
        data: false
      };
    case UserAuthActionTypes.USER_LOGIN_SUCCESS:
      return {
        loading: false,
        error: null,
        data: true
      };
    case UserAuthActionTypes.USER_LOGIN_FAIL:
      return {
        loading: false,
        error: 'error has occurred on login', // todo add translation
        data: false
      };
    case UserAuthActionTypes.USER_LOGOUT:
      return {
        loading: false,
        error: null,
        data: false
      };

    // Check if user authorized every time when component mounted
    case UserAuthActionTypes.IF_USER_AUTHORIZED_REQUEST:
      return {
        ...state,
        loading: true
      };
    case UserAuthActionTypes.IF_USER_AUTHORIZED_SUCCESS:
      return {
        ...state,
        loading: false,
        data: true
      };
    default:
      return state;
  }
};
