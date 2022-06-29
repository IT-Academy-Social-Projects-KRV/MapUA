import { Dispatch } from 'redux';
import axios from 'services/axios';
import {
  LocationCommentsActions,
  LocationCommentsActionTypes
} from 'redux/action-types/locationCommentsActionTypes';
import {
  SnackbarActions,
  SnackbarActionsType
} from '../action-types/snackbarActionTypes';

import { AddCommentType } from '../../../types';

export const sendComment =
  (comment: AddCommentType<string>) =>
  async (dispatch: Dispatch<LocationCommentsActions | SnackbarActions>) => {
    try {
      const { data } = await axios().post('comments/create', { comment });

      dispatch({
        type: LocationCommentsActionTypes.ADD_COMMENT,
        payload: data.comment
      });
      dispatch({
        type: SnackbarActionsType.SET_SUCCESS,
        payload: data.message
      });
    } catch (error: any) {
      throw new Error(error);
    }
  };

export const fetchComments =
  (locationId: string) =>
  async (dispatch: Dispatch<LocationCommentsActions>) => {
    try {
      const { data } = await axios().get(`comments/${locationId}`);

      dispatch({
        type: LocationCommentsActionTypes.FETCH_COMMENTS,
        payload: data
      });
    } catch (error: any) {
      throw new Error(error);
    }
  };

export const deleteComment =
  (id: string) =>
  async (dispatch: Dispatch<LocationCommentsActions | SnackbarActions>) => {
    try {
      const { data } = await axios().delete(`comments/${id}`);
      dispatch({
        type: LocationCommentsActionTypes.DELETE_COMMENT,
        payload: data.comment
      });
      dispatch({
        type: SnackbarActionsType.SET_SUCCESS,
        payload: data.message
      });
    } catch (error: any) {
      throw new Error(error);
    }
  };

export const editComment =
  (comment: {}, id: string) =>
  async (dispatch: Dispatch<LocationCommentsActions | SnackbarActions>) => {
    try {
      const { data } = await axios().patch(`comments/${id}`, {
        comment
      });
      dispatch({
        type: LocationCommentsActionTypes.EDIT_COMMENT,
        payload: data.comment
      });
      dispatch({
        type: SnackbarActionsType.SET_SUCCESS,
        payload: data.message
      });
    } catch (error: any) {
      throw new Error(error);
    }
  };
