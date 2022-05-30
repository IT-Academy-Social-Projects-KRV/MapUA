import {
  UserAction,
  UserActionTypes
} from 'redux/action-types/userActionTypes';
import image from '../../static/image-not-found.jpg';
import { InitialStateType } from '../ts-types';
import { UserDataType } from '../../../types';

const initialState: InitialStateType<UserDataType> = {
  loading: false,
  error: null,
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
  action: UserAction
): InitialStateType<UserDataType> => {
  switch (action.type) {
    case UserActionTypes.FETCH_USER:
      return { loading: true, error: null, data: initialState.data };
    case UserActionTypes.FETCH_USER_SUCCESS:
      return { loading: false, error: null, data: action.payload };
    case UserActionTypes.UPDATE_USER:
      return {
        loading: false,
        error: null,
        data: {
          ...state.data,
          ...action.payload
        }
      };
    case UserActionTypes.FETCH_USER_ERROR:
      return { loading: false, error: action.payload, data: initialState.data };
    default:
      return state;
  }
};
