import { Box, Button, FormControl, TextField } from '@mui/material';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import React, { useState } from 'react';

const CommentFrom = () => {
  const [commentText, setCommentText] = useState('');

  const onSendComment = () => {

  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <FormControl variant="standard">
        <TextField
          multiline
          rows={5}
          id="your comment"
          placeholder="Add your comment"
          variant="outlined"
          fullWidth
          onChange={e => setCommentText(e.target.value)}
          value={commentText}
        />

        <Button
          sx={{
            width: '25%',
            borderRadius: 10,
            alignSelf: 'center',
            mt: 2,
            color: 'black',
            mb: 3
          }}
          onClick={onSendComment}
          endIcon={<SendOutlinedIcon />}
        >
          Send
        </Button>
      </FormControl>
    </Box>
  );
};

export default CommentFrom;
