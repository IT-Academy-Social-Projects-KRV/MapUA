import { Dispatch } from 'redux';
import axios from 'axios';
import { UserAction, UserActionTypes } from '../types/user';

const { REACT_APP_API_URI } = process.env;

export const fetchUsers = () => async (dispatch: Dispatch<UserAction>) => {
  try {
    dispatch({ type: UserActionTypes.FETCH_USERS });
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/users'
    );
    setTimeout(() => {
      dispatch({
        type: UserActionTypes.FETCH_USERS_SUCCESS,
        payload: response.data
      });
    }, 500);
  } catch (e) {
    dispatch({
      type: UserActionTypes.FETCH_USERS_ERROR,
      payload: 'An error occurred while loading list of users'
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

      setTimeout(() => {
        dispatch({
          type: UserActionTypes.USER_LOGIN_SUCCESS,
          payload: response.data
        });
      }, 500);
      localStorage.setItem('accessToken', JSON.stringify(response.data.token));
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
