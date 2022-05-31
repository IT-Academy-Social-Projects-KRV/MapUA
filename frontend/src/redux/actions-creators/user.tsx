import { Dispatch } from 'redux';
import axios from 'services/axios';
import { UserAction, UserActionTypes } from '../action-types/userActionTypes';

export const fetchUser =
  (accessToken: string) => async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({ type: UserActionTypes.FETCH_USER });
      localStorage.setItem('accessToken', accessToken);
      const response = await axios.get(`profile`, {});
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
