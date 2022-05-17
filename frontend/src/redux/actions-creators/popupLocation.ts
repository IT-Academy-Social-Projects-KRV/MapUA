import axios from 'axios';
import { Dispatch } from 'redux';

import {
  LocationActions,
  LocationActionTypes
} from 'redux/types/popupLocation';

const { REACT_APP_API_URI } = process.env;

export const fetchPopupLocation =
  (id: string) => async (dispatch: Dispatch<LocationActions>) => {
    try {
      const url = `${REACT_APP_API_URI}/locations/${id}`;
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
    } catch (e) {
      console.error(e);
    }
  };

export const updatePopupLocation =
  (id: string | undefined, location: {}) =>
  async (dispatch: Dispatch<LocationActions>) => {
    try {
      const url = `${REACT_APP_API_URI}/locations/${id}`;
      const { data } = await axios.patch(url, location);

      if (data) {
        dispatch({
          type: LocationActionTypes.UPDATE_LOCATION,
          payload: data
        });
        console.log(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

export function startLoading(): LocationActions {
  return { type: LocationActionTypes.LOADING_START };
}
