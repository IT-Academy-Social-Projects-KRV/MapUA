import { Dispatch } from 'redux';
import axios from 'axios';
// import { useTranslation } from 'react-i18next';
import {
  UserDataAction,
  UserDataActionTypes
} from '../action-types/userDataActionTypes';

const { REACT_APP_API_URI } = process.env;
// const { t } = useTranslation();

export const fetchUserData =
  (accessToken: string) => async (dispatch: Dispatch<UserDataAction>) => {
    try {
      dispatch({ type: UserDataActionTypes.FETCH_USER_DATA_LOADING });
      const response = await axios.get(`${REACT_APP_API_URI}profile`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Accept-Language': localStorage.getItem('i18nextLng') || ''
        }
      });
      dispatch({
        type: UserDataActionTypes.FETCH_USER_DATA_SUCCESS,
        payload: response.data.userData
      });
    } catch (error: any) {
      console.error(error);
      dispatch({
        type: UserDataActionTypes.FETCH_USER_DATA_ERROR,
        payload: 'An error occurred while loading user data'
      });
    }
  };

export const updateUserData =
  (formData: FormData) => async (dispatch: Dispatch<UserDataAction>) => {
    try {
      dispatch({ type: UserDataActionTypes.UPDATE_USER_DATA_LOADING });
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URI}profile`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      dispatch({
        type: UserDataActionTypes.UPDATE_USER_DATA_SUCCESS,
        payload: response.data
      });
    } catch (error: any) {
      console.error(error);
      dispatch({
        type: UserDataActionTypes.UPDATE_USER_DATA_ERROR,
        payload: error.response.data?.error || 'lost network' // `${t('profile.profilePage.lostNetwork')}`
      });
    }
  };

export const deleteUserData = () => (dispatch: Dispatch<UserDataAction>) => {
  dispatch({
    type: UserDataActionTypes.DELETE_USER_DATA
  });
};
