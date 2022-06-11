import React, { MouseEventHandler } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, TextField, Stack, Divider, Button } from '@mui/material';
import { Controller, UseControllerProps, FieldErrors } from 'react-hook-form';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';

interface Props extends UseControllerProps {
  text: string;
  errors: FieldErrors;
  control: any;
  onSubmit: Function;
  handleSubmit: Function;
  closeEditData: MouseEventHandler<HTMLButtonElement>;
}

const EditCommentField = ({
  errors,
  onSubmit,
  handleSubmit,
  control,
  text,
  closeEditData
}: Props) => {
  const { t } = useTranslation();
  return (
    <Box mt={2} component="form" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="commentText"
        control={control}
        render={({ field }) => (
          <TextField
            fullWidth
            multiline
            rows={5}
            variant="outlined"
            onChange={e => field.onChange(e)}
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
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Button variant="outlined" type="submit" startIcon={<CheckIcon />}>
          {t('profile.profilePage.save')}
        </Button>
        <Button
          variant="outlined"
          onClick={closeEditData}
          startIcon={<CancelIcon />}
        >
          {t('profile.profilePage.cancel')}
        </Button>
      </Stack>
    </Box>
  );
};

export default EditCommentField;
