import { Dispatch } from 'redux';
import axios from 'services/axios';
import {
  LocationActions,
  LocationActionTypes
} from 'redux/action-types/popupLocationActionTypes';
import {
  SnackbarActions,
  SnackbarActionsType
} from 'redux/action-types/snackbarActionTypes';
import {
  UserDataAction,
  UserDataActionTypes
} from '../action-types/userDataActionTypes';

const { REACT_APP_API_URI } = process.env;

export const fetchPopupLocation =
  (id: string) => async (dispatch: Dispatch<LocationActions>) => {
    try {
      dispatch({
        type: LocationActionTypes.FETCH_LOCATION_LOADING
      });

      const { data } = await axios().get(`locations/${id}`);

      if (data) {
        dispatch({
          type: LocationActionTypes.FETCH_LOCATION_SUCCESS,
          payload: data
        });
      }
    } catch (error: any) {
      console.error(error);
      dispatch({
        type: LocationActionTypes.FETCH_LOCATION_ERROR,
        payload: 'could not get location'
        // error.response && error.response.data.info.message
        //   ? error.response.data.info.message
        //   : error.message
      });
    }
  };

export const toggleVisitedField =
  (locationId: string) =>
  async (dispatch: Dispatch<LocationActions | UserDataAction>) => {
    try {
      dispatch({
        type: LocationActionTypes.TOGGLE_VISITED_FIELD_LOADING
      });

      const response = await axios().put(
        `${REACT_APP_API_URI}toggleVisited`,
        {
          idOfLocation: locationId
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        }
      );

      if (response.status === 200 && response.data.updatedUser) {
        dispatch({
          type: UserDataActionTypes.UPDATE_USER_DATA_SUCCESS,
          payload: response.data.updatedUser
        });
      }
    } catch (error: any) {
      console.error(error);
      dispatch({
        type: LocationActionTypes.TOGGLE_VISITED_FIELD_ERROR,
        payload: 'Could not toggle visited field'
        // error.response && error.response.data.info.message
        //   ? error.response.data.info.message
        //   : error.message
      });
    }
  };

export const toggleFavoriteField =
  (locationId: string) =>
  async (dispatch: Dispatch<LocationActions | UserDataAction>) => {
    try {
      dispatch({
        type: LocationActionTypes.TOGGLE_FAVORITE_FIELD_LOADING
      });

      const response = await axios().put(
        `${process.env.REACT_APP_API_URI}toggleFavorite`,
        {
          idOfLocation: locationId
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        }
      );

      if (response.status === 200 && response.data.updatedUser) {
        dispatch({
          type: UserDataActionTypes.UPDATE_USER_DATA_SUCCESS,
          payload: response.data.updatedUser
        });
      }
    } catch (error: any) {
      dispatch({
        type: LocationActionTypes.TOGGLE_FAVORITE_FIELD_ERROR,
        payload: 'Could not toggle favorite field'
        // error.response && error.response.data.info.message
        //   ? error.response.data.info.message
        //   : error.message
      });
      throw new Error(error);
    }
  };

export const updatePopupLocation =
  (id: string | undefined, location: {}) =>
  async (dispatch: Dispatch<LocationActions>) => {
    try {
      dispatch({
        type: LocationActionTypes.UPDATE_LOCATION_LOADING
      });
      const { data } = await axios().patch(`locations/${id}`, location);

      if (data) {
        dispatch({
          type: LocationActionTypes.UPDATE_LOCATION_SUCCESS,
          payload: data
        });
      }
    } catch (error: any) {
      dispatch({
        type: LocationActionTypes.UPDATE_LOCATION_ERROR,
        payload: 'Could not update location'
        // error.response && error.response.data.info.message
        //   ? error.response.data.info.message
        //   : error.message
      });
      throw new Error(error);
    }
  };

export const updatePopupLocationAfterEditing =
  (id: string | undefined, formData: FormData, notification: string) =>
  async (dispatch: Dispatch<LocationActions | SnackbarActions>) => {
    try {
      dispatch({
        type: LocationActionTypes.UPDATE_LOCATION_DATA_LOADING
      });

      const { data } = await axios().patch(
        `${process.env.REACT_APP_API_URI}update_location/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (data) {
        dispatch({
          type: LocationActionTypes.UPDATE_LOCATION_DATA_SUCCESS,
          payload: data.changedData
        });
      }

      dispatch({
        type: SnackbarActionsType.SET_SUCCESS,
        payload: notification
      });
    } catch (error: any) {
      dispatch({
        type: SnackbarActionsType.SET_ERROR,
        payload: error.response.data?.error || 'lost network'
      });
    }
  };
