import axios from 'services/axios';
import { Dispatch } from 'redux';
import {
  CreateLocationAction,
  CreateLocationActionTypes
} from '../action-types/createLocationActionTypes';

export const createLocation =
  (formData: FormData) => async (dispatch: Dispatch<CreateLocationAction>) => {
    try {
      dispatch({
        type: CreateLocationActionTypes.CREATE_LOCATION_LOADING
      });

      // const options = {
      //   method: 'get',
      //   url,
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Accept-Language': localStorage.getItem('i18nextLng') || ''
      //   }
      // };
      // const { data } = await axios(options);
      // const { data } = await axios.post('comments/create', { comment });

      await axios().post('locations/create', formData, {
        headers: {
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
