import React from 'react';
import { List } from '@mui/material';
import Comment from './Comment';
import { CommentType, AuthorInfoType } from '../../../../types';

interface Props {
  childComments: CommentType<AuthorInfoType>[];
  comments: CommentType<AuthorInfoType>[];
  index: number;
}

const CommentReplyList = ({ childComments, comments, index }: Props) => (
  <List>
    {childComments.map((childComment: CommentType<AuthorInfoType>) => (
      <Comment
        index={index + 1}
        comments={comments}
        key={childComment._id}
        authorId={childComment.author._id}
        createdAt={childComment.createdAt!}
        text={childComment.text}
        id={childComment._id}
        authorsImage={childComment.author.imageUrl}
        authorsName={childComment.author.displayName}
        locationId={childComment.locationId}
        likes={childComment.likes}
        dislikes={childComment.dislikes}
        parentComment={childComment.parentComment}
      />
    ))}
  </List>
);

export default CommentReplyList;
