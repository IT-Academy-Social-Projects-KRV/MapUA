import axios from 'axios';
import { Dispatch } from 'redux';
import {
  LocationActions,
  LocationActionTypes
} from 'redux/action-types/popupLocationActionTypes';
import { Comment } from '../ts-types/popupLocation';

const { REACT_APP_API_URI } = process.env;

export const fetchPopupLocation =
  (id: string) => async (dispatch: Dispatch<LocationActions>) => {
    try {
      const url = `${REACT_APP_API_URI}locations/${id}`;
      const { data } = await axios.get(url, {
        headers: {
          'Accept-Language': localStorage.getItem('i18nextLng') || ''
        }
      });

      if (data) {
        dispatch({
          type: LocationActionTypes.FETCH_lOCATION,
          payload: data
        });
        dispatch({
          type: LocationActionTypes.LOADING_END
        });
      }
    } catch (e: any) {
      throw new Error(e);
    }
  };

export const updatePopupLocation =
  (id: string | undefined, location: {}) =>
  async (dispatch: Dispatch<LocationActions>) => {
    try {
      const url = `${REACT_APP_API_URI}locations/${id}`;
      const { data } = await axios.patch(url, location, {
        headers: {
          'Accept-Language': localStorage.getItem('i18nextLng') || ''
        }
      });

      if (data) {
        dispatch({
          type: LocationActionTypes.UPDATE_LOCATION,
          payload: data
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

export function startLoading(): LocationActions {
  return { type: LocationActionTypes.LOADING_START };
}

export const sendComment =
  (comment: Comment<string>) => async (dispatch: Dispatch<LocationActions>) => {
    try {
      const { data } = await axios.post(
        `${REACT_APP_API_URI}comments/create`,
        {
          comment
        },
        {
          headers: {
            'Accept-Language': localStorage.getItem('i18nextLng') || ''
          }
        }
      );
      if (data) {
        dispatch({
          type: LocationActionTypes.ADD_COMMENT,
          payload: data
        });
      }
    } catch (e: any) {
      throw new Error(e);
    }
  };

export const fetchComments =
  (locationId: string) => async (dispatch: Dispatch<LocationActions>) => {
    try {
      const { data } = await axios.get(
        `${REACT_APP_API_URI}comments/${locationId}`,
        {
          headers: {
            'Accept-Language': localStorage.getItem('i18nextLng') || ''
          }
        }
      );
      dispatch({
        type: LocationActionTypes.FETCH_COMMENTS,
        payload: data
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
