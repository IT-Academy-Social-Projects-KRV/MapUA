import { Dispatch } from 'redux';
import axios from 'services/axios';
import {
  DeleteLocationActionTypes,
  DeleteLocationActions
} from 'redux/action-types/deleteLocationActionTypes';

const { REACT_APP_API_URI } = process.env;

export const deleteLocation =
  (id: string) => async (dispatch: Dispatch<DeleteLocationActions>) => {
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
    } catch (error: any) {
      dispatch({
        type: DeleteLocationActionTypes.DELETE_LOCATION_ERROR,
        payload: 'Could not delete location'
      });
      throw new Error(error);
    }
  };
