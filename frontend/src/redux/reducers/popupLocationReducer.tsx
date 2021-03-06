import {
  LocationActions,
  LocationActionTypes
} from 'redux/action-types/popupLocationActionTypes';
import { popupLocationStateType } from '../ts-types';
import { AuthorInfoType } from '../../../types';

export const initialState: popupLocationStateType = {
  loading: false,
  error: null,
  success: false,
  data: {
    _id: '',
    locationName: '',
    author: {} as AuthorInfoType,
    coordinates: [0, 0],
    arrayPhotos: [],
    description: '',
    filters: [],
    reported: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }
};

export const popupLocationReducer = (
  state = initialState,
  action: LocationActions
): popupLocationStateType => {
  switch (action.type) {
    case LocationActionTypes.FETCH_LOCATION_LOADING:
      return {
        loading: true,
        error: null,
        data: initialState.data,
        success: false
      };
    case LocationActionTypes.FETCH_LOCATION_SUCCESS:
      return {
        loading: false,
        error: null,
        data: {
          ...action.payload,
          createdAt: new Date(action.payload.createdAt),
          updatedAt: new Date(action.payload.updatedAt)
        },
        success: true
      };
    case LocationActionTypes.FETCH_LOCATION_ERROR:
      return {
        loading: false,
        error: action.payload,
        data: initialState.data,
        success: false
      };

    case LocationActionTypes.UPDATE_LOCATION_LOADING:
      return { ...state, loading: true, error: null, success: false };
    case LocationActionTypes.UPDATE_LOCATION_SUCCESS:
      return {
        loading: false,
        error: null,
        data: {
          ...action.payload,
          createdAt: new Date(action.payload.createdAt),
          updatedAt: new Date(action.payload.updatedAt)
        },
        success: true
      };

    case LocationActionTypes.UPDATE_LOCATION_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false
      };

    case LocationActionTypes.UPDATE_LOCATION_DATA_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
        success: false
      };
    case LocationActionTypes.UPDATE_LOCATION_DATA_SUCCESS:
      return {
        loading: false,
        error: null,
        data: {
          ...action.payload,
          createdAt: new Date(action.payload.createdAt),
          updatedAt: new Date(action.payload.updatedAt)
        },
        success: true
      };
    case LocationActionTypes.UPDATE_LOCATION_DATA_ERROR:
      return {
        loading: false,
        error: action.payload,
        data: initialState.data,
        success: false
      };

    case LocationActionTypes.ADD_REPORT_TO_LOCATION_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
        success: false
      };
    case LocationActionTypes.ADD_REPORT_TO_LOCATION_SUCCESS:
      return {
        loading: false,
        error: null,
        data: {
          ...action.payload,
          createdAt: new Date(action.payload.createdAt),
          updatedAt: new Date(action.payload.updatedAt)
        },
        success: true
      };
    case LocationActionTypes.ADD_REPORT_TO_LOCATION_ERROR:
      return {
        loading: false,
        error: action.payload,
        data: initialState.data,
        success: false
      };

    case LocationActionTypes.DELETE_REPORT_TO_LOCATION_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
        success: false
      };
    case LocationActionTypes.DELETE_REPORT_TO_LOCATION_SUCCESS:
      return {
        loading: false,
        error: null,
        data: {
          ...action.payload,
          createdAt: new Date(action.payload.createdAt),
          updatedAt: new Date(action.payload.updatedAt)
        },
        success: true
      };
    case LocationActionTypes.DELETE_REPORT_TO_LOCATION_ERROR:
      return {
        loading: false,
        error: action.payload,
        data: initialState.data,
        success: false
      };

    case LocationActionTypes.LOCATION_DATA_CLEAR:
      return { ...initialState };
    default:
      return state;
  }
};
