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
      const { data } = await axios.get(url);

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

export function startLoading(): LocationActions {
  return { type: LocationActionTypes.LOADING_START };
}

export const sendComment =
  (id: string, comment: Comment) =>
  async (dispatch: Dispatch<LocationActions>) => {
    try {
      const response = await axios.put(
        `${REACT_APP_API_URI}locations/comment`,
        {
          id,
          comment
        }
      );
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
