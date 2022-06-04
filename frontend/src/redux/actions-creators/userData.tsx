import { Dispatch } from 'redux';
import axios from 'services/axios';
import {
  UserDataAction,
  UserDataActionTypes
} from '../action-types/userDataActionTypes';
import {
  SnackbarActions,
  SnackbarActionsType
} from '../action-types/snackbarActionTypes';

const { REACT_APP_API_URI } = process.env;

export const fetchUserData =
  (accessToken: string) => async (dispatch: Dispatch<UserDataAction>) => {
    try {
      dispatch({ type: UserDataActionTypes.FETCH_USER_DATA_LOADING });
      const response = await axios().get(`${REACT_APP_API_URI}profile`, {
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
      dispatch({
        type: UserDataActionTypes.FETCH_USER_DATA_ERROR,
        payload: 'An error occurred while loading user data'
      });
      throw new Error(error);
    }
  };

export const updateUserData =
  (formData: FormData) =>
  async (dispatch: Dispatch<UserDataAction | SnackbarActions>) => {
    try {
      dispatch({ type: UserDataActionTypes.UPDATE_USER_DATA_LOADING });
      const response = await axios().patch(
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
      dispatch({
        type: SnackbarActionsType.SET_SUCCESS,
        payload: 'Profile page updated successfully!'
      });
      setTimeout(() => {
        dispatch({
          type: SnackbarActionsType.RESET_SNACKBAR
        });
      }, 3000);
    } catch (error: any) {
      dispatch({
        type: UserDataActionTypes.UPDATE_USER_DATA_ERROR,
        payload: error.response.data?.error || 'lost network' // `${t('profile.profilePage.lostNetwork')}`
      });
      dispatch({
        type: SnackbarActionsType.SET_ERROR,
        payload: error.response.data?.error || 'lost network'
      });
      setTimeout(() => {
        dispatch({
          type: SnackbarActionsType.RESET_SNACKBAR
        });
      }, 3000);
      throw new Error(error);
    }
  };

export const deleteUserData = () => (dispatch: Dispatch<UserDataAction>) => {
  dispatch({
    type: UserDataActionTypes.DELETE_USER_DATA
  });
};
