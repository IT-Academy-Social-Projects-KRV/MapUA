import { Dispatch } from 'redux';
import axios from 'services/axios';
import {
  LocationRatingActions,
  LocationRatingActionTypes
} from 'redux/action-types/popupLocationRatingActionTypes';

export const updatePopupLocationRating =
  (id: string | undefined, rating: {}) =>
  async (dispatch: Dispatch<LocationRatingActions>) => {
    try {
      dispatch({
        type: LocationRatingActionTypes.UPDATE_LOCATION_RATING_LOADING
      });
      const { data } = await axios().patch(`locations/${id}`, rating);

      if (data) {
        dispatch({
          type: LocationRatingActionTypes.UPDATE_LOCATION_RATING_SUCCESS,
          payload: data
        });
      }
    } catch (error: any) {
      dispatch({
        type: LocationRatingActionTypes.UPDATE_LOCATION_RATING_ERROR,
        payload:
          error.response && error.response.data.info.message
            ? error.response.data.info.message
            : error.message
      });
      throw new Error(error);
    }
  };
