import React from 'react';
import { CardContent, Divider, List, Typography } from '@mui/material';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import CommentForm from './CommentForm';
import Comment from './Comment';

const CommentSection = () => {
  const { comments } = useTypedSelector(state => state.popupLocation);
  const { isLogged } = useTypedSelector(state => state.userAuth);
  return (
    <CardContent>
      <Typography
        variant="h6"
        color="text.secondary"
        sx={{
          textAlign: 'center',
          borderBottom: '1px solid grey'
        }}
      >
        Comments section
      </Typography>
      <List
        sx={{
          bgcolor: 'background.paper'
        }}
      >
        {isLogged && <CommentForm />}
        {isLogged && <Divider variant="inset" component="li" />}
        {comments.map(({ text, author, createdAt }) => (
          <Comment
            key={author + text + createdAt.type}
            createdAt={createdAt.type}
            text={text}
          />
        ))}
      </List>
    </CardContent>
  );
};

export default CommentSection;
