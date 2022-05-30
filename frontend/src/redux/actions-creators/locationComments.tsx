import axios from 'axios';
import { Dispatch } from 'redux';
import {
  LocationCommentsActions,
  LocationCommentsActionTypes
} from 'redux/action-types/locationCommentsActionTypes';
import { Comment } from '../ts-types/locationComments';

const { REACT_APP_API_URI } = process.env;

export const sendComment =
  (comment: Comment<string>) =>
  async (dispatch: Dispatch<LocationCommentsActions>) => {
    try {
      const { data } = await axios.post(
        `${REACT_APP_API_URI}comments/create`,
        {
          comment
        },
        {
          headers: {
            'Accept-Language': localStorage.getItem('i18nextLng') || ''
          }
        }
      );
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
      const { data } = await axios.get(
        `${REACT_APP_API_URI}comments/${locationId}`,
        {
          headers: {
            'Accept-Language': localStorage.getItem('i18nextLng') || ''
          }
        }
      );
      dispatch({
        type: LocationCommentsActionTypes.FETCH_COMMENTS,
        payload: data
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
