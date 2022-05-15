import { Dispatch } from 'redux';
import axios from 'axios';
import { UserAction, UserActionTypes } from '../types/user';

const { REACT_APP_API_URI } = process.env;

export const fetchUser =
  (accessToken: string) => async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({ type: UserActionTypes.FETCH_USER });
      const response = await axios.get(`${REACT_APP_API_URI}profile`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      dispatch({
        type: UserActionTypes.FETCH_USER_SUCCESS,
        payload: response.data.userData
      });
    } catch (e) {
      dispatch({
        type: UserActionTypes.FETCH_USER_ERROR,
        payload: 'An error occurred while loading user data'
      });
    }
  };

// Login
export const login =
  (email: string, password: string) =>
  async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({
        type: UserActionTypes.USER_LOGIN_REQUEST
      });
      const response = await axios.post(`${REACT_APP_API_URI}signin`, {
        email,
        password
      });
      dispatch({
        type: UserActionTypes.USER_LOGIN_SUCCESS,
        payload: response.data
      });

      localStorage.setItem('accessToken', response.data.token);
    } catch (error: any) {
      dispatch({
        type: UserActionTypes.USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.massage
            ? error.response.data.message
            : error.message
      });
    }
  };

export const logout = () => async (dispatch: Dispatch<UserAction>) => {
  dispatch({
    type: UserActionTypes.USER_LOGOUT
  });
  localStorage.removeItem('accessToken');
};
