import React, { MouseEventHandler, ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, TextField, Stack, Button } from '@mui/material';
import { Controller, UseControllerProps, FieldErrors } from 'react-hook-form';
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';

interface Props extends UseControllerProps {
  authorsName: string;
  errors: FieldErrors;
  control: any;
  onSubmitReplyComment: Function;
  handleSubmit: Function;
  closeReplyComment: MouseEventHandler<HTMLButtonElement>;
}

const ReplyCommentField = ({
  errors,
  onSubmitReplyComment,
  handleSubmit,
  control,
  authorsName,
  closeReplyComment
}: Props) => {
  const [replyCommentText, setReplyCommentText] = useState(authorsName);
  const { t } = useTranslation();

  const handleReplyCommentText = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: any
  ) => {
    field.onChange(e);
    setReplyCommentText(e.target.value);
  };

  return (
    <Box mt={2} component="form" onSubmit={handleSubmit(onSubmitReplyComment)}>
      <Controller
        name="commentText"
        control={control}
        render={({ field }) => (
          <TextField
            fullWidth
            multiline
            rows={3}
            margin="dense"
            onChange={e => handleReplyCommentText(e, field)}
            onBlur={field.onBlur}
            defaultValue={`${authorsName},\n`}
            error={!!errors.commentText?.message}
            helperText={t(
              !errors.commentText ? '' : String(errors.commentText.message)
            )}
          />
        )}
      />
      <Stack
        mt={3}
        mb={6}
        direction="row"
        justifyContent="space-evenly"
        alignItems="stretch"
      >
        {!replyCommentText ||
        replyCommentText.length < 5 ||
        replyCommentText.length > 50 ? (
          <Button
            variant="outlined"
            size="small"
            disabled
            startIcon={<SendIcon />}
          >
            {t('bigPopup.commentSection.commentForm.reply')}
          </Button>
        ) : (
          <Button
            size="small"
            variant="outlined"
            type="submit"
            startIcon={<SendIcon />}
          >
            {t('bigPopup.commentSection.commentForm.reply')}
          </Button>
        )}

        <Button
          size="small"
          variant="outlined"
          onClick={closeReplyComment}
          startIcon={<CancelIcon />}
        >
          {t('profile.profilePage.cancel')}
        </Button>
      </Stack>
    </Box>
  );
};

export default ReplyCommentField;
