import { Dispatch } from 'redux';
import axios from 'services/axios';
import {
  OtherUserDataAction,
  OtherUserDataActionTypes
} from '../action-types/otherUserDataActionTypes';

const { REACT_APP_API_URI } = process.env;

export const fetchOtherUserData =
  (id: string) => async (dispatch: Dispatch<OtherUserDataAction>) => {
    try {
      dispatch({
        type: OtherUserDataActionTypes.FETCH_OTHER_USER_DATA_LOADING
      });
      const response = await axios().get(`${REACT_APP_API_URI}profile/${id}`, {
        headers: {
          'Accept-Language': localStorage.getItem('i18nextLng') || ''
        }
      });
      dispatch({
        type: OtherUserDataActionTypes.FETCH_OTHER_USER_DATA_SUCCESS,
        payload: response.data.userData
      });
    } catch (error: any) {
      dispatch({
        type: OtherUserDataActionTypes.FETCH_OTHER_USER_DATA_ERROR,
        payload: 'An error occurred while loading user data'
      });
      throw new Error(error);
    }
  };
