import axios from 'axios';
import { Dispatch } from 'redux';
import {
  CreateLocationAction,
  CreateLocationActionTypes
} from '../action-types/createLocationActionTypes';

const { REACT_APP_API_URI } = process.env;

export const createLocation =
  (formData: FormData) => async (dispatch: Dispatch<CreateLocationAction>) => {
    try {
      dispatch({
        type: CreateLocationActionTypes.CREATE_LOCATION_LOADING
      });

      const accessToken = localStorage.getItem('accessToken');
      await axios.post(`${REACT_APP_API_URI}locations/create`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      dispatch({
        type: CreateLocationActionTypes.CREATE_LOCATION_SUCCESS
      });
    } catch (error: any) {
      console.log(error);
      dispatch({
        type: CreateLocationActionTypes.CREATE_LOCATION_ERROR,
        payload:
          (error.response && error.response.data.info.message
            ? error.response.data.info.message
            : error.message) || 'Could not create location'
      });
    }
  };
