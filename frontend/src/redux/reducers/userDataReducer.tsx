import {
  UserDataAction,
  UserDataActionTypes
} from 'redux/action-types/userDataActionTypes';
import image from '../../static/image-not-found.jpg';
import { userDataStateType } from '../ts-types';

const initialState: userDataStateType = {
  loading: false,
  error: null,
  success: false,
  data: {
    _id: '',
    displayName: '',
    description: '',
    imageUrl: image,
    subscribers: [],
    subscriptions: [],
    favorite: [],
    visited: [],
    personalLocations: []
  }
};

export const userDataReducer = (
  state = initialState,
  action: UserDataAction
): userDataStateType => {
  switch (action.type) {
    case UserDataActionTypes.FETCH_USER_DATA_LOADING:
      return {
        loading: true,
        error: null,
        data: initialState.data,
        success: false
      };
    case UserDataActionTypes.FETCH_USER_DATA_SUCCESS:
      return {
        loading: false,
        error: null,
        data: action.payload,
        success: true
      };
    case UserDataActionTypes.FETCH_USER_DATA_ERROR:
      return {
        loading: false,
        error: action.payload,
        data: initialState.data,
        success: false
      };
    case UserDataActionTypes.UPDATE_USER_DATA_LOADING:
      return { ...state, loading: true, error: null, success: false };
    case UserDataActionTypes.UPDATE_USER_DATA_SUCCESS:
      return {
        loading: false,
        error: null,
        data: {
          ...state.data,
          ...action.payload
        },
        success: true
      };
    case UserDataActionTypes.UPDATE_USER_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false
      };
    case UserDataActionTypes.DELETE_USER_DATA:
      return {
        loading: false,
        error: null,
        data: initialState.data,
        success: false
      };
    default:
      return state;
  }
};
