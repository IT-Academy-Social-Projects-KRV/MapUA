/* eslint-disable prettier/prettier */
import { Dispatch } from 'redux';
import {
  isUserAuthorizedAction,
  IsUserAuthorizedActionTypes
} from 'redux/action-types/isUserAuthorizedActionTypes';
import axios from 'services/axios';
import {
  SnackbarActions,
  SnackbarActionsType
} from '../action-types/snackbarActionTypes';

export const login =
  (email: string, password: string, notification: string) =>
  async (dispatch: Dispatch<isUserAuthorizedAction | SnackbarActions>) => {
    try {
      dispatch({
        type: IsUserAuthorizedActionTypes.LOGIN_USER_LOADING
      });
      const response = await axios().post(`signin`, { email, password });

      dispatch({
        type: IsUserAuthorizedActionTypes.LOGIN_USER_SUCCESS,
        payload: response.data.role
      });
      localStorage.setItem('accessToken', response.data.token);
      dispatch({
        type: SnackbarActionsType.SET_SUCCESS,
        payload: notification
      });
    } catch (error: any) {
      dispatch({
        type: IsUserAuthorizedActionTypes.LOGIN_USER_ERROR,
        payload:
          error.response && error.response.data.info.message
            ? error.response.data.info.message
            : error.message
      });
      throw new Error(error);
    }
  };

export const loginOAuth =
  (token: string) =>
  async (dispatch: Dispatch<isUserAuthorizedAction>) => {
    dispatch({
      type: IsUserAuthorizedActionTypes.LOGIN_USER_LOADING
    });

    dispatch({
      type: IsUserAuthorizedActionTypes.LOGIN_USER_SUCCESS,
      payload: 'user'
    });

    localStorage.setItem('accessToken', token);
  };

export const checkIsUserAuthorized =
  () => async (dispatch: Dispatch<isUserAuthorizedAction>) => {
    try {
      dispatch({
        type: IsUserAuthorizedActionTypes.CHECK_USER_TOKEN_LOADING
      });
      const response = await axios().get('is-authenticated');

      if (response.status === 200)
        dispatch({
          type: IsUserAuthorizedActionTypes.CHECK_USER_TOKEN_SUCCESS,
          payload: response.data.role
        });
    } catch (error: any) {
      dispatch({
        type: IsUserAuthorizedActionTypes.CHECK_USER_TOKEN_ERROR,
        payload: 'An error occurred while loading user data'
      });
      localStorage.removeItem('accessToken');
      throw new Error(error);
    }
  };

export const logout =
  () => async (dispatch: Dispatch<isUserAuthorizedAction>) => {
    dispatch({
      type: IsUserAuthorizedActionTypes.LOGOUT_USER
    });
    localStorage.removeItem('accessToken');
  };
