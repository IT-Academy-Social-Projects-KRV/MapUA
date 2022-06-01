import { Dispatch } from 'redux';
import axios from 'services/axios';
// import { useTranslation } from 'react-i18next';
import {
  PrivateUserDataAction,
  PrivateUserDataActionTypes
} from '../action-types/privateUserDataActionTypes';

const { REACT_APP_API_URI } = process.env;
// const { t } = useTranslation();

export const fetchPrivateUserData =
  (accessToken: string) =>
  async (dispatch: Dispatch<PrivateUserDataAction>) => {
    try {
      dispatch({
        type: PrivateUserDataActionTypes.FETCH_PRIVATE_USER_DATA_LOADING
      });
      const response = await axios().get(
        `${REACT_APP_API_URI}private-user-data`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Accept-Language': localStorage.getItem('i18nextLng') || ''
          }
        }
      );
      if (response.status === 200) {
        dispatch({
          type: PrivateUserDataActionTypes.FETCH_PRIVATE_USER_DATA_SUCCESS,
          payload: response.data.privateUserData
        });
      }
    } catch (error: any) {
      console.error(error);
      dispatch({
        type: PrivateUserDataActionTypes.FETCH_PRIVATE_USER_DATA_ERROR,
        payload: 'An error occurred while loading user data'
      });
    }
  };

export const updatePrivateUserData =
  (formData: FormData) => async (dispatch: Dispatch<PrivateUserDataAction>) => {
    try {
      dispatch({
        type: PrivateUserDataActionTypes.UPDATE_PRIVATE_USER_DATA_LOADING
      });
      const response = await axios().patch(
        `${process.env.REACT_APP_API_URI}private-user-data`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      dispatch({
        type: PrivateUserDataActionTypes.UPDATE_PRIVATE_USER_DATA_SUCCESS,
        payload: response.data
      });
    } catch (error: any) {
      console.error(error);
      dispatch({
        type: PrivateUserDataActionTypes.UPDATE_PRIVATE_USER_DATA_ERROR,
        payload: error.response.data?.error || 'lost network' // `${t('profile.profilePage.lostNetwork')}`
      });
    }
  };

export const deletePrivateUserData =
  () => (dispatch: Dispatch<PrivateUserDataAction>) => {
    dispatch({
      type: PrivateUserDataActionTypes.DELETE_PRIVATE_USER_DATA
    });
  };
