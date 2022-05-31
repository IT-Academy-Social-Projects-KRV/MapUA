import axios from 'axios';
import { Dispatch } from 'redux';
import {
  LocationActions,
  LocationActionTypes
} from 'redux/action-types/popupLocationActionTypes';
import { Comment } from '../../../types';

const { REACT_APP_API_URI } = process.env;

export const fetchPopupLocation =
  (id: string) => async (dispatch: Dispatch<LocationActions>) => {
    try {
      dispatch({
        type: LocationActionTypes.FETCH_LOCATION_LOADING
      });

      const url = `${REACT_APP_API_URI}locations/${id}`;
      const { data } = await axios.get(url, {
        headers: {
          'Accept-Language': localStorage.getItem('i18nextLng') || ''
        }
      });

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

export const updatePopupLocation =
  (id: string | undefined, location: {}) =>
  async (dispatch: Dispatch<LocationActions>) => {
    try {
      dispatch({
        type: LocationActionTypes.UPDATE_LOCATION_LOADING
      });

      const url = `${REACT_APP_API_URI}locations/${id}`;
      const { data } = await axios.patch(url, location, {
        headers: {
          'Accept-Language': localStorage.getItem('i18nextLng') || ''
        }
      });

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

export const sendComment =
  (id: string, comment: Comment) =>
  async (dispatch: Dispatch<LocationActions>) => {
    try {
      dispatch({
        type: LocationActionTypes.ADD_COMMENT_LOADING
      });

      const response = await axios.put(
        `${REACT_APP_API_URI}locations/comment`,
        {
          id,
          comment
        },
        {
          headers: {
            'Accept-Language': localStorage.getItem('i18nextLng') || ''
          }
        }
      );
      if (response.status === 200) {
        dispatch({
          type: LocationActionTypes.ADD_COMMENT_SUCCESS,
          payload: comment
        });
      }
    } catch (error: any) {
      console.error(error);
      dispatch({
        type: LocationActionTypes.ADD_COMMENT_ERROR,
        payload: 'Could not send comment'
        // error.response && error.response.data.info.message
        //   ? error.response.data.info.message
        //   : error.message
      });
    }
  };
