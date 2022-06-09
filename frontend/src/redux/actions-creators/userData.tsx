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
      console.log('response: ', response.data);
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

export const toogleUserSubscription =
  (otherUserId: string, userId: string, notification: string) =>
  async (dispatch: Dispatch<UserDataAction | SnackbarActions>) => {
    try {
      dispatch({ type: UserDataActionTypes.UPDATE_USER_DATA_LOADING });
      // const response = await axios().patch(
      //   `${process.env.REACT_APP_API_URI}toogleSubscribe`,
      //   userId, otherUserId
      // );
      const response = {
        _id: userId,
        displayName: 'Okeany',
        description: 'Descr  Okeany',
        imageUrl:
          'https://mapua-storage.s3.eu-central-1.amazonaws.com/files/1654365858151-1653380005599.jpg',
        subscribers: [],
        // subscriptions: [],
        subscriptions: [
          '628231392c5e18fa0824a19c',
          '6297b935a1c2a41812bb02ca',
          '6297b935a1c2a41812bb0222'
        ],
        favorite: [],
        visited: [],
        personalLocations: []
      };
      dispatch({
        type: UserDataActionTypes.UPDATE_USER_DATA_SUCCESS,
        payload: response
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

export const deleteUserData = () => (dispatch: Dispatch<UserDataAction>) => {
  dispatch({
    type: UserDataActionTypes.DELETE_USER_DATA
  });
};
