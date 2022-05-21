/* eslint-disable prettier/prettier */
import { Dispatch } from 'redux';
import axios from 'axios';
import {
  UserAuthAction,
  UserAuthActionTypes
} from 'redux/action-types/userAuthActionTypes';

const { REACT_APP_API_URI } = process.env;

// Login
export const login =
  (email: string, password: string) =>
    async (dispatch: Dispatch<UserAuthAction>) => {
      try {
        dispatch({
          type: UserAuthActionTypes.USER_LOGIN_REQUEST
        });
        const response = await axios.post(`${REACT_APP_API_URI}signin`, {
          email,
          password
        });

        dispatch({
          type: UserAuthActionTypes.USER_LOGIN_SUCCESS,
          payload: response.data
        });

        localStorage.setItem('accessToken', response.data.token);
      } catch (error: any) {
        dispatch({
          type: UserAuthActionTypes.USER_LOGIN_FAIL,
          payload:
            error.response && error.response.data.massage
              ? error.response.data.message
              : error.message
        });
      }
    };

export const loginOAuth =
  (token: string, id: string) => async (dispatch: Dispatch<UserAuthAction>) => {
    dispatch({
      type: UserAuthActionTypes.USER_LOGIN_REQUEST
    });

    dispatch({
      type: UserAuthActionTypes.USER_LOGIN_SUCCESS,
      payload: {
        user: {
          _id: id
        },
        token
      }
    });

    localStorage.setItem('accessToken', token);
  };

export const logout = () => async (dispatch: Dispatch<UserAuthAction>) => {
  dispatch({
    type: UserAuthActionTypes.USER_LOGOUT
  });
  localStorage.removeItem('accessToken');
};

// Check if user authorized every time when component mounted
export const checkIsUserAuthorized =
  (accessToken: string) => async (dispatch: Dispatch<UserAuthAction>) => {
    try {
      dispatch({
        type: UserAuthActionTypes.IF_USER_AUTORIZED_REQUEST
      });
      const response = await axios.get(`${REACT_APP_API_URI}is-authenticated`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      dispatch({
        type: UserAuthActionTypes.IF_USER_AUTORIZED_SUCCESS,
        payload: response.data.success
      });
    } catch (e) {
      dispatch({
        type: UserAuthActionTypes.IF_USER_AUTORIZED_ERROR,
        payload: 'An error occurred while loading user data'
      });
    }
  };
