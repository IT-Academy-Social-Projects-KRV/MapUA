import {
  AddCommentActionCreatorType,
  AuthorInfoType,
  CommentType
} from '../../../types';

/* eslint-disable no-unused-vars */

export enum LocationCommentsActionTypes {
  ADD_COMMENT = 'ADD_COMMENT',
  FETCH_COMMENTS = 'FETCH_COMMENTS',
  DELETE_COMMENT = 'DELETE_COMMENT',
  EDIT_COMMENT = 'EDIT_COMMENT',
  EDIT_COMMENT_RATING = 'EDIT_COMMENT_RATING'
}

interface AddCommentAction {
  type: LocationCommentsActionTypes.ADD_COMMENT;
  payload: AddCommentActionCreatorType;
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

interface EditCommentRatingAction {
  type: LocationCommentsActionTypes.EDIT_COMMENT_RATING;
  payload: CommentType<AuthorInfoType>;
}

export type LocationCommentsActions =
  | AddCommentAction
  | FetchCommentsAction
  | EditCommentAction
  | DeleteCommentsAction
  | EditCommentRatingAction;
