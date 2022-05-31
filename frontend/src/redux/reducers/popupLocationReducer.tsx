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
    case LocationActionTypes.LOADING_START:
      return { ...state, isLoading: true };
    case LocationActionTypes.LOADING_END:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};
