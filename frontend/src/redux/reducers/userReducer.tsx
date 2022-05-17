import {
  UserAction,
  UserActionTypes
} from 'redux/action-types/userActionTypes';
import { UserState } from 'redux/ts-types/user';
import image from '../../static/image-not-found.jpg';

const initialState: UserState = {
  data: {
    email: '',
    createdAt: '',
    updatedAt: '',
    displayName: '',
    description: '',
    imageUrl: image,
    subscribers: [],
    subscriptions: []
  },
  loading: false,
  error: null
};

export const userReducer = (
  state = initialState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case UserActionTypes.FETCH_USER:
      return { loading: true, error: null, data: initialState.data };
    case UserActionTypes.FETCH_USER_SUCCESS:
      return { loading: false, error: null, data: action.payload };
    case UserActionTypes.FETCH_USER_ERROR:
      return { loading: false, error: action.payload, data: initialState.data };
    default:
      return state;
  }
};
