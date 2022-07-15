import { Dispatch } from 'redux';
import axios from 'services/axios';
import {
  UserDataAction,
  UserDataActionTypes
} from '../action-types/userDataActionTypes';
import {
  SnackbarActions,
  SnackbarActionsType
} from '../action-types/snackbarActionTypes';
import {
  OtherUserDataAction,
  OtherUserDataActionTypes
} from '../action-types/otherUserDataActionTypes';

const { REACT_APP_API_URI } = process.env;

export const fetchUserData =
  (accessToken: string) => async (dispatch: Dispatch<UserDataAction>) => {
    try {
      dispatch({ type: UserDataActionTypes.FETCH_USER_DATA_LOADING });
      const response = await axios().get(`${REACT_APP_API_URI}profile`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Accept-Language': localStorage.getItem('i18nextLng') || ''
        }
      });
      dispatch({
        type: UserDataActionTypes.FETCH_USER_DATA_SUCCESS,
        payload: response.data.userData
      });
    } catch (error: any) {
      dispatch({
        type: UserDataActionTypes.FETCH_USER_DATA_ERROR,
        payload: 'An error occurred while loading user data'
      });
      throw new Error(error);
    }
  };

export const updateUserData =
  (formData: FormData, notification: string) =>
  async (dispatch: Dispatch<UserDataAction | SnackbarActions>) => {
    try {
      dispatch({ type: UserDataActionTypes.UPDATE_USER_DATA_LOADING });
      const response = await axios().patch(
        `${process.env.REACT_APP_API_URI}profile`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      dispatch({
        type: UserDataActionTypes.UPDATE_USER_DATA_SUCCESS,
        payload: response.data
      });
      dispatch({
        type: SnackbarActionsType.SET_SUCCESS,
        payload: notification
      });
    } catch (error: any) {
      dispatch({
        type: UserDataActionTypes.UPDATE_USER_DATA_ERROR,
        payload: error.response.data?.error || 'lost network'
      });
      dispatch({
        type: SnackbarActionsType.SET_ERROR,
        payload: error.response.data?.error || 'lost network'
      });
      throw new Error(error);
    }
  };
export const toggleUserSubscription =
  (otherUserId: string, notification: string) =>
  async (
    dispatch: Dispatch<UserDataAction | SnackbarActions | OtherUserDataAction>
  ) => {
    try {
      dispatch({ type: UserDataActionTypes.UPDATE_USER_DATA_LOADING });
      dispatch({
        type: OtherUserDataActionTypes.UPDATE_OTHER_USER_DATA_LOADING
      });
      const response = await axios().patch(
        `${process.env.REACT_APP_API_URI}subscriptions`,
        {
          subscriptionId: otherUserId
        }
      );
      dispatch({
        type: UserDataActionTypes.UPDATE_USER_DATA_SUCCESS,
        payload: {
          subscriptions: response.data.subscriptions
        }
      });
      dispatch({
        type: OtherUserDataActionTypes.UPDATE_OTHER_USER_DATA_SUCCESS,
        payload: {
          subscribers: response.data.subscribers
        }
      });
      dispatch({
        type: SnackbarActionsType.SET_SUCCESS,
        payload: notification
      });
    } catch (error: any) {
      dispatch({
        type: UserDataActionTypes.UPDATE_USER_DATA_ERROR,
        payload: error.response.data?.error || 'lost network'
      });
      dispatch({
        type: OtherUserDataActionTypes.UPDATE_OTHER_USER_DATA_ERROR,
        payload: error.response.data?.error || 'lost network'
      });
      dispatch({
        type: SnackbarActionsType.SET_ERROR,
        payload: error.response.data?.error || 'lost network'
      });
      throw new Error(error);
    }
  };

export const deleteUserData = () => (dispatch: Dispatch<UserDataAction>) => {
  dispatch({
    type: UserDataActionTypes.DELETE_USER_DATA
  });
};
export const fetchTopUsers =
  () => async (dispatch: Dispatch<UserDataAction>) => {
    try {
      dispatch({ type: UserDataActionTypes.FETCH_TOP_USERS_LOADING });
      const response = await axios().get(`${REACT_APP_API_URI}topUsers`, {
        headers: {
          'Accept-Language': localStorage.getItem('i18nextLng') || ''
        }
      });
      dispatch({
        type: UserDataActionTypes.FETCH_TOP_USERS_SUCCESS,
        payload: response.data
      });
    } catch (error: any) {
      dispatch({
        type: UserDataActionTypes.FETCH_TOP_USERS_ERROR,
        payload: 'An error occurred while loading user data'
      });
      throw new Error(error);
    }
  };

export const toggleModeratorRights =
  (otherUserId: string, notification: string) =>
  async (dispatch: Dispatch<SnackbarActions | OtherUserDataAction>) => {
    try {
      const response = await axios().patch(
        `${process.env.REACT_APP_API_URI}toggleModerator`,
        {
          otherUserId
        }
      );
      dispatch({
        type: OtherUserDataActionTypes.UPDATE_OTHER_USER_DATA_SUCCESS,
        payload: {
          role: response.data.role
        }
      });
      dispatch({
        type: SnackbarActionsType.SET_SUCCESS,
        payload: notification
      });
    } catch (error: any) {
      dispatch({
        type: OtherUserDataActionTypes.UPDATE_OTHER_USER_DATA_ERROR,
        payload: error.response.data?.error || 'lost network'
      });
      dispatch({
        type: SnackbarActionsType.SET_ERROR,
        payload: error.response.data?.error || 'lost network'
      });
      throw new Error(error);
    }
  };
