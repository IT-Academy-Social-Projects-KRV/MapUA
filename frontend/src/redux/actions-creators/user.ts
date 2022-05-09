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
      setTimeout(() => {
        dispatch({
          type: UserActionTypes.FETCH_USER_SUCCESS,
          payload: response.data.userData
        });
      }, 500);
    } catch (e) {
      dispatch({
        type: UserActionTypes.FETCH_USER_ERROR,
        payload: 'An error occurred while loading user data'
      });
    }
  };
