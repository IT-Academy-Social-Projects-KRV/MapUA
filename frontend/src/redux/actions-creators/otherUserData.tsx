import { Dispatch } from 'redux';
import {
  SnackbarActions,
  SnackbarActionsType
} from 'redux/action-types/snackbarActionTypes';
import { UserDataAction } from 'redux/action-types/userDataActionTypes';
import axios from 'services/axios';
import {
  OtherUserDataAction,
  OtherUserDataActionTypes
} from '../action-types/otherUserDataActionTypes';

const { REACT_APP_API_URI } = process.env;

export const fetchOtherUserData =
  (id: string) => async (dispatch: Dispatch<OtherUserDataAction>) => {
    try {
      dispatch({
        type: OtherUserDataActionTypes.FETCH_OTHER_USER_DATA_LOADING
      });
      const response = await axios().get(`${REACT_APP_API_URI}profile/${id}`, {
        headers: {
          'Accept-Language': localStorage.getItem('i18nextLng') || ''
        }
      });
      dispatch({
        type: OtherUserDataActionTypes.FETCH_OTHER_USER_DATA_SUCCESS,
        payload: response.data.userData
      });
    } catch (error: any) {
      dispatch({
        type: OtherUserDataActionTypes.FETCH_OTHER_USER_DATA_ERROR,
        payload: 'An error occurred while loading user data'
      });
      throw new Error(error);
    }
  };

export const toggleUserBan =
  (id: string, role: string, notification: string) =>
  async (
    dispatch: Dispatch<UserDataAction | SnackbarActions | OtherUserDataAction>
  ) => {
    try {
      dispatch({
        type: OtherUserDataActionTypes.UPDATE_USER_DATA_AND_BAN_LOADING
      });

      const response = await axios().patch(
        `${process.env.REACT_APP_API_URI}profile/ban/${id}`,
        { role }
      );

      dispatch({
        type: OtherUserDataActionTypes.UPDATE_USER_DATA_AND_BAN_SUCCESS,
        payload: response.data
      });

      dispatch({
        type: SnackbarActionsType.SET_SUCCESS,
        payload: notification
      });
    } catch (error: any) {
      dispatch({
        type: OtherUserDataActionTypes.UPDATE_USER_DATA_AND_BAN_ERROR,
        payload: error.response.data?.error || 'lost network'
      });
      dispatch({
        type: SnackbarActionsType.SET_ERROR,
        payload: error.response.data?.error || 'lost network'
      });
      throw new Error(error);
    }
  };
