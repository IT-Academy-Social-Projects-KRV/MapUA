import { Dispatch } from 'redux';
import axios from 'services/axios';
import {
  DeleteLocationActionTypes,
  DeleteLocationActions
} from 'redux/action-types/deleteLocationActionTypes';
import {
  SnackbarActions,
  SnackbarActionsType
} from 'redux/action-types/snackbarActionTypes';
import {
  UserDataAction,
  UserDataActionTypes
} from 'redux/action-types/userDataActionTypes';

const { REACT_APP_API_URI } = process.env;

export const deleteLocation =
  (id: string, notification: string) =>
  async (
    dispatch: Dispatch<DeleteLocationActions | SnackbarActions | UserDataAction>
  ) => {
    try {
      dispatch({
        type: DeleteLocationActionTypes.DELETE_LOCATION_LOADING
      });

      const response = await axios().delete(
        `${REACT_APP_API_URI}locations/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        }
      );

      if (response.status === 200) {
        dispatch({
          type: DeleteLocationActionTypes.DELETE_LOCATION_SUCCESS
        });
      }

      dispatch({
        type: SnackbarActionsType.SET_SUCCESS,
        payload: notification
      });

      dispatch({
        type: UserDataActionTypes.UPDATE_USER_DATA_SUCCESS,
        payload: {
          personalLocations: response.data.personalLocations,
          visited: response.data.visited,
          favorite: response.data.favorite
        }
      });
    } catch (error: any) {
      dispatch({
        type: DeleteLocationActionTypes.DELETE_LOCATION_ERROR,
        payload: 'Could not delete location'
      });

      dispatch({
        type: SnackbarActionsType.SET_ERROR,
        payload: error.response.data?.error || 'lost network'
      });
      throw new Error(error);
    }
  };
