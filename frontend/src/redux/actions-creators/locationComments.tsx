import { Dispatch } from 'redux';
import {
  LocationCommentsActions,
  LocationCommentsActionTypes
} from 'redux/action-types/locationCommentsActionTypes';
import axios from 'services/axios';
import { Comment } from '../ts-types/locationComments';

export const sendComment =
  (comment: Comment<string>) =>
  async (dispatch: Dispatch<LocationCommentsActions>) => {
    try {
      const { data } = await axios.post('comments/create', { comment });
      if (data) {
        dispatch({
          type: LocationCommentsActionTypes.ADD_COMMENT,
          payload: data
        });
      }
    } catch (e: any) {
      throw new Error(e);
    }
  };

export const fetchComments =
  (locationId: string) =>
  async (dispatch: Dispatch<LocationCommentsActions>) => {
    try {
      const { data } = await axios.get(`comments/${locationId}`);
      dispatch({
        type: LocationCommentsActionTypes.FETCH_COMMENTS,
        payload: data
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
