import { Dispatch } from 'redux';
import axios from 'services/axios';
import {
  LocationActions,
  LocationActionTypes
} from 'redux/action-types/popupLocationActionTypes';
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

      if (response.status === 200) {
        dispatch({
          type: UserDataActionTypes.UPDATE_USER_DATA_SUCCESS,
          payload: response.data
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

      if (response.status === 200) {
        dispatch({
          type: UserDataActionTypes.UPDATE_USER_DATA_SUCCESS,
          payload: response.data
        });
      }
    } catch (error: any) {
      console.error(error);
      dispatch({
        type: LocationActionTypes.TOGGLE_FAVORITE_FIELD_ERROR,
        payload: 'Could not toggle favorite field'
        // error.response && error.response.data.info.message
        //   ? error.response.data.info.message
        //   : error.message
      });
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
      console.error(error);
      dispatch({
        type: LocationActionTypes.UPDATE_LOCATION_ERROR,
        payload: 'Could not update location'
        // error.response && error.response.data.info.message
        //   ? error.response.data.info.message
        //   : error.message
      });
    }
  };
