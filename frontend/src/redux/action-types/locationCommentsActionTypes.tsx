import { AuthorInfoType, CommentType } from '../../../types';

/* eslint-disable no-unused-vars */

export enum LocationCommentsActionTypes {
  ADD_COMMENT = 'ADD_COMMENT',
  FETCH_COMMENTS = 'FETCH_COMMENTS'
}

interface AddCommentAction {
  type: LocationCommentsActionTypes.ADD_COMMENT;
  payload: CommentType<AuthorInfoType>;
}

interface FetchCommentsAction {
  type: LocationCommentsActionTypes.FETCH_COMMENTS;
  payload: CommentType<AuthorInfoType>[];
}

export type LocationCommentsActions = AddCommentAction | FetchCommentsAction;
