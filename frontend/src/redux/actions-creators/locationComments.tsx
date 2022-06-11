import { Dispatch } from 'redux';
import {
  LocationCommentsActions,
  LocationCommentsActionTypes
} from 'redux/action-types/locationCommentsActionTypes';
import axios from 'services/axios';
import { CommentType } from '../../../types';

export const sendComment =
  (comment: CommentType<string>) =>
  async (dispatch: Dispatch<LocationCommentsActions>) => {
    try {
      const { data } = await axios().post('comments/create', { comment });
      if (data) {
        dispatch({
          type: LocationCommentsActionTypes.ADD_COMMENT,
          payload: data
        });
      }
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
  (commentId: string) =>
  async (dispatch: Dispatch<LocationCommentsActions>) => {
    try {
      await axios().delete(`deletecomment/${commentId}`);
      dispatch({
        type: LocationCommentsActionTypes.DELETE_COMENTS,
        payload: commentId
      });
    } catch (error: any) {
      throw new Error(error);
    }
  };
