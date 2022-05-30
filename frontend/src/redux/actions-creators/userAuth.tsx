/* eslint-disable prettier/prettier */
import { Dispatch } from 'redux';
import {
  UserAuthAction,
  UserAuthActionTypes
} from 'redux/action-types/userAuthActionTypes';
import axios from 'services/axios';

// Login
export const login =
  (email: string, password: string) =>
    async (dispatch: Dispatch<UserAuthAction>) => {
      try {
        dispatch({
          type: UserAuthActionTypes.USER_LOGIN_REQUEST
        });

        const res = await axios.post(`signin`, { email, password });

        dispatch({
          type: UserAuthActionTypes.USER_LOGIN_SUCCESS,
          payload: res.data
        });

        localStorage.setItem('accessToken', res.data.token);
      } catch (error: any) {
        dispatch({
          type: UserAuthActionTypes.USER_LOGIN_FAIL,
          payload:
            error.res && error.res.data.info.message
              ? error.response.data.info.message
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
  () => async (dispatch: Dispatch<UserAuthAction>) => {
    try {
      dispatch({
        type: UserAuthActionTypes.IF_USER_AUTORIZED_REQUEST
      });
      const response = await axios.get(`is-authenticated`);
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
