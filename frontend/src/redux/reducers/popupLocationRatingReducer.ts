import {
  LocationRatingActions,
  LocationRatingActionTypes
} from 'redux/action-types/popupLocationRatingActionTypes';
import { popupLocationRatingStateType } from '../ts-types';

export const initialState: popupLocationRatingStateType = {
  loading: false,
  error: null,
  success: false,
  data: {
    rating: {
      likes: [],
      dislikes: []
    },
    verificationStatus: ''
  }
};

export const popupLocationRatingReducer = (
  state = initialState,
  action: LocationRatingActions
): popupLocationRatingStateType => {
  switch (action.type) {
    case LocationRatingActionTypes.FETCH_LOCATION_RATING_LOADING:
      return {
        loading: true,
        error: null,
        data: initialState.data,
        success: false
      };

    case LocationRatingActionTypes.FETCH_LOCATION_RATING_SUCCESS:
      return {
        loading: false,
        error: null,
        data: {
          ...action.payload
        },
        success: true
      };

    case LocationRatingActionTypes.FETCH_LOCATION_RATING_ERROR:
      return {
        loading: false,
        error: action.payload,
        data: initialState.data,
        success: false
      };

    case LocationRatingActionTypes.UPDATE_LOCATION_RATING_LOADING:
      return { ...state, loading: true, error: null, success: false };

    case LocationRatingActionTypes.UPDATE_LOCATION_RATING_SUCCESS:
      return {
        loading: false,
        error: null,
        data: {
          ...action.payload
        },
        success: true
      };

    case LocationRatingActionTypes.UPDATE_LOCATION_RATING_ERROR:
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
