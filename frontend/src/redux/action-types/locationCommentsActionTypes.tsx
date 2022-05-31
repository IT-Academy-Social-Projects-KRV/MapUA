import { AuthorInfo, Comment } from 'redux/ts-types/locationComments';

/* eslint-disable no-unused-vars */

export enum LocationCommentsActionTypes {
  ADD_COMMENT = 'ADD_COMMENT',
  FETCH_COMMENTS = 'FETCH_COMMENTS'
}

interface AddCommentAction {
  type: LocationCommentsActionTypes.ADD_COMMENT;
  payload: Comment<AuthorInfo>;
}

interface FetchCommentsAction {
  type: LocationCommentsActionTypes.FETCH_COMMENTS;
  payload: Comment<AuthorInfo>[];
}

export type LocationCommentsActions = AddCommentAction | FetchCommentsAction;
