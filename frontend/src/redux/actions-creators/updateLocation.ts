import { Dispatch } from 'redux';
import {
  LocationDataAction,
  LocationDataActionTypes
} from 'redux/action-types/updateLocationActionTypes';
import axios from 'services/axios';
import {
  SnackbarActions,
  SnackbarActionsType
} from '../action-types/snackbarActionTypes';

export const updateLocationData =
  (formData: FormData, notification: string, id: string) =>
  async (dispatch: Dispatch<LocationDataAction | SnackbarActions>) => {
    try {
      dispatch({ type: LocationDataActionTypes.UPDATE_LOCATION_DATA_LOADING });

      const response = await axios().patch(
        `${process.env.REACT_APP_API_URI}update_location/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      dispatch({
        type: LocationDataActionTypes.UPDATE_LOCATION_DATA_SUCCESS,
        payload: response.data
      });

      dispatch({
        type: SnackbarActionsType.SET_SUCCESS,
        payload: notification
      });
    } catch (error: any) {
      dispatch({
        type: SnackbarActionsType.SET_ERROR,
        payload: error.response.data?.error || 'lost network'
      });
      throw new Error(error);
    }
  };
