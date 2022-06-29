import { AuthorInfoType, CommentType } from '../../../types';

/* eslint-disable no-unused-vars */

export enum LocationCommentsActionTypes {
  ADD_COMMENT = 'ADD_COMMENT',
  FETCH_COMMENTS = 'FETCH_COMMENTS',
  DELETE_COMMENT = 'DELETE_COMMENT',
  EDIT_COMMENT = 'EDIT_COMMENT'
}

interface AddCommentAction {
  type: LocationCommentsActionTypes.ADD_COMMENT;
  payload: CommentType<AuthorInfoType>;
}

interface FetchCommentsAction {
  type: LocationCommentsActionTypes.FETCH_COMMENTS;
  payload: CommentType<AuthorInfoType>[];
}

interface EditCommentAction {
  type: LocationCommentsActionTypes.EDIT_COMMENT;
  payload: CommentType<AuthorInfoType>;
}

interface DeleteCommentsAction {
  type: LocationCommentsActionTypes.DELETE_COMMENT;
  payload: CommentType<AuthorInfoType>;
}

export type LocationCommentsActions =
  | AddCommentAction
  | FetchCommentsAction
  | EditCommentAction
  | DeleteCommentsAction;
