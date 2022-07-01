import React from 'react';
import { Box, TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useForm,
  Controller,
  SubmitHandler,
  useFormState
} from 'react-hook-form';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { CommentSectionSchema } from 'utils/validation';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { AddCommentType } from '../../../../types';
import { StyledCommentFormButton } from '../../design/StyledCommentFormButton';

type CommentCheck = {
  commentText: string;
};

const CommentForm = () => {
  const { t } = useTranslation();

  const { sendComment } = useTypedDispatch();
  const { _id: userId } = useTypedSelector(state => state.userData.data);
  const { _id: locationId } = useTypedSelector(
    state => state.popupLocation.data
  );

  const { handleSubmit, control, reset } = useForm<CommentCheck>({
    resolver: yupResolver(CommentSectionSchema)
  });

  const { errors } = useFormState({
    control
  });

  const onSendComment: SubmitHandler<CommentCheck> = ({ commentText }) => {
    const commentBody: AddCommentType<string> = {
      author: userId,
      locationId: locationId!,
      text: commentText
      // likes: [],
      // dislikes: []
    };

    if (commentText) {
      sendComment(commentBody);
      reset();
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSendComment)}>
      <Controller
        name="commentText"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            multiline
            rows={5}
            placeholder={t('bigPopup.commentSection.commentForm.addComment')}
            variant="outlined"
            error={!!errors.commentText?.message}
            helperText={t(
              !errors.commentText ? '' : String(errors.commentText.message)
            )}
          />
        )}
      />

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <StyledCommentFormButton type="submit" endIcon={<SendOutlinedIcon />}>
          {t('bigPopup.commentSection.commentForm.send')}
        </StyledCommentFormButton>
      </Box>
    </Box>
  );
};

export default CommentForm;
