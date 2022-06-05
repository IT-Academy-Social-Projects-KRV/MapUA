import axios from 'services/axios';
import { Dispatch } from 'redux';
import {
  CreateLocationAction,
  CreateLocationActionTypes
} from '../action-types/createLocationActionTypes';
import {
  SnackbarActions,
  SnackbarActionsType
} from '../action-types/snackbarActionTypes';

export const createLocation =
  (formData: FormData, notificationOnSuccess: string) =>
  async (dispatch: Dispatch<CreateLocationAction | SnackbarActions>) => {
    try {
      dispatch({
        type: CreateLocationActionTypes.CREATE_LOCATION_LOADING
      });

      await axios().post('locations/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      dispatch({
        type: CreateLocationActionTypes.CREATE_LOCATION_SUCCESS
      });
      dispatch({
        type: SnackbarActionsType.SET_SUCCESS,
        payload: notificationOnSuccess
      });
      setTimeout(() => {
        dispatch({
          type: SnackbarActionsType.RESET_SNACKBAR
        });
      }, 3000);
    } catch (error: any) {
      dispatch({
        type: CreateLocationActionTypes.CREATE_LOCATION_ERROR,
        payload:
          (error.response && error.response.data.info.message
            ? error.response.data.info.message
            : error.message) || 'Could not create location'
      });
      dispatch({
        type: SnackbarActionsType.SET_ERROR,
        payload:
          (error.response && error.response.data.info.message
            ? error.response.data.info.message
            : error.message) || 'Could not create location'
      });
      setTimeout(() => {
        dispatch({
          type: SnackbarActionsType.RESET_SNACKBAR
        });
      }, 3000);
      throw new Error(error);
    }
  };
