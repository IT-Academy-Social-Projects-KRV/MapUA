import {
  LocationActions,
  LocationActionTypes,
  locationState
} from 'redux/types/popupLocation';

export const initialState: locationState = {
  _id: ' aa',
  locationName: '',
  rating: {
    likes: 0,
    dislikes: 0
  },
  coordinates: [0, 0],
  photoSrc: '',
  description: '',
  comments: [],
  isLoading: false
};
export const popupLocationReducer = (
  state = initialState,
  action: LocationActions
): locationState => {
  switch (action.type) {
    case LocationActionTypes.FETCH_lOCATION:
      return { ...state, ...action.payload };
    case LocationActionTypes.LOADING_START:
      return { ...state, isLoading: true };
    case LocationActionTypes.LOADING_END:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};
