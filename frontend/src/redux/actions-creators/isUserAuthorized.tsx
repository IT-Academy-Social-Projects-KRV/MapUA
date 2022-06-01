/* eslint-disable prettier/prettier */
import { Dispatch } from 'redux';
import {
  isUserAuthorizedAction,
  IsUserAuthorizedActionTypes
} from 'redux/action-types/isUserAuthorizedActionTypes';
import axios from 'axios';
import axios1 from 'services/axios';

export const login =
  (email: string, password: string) =>
  async (dispatch: Dispatch<isUserAuthorizedAction>) => {
    try {
      dispatch({
        type: IsUserAuthorizedActionTypes.LOGIN_USER_LOADING
      });

      const response = await axios.post(`signin`, { email, password });

      dispatch({
        type: IsUserAuthorizedActionTypes.LOGIN_USER_SUCCESS,
        payload: response.data
      });

      localStorage.setItem('accessToken', response.data.token);
    } catch (error: any) {
      console.error(error);
      dispatch({
        type: IsUserAuthorizedActionTypes.LOGIN_USER_ERROR,
        payload:
          error.response && error.response.data.info.message
            ? error.response.data.info.message
            : error.message
      });
    }
  };

export const loginOAuth =
  (token: string, id: string) => async (dispatch: Dispatch<isUserAuthorizedAction>) => {
    dispatch({
      type: IsUserAuthorizedActionTypes.LOGIN_USER_LOADING
    });

    dispatch({
      type: IsUserAuthorizedActionTypes.LOGIN_USER_SUCCESS,
      payload: {
        user: {
          _id: id
        },
        token
      }
    });

    localStorage.setItem('accessToken', token);
  };

export const checkIsUserAuthorized = () => async (dispatch: Dispatch<isUserAuthorizedAction>) => {
    try {
      dispatch({
        type: IsUserAuthorizedActionTypes.CHECK_USER_TOKEN_LOADING
      });
      const response = await axios1.get(`is-authenticated`);
      if (response.status === 200)
        dispatch({
          type: IsUserAuthorizedActionTypes.CHECK_USER_TOKEN_SUCCESS
        });
    } catch (error: any) {
      console.error(error);
      dispatch({
        type: IsUserAuthorizedActionTypes.CHECK_USER_TOKEN_ERROR,
        payload: 'An error occurred while loading user data'
      });
      localStorage.removeItem('accessToken');
    }
  };

export const logout = () => async (dispatch: Dispatch<isUserAuthorizedAction>) => {
  dispatch({
    type: IsUserAuthorizedActionTypes.LOGOUT_USER
  });
  localStorage.removeItem('accessToken');
};
