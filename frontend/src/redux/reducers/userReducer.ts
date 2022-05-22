import { UserAction, UserActionTypes, UserState } from '../types/user';
import image from '../../static/image-not-found.jpg';

const initialState: UserState = {
  data: {
    _id: '',
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
