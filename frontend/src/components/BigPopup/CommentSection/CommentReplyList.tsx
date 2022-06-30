import React from 'react';
import Comment from './Comment';
import { CommentType, AuthorInfoType } from '../../../../types';

interface Props {
  childComments: CommentType<AuthorInfoType>[];
  comments: CommentType<AuthorInfoType>[];
  index: number;
  parentAuthorName: string;
  parentAuthorUrl: string;
}

const CommentReplyList = ({
  childComments,
  comments,
  index,
  parentAuthorName,
  parentAuthorUrl
}: Props) => (
  <>
    {childComments.map((childComment: CommentType<AuthorInfoType>) => (
      <Comment
        parentAuthorName={parentAuthorName}
        parentAuthorUrl={parentAuthorUrl}
        deleted={childComment.deleted}
        index={index + 1}
        comments={comments}
        key={childComment._id}
        authorId={childComment.author._id}
        authorRole={childComment.author.role}
        authorsImage={childComment.author.imageUrl}
        authorsName={childComment.author.displayName}
        createdAt={childComment.createdAt!}
        text={childComment.text}
        id={childComment._id}
        locationId={childComment.locationId}
        likes={childComment.likes}
        dislikes={childComment.dislikes}
        parentComment={childComment.parentComment}
      />
    ))}
  </>
);

export default CommentReplyList;
