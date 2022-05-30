import {
  UserAction
  // UserActionTypes
} from 'redux/action-types/userActionTypes';
import { InitialStateType } from '../ts-types';

type PrivateUserDataType = {
  email: string;
  createdAt: Date | string;
  updatedAt: Date | string;
};

const initialState: InitialStateType<PrivateUserDataType> = {
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
  action: UserAction
): InitialStateType<PrivateUserDataType> => {
  switch (action.type) {
    // case UserActionTypes.FETCH_PRIVATE_USER_DATA_LOADING:
    //   return { loading: true, error: null, data: initialState.data };
    // case UserActionTypes.FETCH_PRIVATE_USER_DATA_SUCCESS:
    //   return { loading: false, error: null, data: action.payload };
    // case UserActionTypes.UPDATE_USER:
    //   return {
    //     loading: false,

    //     error: null,
    //     data: {
    //       ...state.data,
    //       ...action.payload
    //     }
    //   };
    // case UserActionTypes.FETCH_PRIVATE_USER_DATA_ERROR:
    //   return { loading: false, error: action.payload, data: initialState.data };
    default:
      return state;
  }
};
