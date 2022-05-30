import { Dispatch } from 'redux';
import {
  LocationActions,
  LocationActionTypes
} from 'redux/action-types/popupLocationActionTypes';
import axios from 'services/axios';
import { Comment } from '../ts-types/popupLocation';

export const fetchPopupLocation =
  (id: string) => async (dispatch: Dispatch<LocationActions>) => {
    try {
      const { data } = await axios.get(`locations/${id}`);

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
      const { data } = await axios.patch(`locations/${id}`, location);

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
  (id: string, comment: Comment) =>
  async (dispatch: Dispatch<LocationActions>) => {
    try {
      const response = await axios.put(`locations/comment`, {
        id,
        comment
      });
      if (response.status === 200) {
        dispatch({
          type: LocationActionTypes.ADD_COMMENT,
          payload: comment
        });
      }
    } catch (e: any) {
      throw new Error(e);
    }
  };
