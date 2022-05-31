import {
  PrivateUserDataActionTypes,
  PrivateUserDataAction
} from 'redux/action-types/privateUserDataActionTypes';
import { privateUserDataStateType } from '../ts-types';

const initialState: privateUserDataStateType = {
  loading: false,
  error: null,
  data: {
    email: '',
    createdAt: '',
    updatedAt: ''
  }
};

export const privateUserDataReducer = (
  state = initialState,
  action: PrivateUserDataAction
): privateUserDataStateType => {
  switch (action.type) {
    case PrivateUserDataActionTypes.FETCH_PRIVATE_USER_DATA_LOADING:
      return { loading: true, error: null, data: initialState.data };
    case PrivateUserDataActionTypes.FETCH_PRIVATE_USER_DATA_SUCCESS:
      return { loading: false, error: null, data: action.payload };
    case PrivateUserDataActionTypes.FETCH_PRIVATE_USER_DATA_ERROR:
      return { loading: false, error: action.payload, data: initialState.data };
    case PrivateUserDataActionTypes.UPDATE_PRIVATE_USER_DATA_LOADING:
      return { ...state, loading: true, error: null };
    case PrivateUserDataActionTypes.UPDATE_PRIVATE_USER_DATA_SUCCESS:
      return {
        loading: false,
        error: null,
        data: {
          ...state.data,
          ...action.payload
        }
      };
    case PrivateUserDataActionTypes.UPDATE_PRIVATE_USER_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case PrivateUserDataActionTypes.DELETE_PRIVATE_USER_DATA:
      return {
        loading: false,
        error: null,
        data: initialState.data
      };
    default:
      return state;
  }
};
