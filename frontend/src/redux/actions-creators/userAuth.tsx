import { Dispatch } from 'redux';
import axios from 'axios';
import {
  UserAuthAction,
  UserAuthActionTypes
} from 'redux/action-types/userAuthActionTypes';

const { REACT_APP_API_URI } = process.env;

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

export const logout = () => async (dispatch: Dispatch<UserAuthAction>) => {
  dispatch({
    type: UserAuthActionTypes.USER_LOGOUT
  });
  localStorage.removeItem('accessToken');
};
