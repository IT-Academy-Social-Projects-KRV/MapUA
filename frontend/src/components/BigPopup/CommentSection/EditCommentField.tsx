import React, { MouseEventHandler, ChangeEvent, useState, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, TextField, Stack, Button } from '@mui/material';
import { Controller, UseControllerProps, FieldErrors } from 'react-hook-form';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';

interface Props extends UseControllerProps {
  text: string;
  errors: FieldErrors;
  control: any;
  onSubmitEditComment: Function;
  handleSubmit: Function;
  closeEditComment: MouseEventHandler<HTMLButtonElement>;
}

const EditCommentField = ({
  errors,
  onSubmitEditComment,
  handleSubmit,
  control,
  text,
  closeEditComment
}: Props) => {
  const [newCommentText, setNewCommentText] = useState(text);
  const { t } = useTranslation();

  const handleChangeCommentText = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: any
  ) => {
    field.onChange(e);
    setNewCommentText(e.target.value);
  };

  return (
    <Box mt={2} component="form" onSubmit={handleSubmit(onSubmitEditComment)}>
      <Controller
        name="commentText"
        control={control}
        render={({ field }) => (
          <TextField
            fullWidth
            multiline
            rows={5}
            variant="outlined"
            onChange={e => handleChangeCommentText(e, field)}
            onBlur={field.onBlur}
            defaultValue={text}
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
        {newCommentText === text ||
        !newCommentText ||
        newCommentText.length < 5 ||
        newCommentText.length > 500 ? (
          <Button disabled variant="outlined" startIcon={<CheckIcon />}>
            {t('profile.profilePage.save')}
          </Button>
        ) : (
          <Button variant="outlined" type="submit" startIcon={<CheckIcon />}>
            {t('profile.profilePage.save')}
          </Button>
        )}

        <Button
          variant="outlined"
          onClick={closeEditComment}
          startIcon={<CancelIcon />}
        >
          {t('profile.profilePage.cancel')}
        </Button>
      </Stack>
    </Box>
  );
};

export default memo(EditCommentField);
