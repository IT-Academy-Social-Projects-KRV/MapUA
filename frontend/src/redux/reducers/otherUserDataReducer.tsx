import {
  OtherUserDataAction,
  OtherUserDataActionTypes
} from 'redux/action-types/otherUserDataActionTypes';
import image from '../../static/image-not-found.jpg';
import { otherUserDataStateType } from '../ts-types';

const initialState: otherUserDataStateType = {
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
    personalLocations: [],
    role: ''
  }
};

export const otherUserDataReducer = (
  state = initialState,
  action: OtherUserDataAction
): otherUserDataStateType => {
  switch (action.type) {
    case OtherUserDataActionTypes.FETCH_OTHER_USER_DATA_LOADING:
      return {
        loading: true,
        error: null,
        data: initialState.data,
        success: false
      };
    case OtherUserDataActionTypes.FETCH_OTHER_USER_DATA_SUCCESS:
      return {
        loading: false,
        error: null,
        data: action.payload,
        success: true
      };
    case OtherUserDataActionTypes.FETCH_OTHER_USER_DATA_ERROR:
      return {
        loading: false,
        error: action.payload,
        data: initialState.data,
        success: false
      };
    case OtherUserDataActionTypes.UPDATE_OTHER_USER_DATA_LOADING:
      return { ...state, loading: true, error: null, success: false };
    case OtherUserDataActionTypes.UPDATE_OTHER_USER_DATA_SUCCESS:
      return {
        loading: false,
        error: null,
        data: {
          ...state.data,
          ...action.payload
        },
        success: true
      };
    case OtherUserDataActionTypes.UPDATE_OTHER_USER_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false
      };
    case OtherUserDataActionTypes.UPDATE_USER_DATA_AND_BAN_LOADING:
      return {
        loading: false,
        error: null,
        data: initialState.data,
        success: false
      };
    case OtherUserDataActionTypes.UPDATE_USER_DATA_AND_BAN_SUCCESS:
      return {
        loading: false,
        error: null,
        data: action.payload,
        success: true
      };
    case OtherUserDataActionTypes.UPDATE_USER_DATA_AND_BAN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false
      };
    default:
      return state;
  }
};
