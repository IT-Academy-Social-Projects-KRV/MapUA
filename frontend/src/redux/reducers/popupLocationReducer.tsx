import {
  LocationActions,
  LocationActionTypes
} from 'redux/action-types/popupLocationActionTypes';
import { locationState } from 'redux/ts-types/popupLocation';

export const initialState: locationState = {
  data: {
    locationId: '',
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
    updatedAt: new Date()
  },
  isLoading: false,
  error: null
};
export const popupLocationReducer = (
  state = initialState,
  action: LocationActions
): locationState => {
  switch (action.type) {
    case LocationActionTypes.FETCH_LOCATION:
      return {
        ...state,
        data: {
          ...action.payload.data,
          createdAt: new Date(action.payload.data.createdAt),
          updatedAt: new Date(action.payload.data.updatedAt)
        }
      };
    case LocationActionTypes.UPDATE_LOCATION:
      return {
        ...state,
        data: {
          ...action.payload.data,
          createdAt: new Date(action.payload.data.createdAt),
          updatedAt: new Date(action.payload.data.updatedAt)
        }
      };
    case LocationActionTypes.LOADING_START:
      return { ...state, isLoading: true };
    case LocationActionTypes.LOADING_END:
      return { ...state, isLoading: false };
    case LocationActionTypes.ADD_COMMENT:
      return {
        ...state,
        data: {
          ...state.data,
          comments: [action.payload, ...state.data.comments]
        }
      };
    default:
      return state;
  }
};
