import {
  LocationActions,
  LocationActionTypes
} from 'redux/action-types/popupLocationActionTypes';
import { locationState } from 'redux/ts-types/popupLocation';

export const initialState: locationState = {
  _id: '',
  locationName: '',
  rating: {
    likes: [],
    dislikes: []
  },
  coordinates: [0, 0],
  arrayPhotos: [],
  description: '',
  comments: [],
  createdAt: new Date(),
  updatedAt: new Date(),
  isLoading: false
};
export const popupLocationReducer = (
  state = initialState,
  action: LocationActions
): locationState => {
  switch (action.type) {
    case LocationActionTypes.FETCH_lOCATION:
<<<<<<< HEAD
      return { ...state, ...action.payload };
    case LocationActionTypes.UPDATE_LOCATION:
      return { ...state, ...action.payload };
=======
      return {
        ...state,
        ...action.payload,
        createdAt: new Date(action.payload.createdAt),
        updatedAt: new Date(action.payload.updatedAt)
      };
    case LocationActionTypes.UPDATE_LOCATION:
      return {
        ...state,
        ...action.payload,
        createdAt: new Date(action.payload.createdAt),
        updatedAt: new Date(action.payload.updatedAt)
      };
>>>>>>> 519b063ea3bc0a5e45c176e8e92205645c4834e6
    case LocationActionTypes.LOADING_START:
      return { ...state, isLoading: true };
    case LocationActionTypes.LOADING_END:
      return { ...state, isLoading: false };
    case LocationActionTypes.ADD_COMMENT:
      return { ...state, comments: [action.payload, ...state.comments] };
    default:
      return state;
  }
};
