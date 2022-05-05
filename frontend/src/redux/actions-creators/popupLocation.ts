import { Dispatch } from 'redux';

import {
  LocationActions,
  LocationActionTypes
} from 'redux/types/popupLocation';
import { fetchData } from 'utils/requests';

const { REACT_APP_API_URI } = process.env;

export const fetchPopupLocation =
  (id: string) => async (dispatch: Dispatch<LocationActions>) => {
    try {
      const url = `${REACT_APP_API_URI}/locations/${id}`;
      const options = {
        method: 'get',
        url
      };
      const { data } = await fetchData(options);

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
      console.log(e);
    }
  };

export function startLoading(): LocationActions {
  return { type: LocationActionTypes.LOADING_START };
}
