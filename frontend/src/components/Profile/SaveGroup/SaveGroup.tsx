import React, { FC, MouseEventHandler } from 'react';
import { Box, Button, Input, TextField } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { UserForm } from 'redux/ts-types/user';
import { useTranslation } from 'react-i18next';
import {
  CancelButton,
  ProfileAvatar,
  SaveBox,
  SaveButton,
  UploadBox
} from '../styles';

type Props = {
  onSubmit: SubmitHandler<UserForm>;
  displayName: string;
  description: string;
  closeEditData: MouseEventHandler<HTMLButtonElement>;
  setUserImage: Function;
};

export const SaveGroup: FC<Props> = ({
  onSubmit,
  displayName,
  description,
  closeEditData,
  setUserImage
}) => {
  const { t } = useTranslation();
  const userAvatar = useTypedSelector(state => state.user);
  const { handleSubmit, control, register } = useForm<UserForm>({
    mode: 'onBlur',
    defaultValues: { displayName, description }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <UploadBox>
          <ProfileAvatar
            sx={{ ml: '11.5vh' }}
            aria-label="avatar"
            src={userAvatar.data.imageUrl}
          />
          <Box sx={{ m: '2vh 0 2vh 14vh' }}>
            {t('profile.profilePage.uploadPhoto')}
          </Box>
          <Box>
            <Button>
              <Input
                type="file"
                {...register('imageUrl')}
                onChange={(e: any) => setUserImage(e.target?.files?.[0])}
              />
            </Button>
          </Box>
        </UploadBox>
        <Controller
          control={control}
          name="displayName"
          render={({ field }) => (
            <TextField
              placeholder={t('profile.profilePage.enterName')}
              label={t('profile.profilePage.name')}
              fullWidth
              onChange={field.onChange}
              onBlur={field.onBlur}
              defaultValue={field.value}
              type="text"
            />
          )}
        />
        <SaveBox>
          <SaveButton size="large" variant="contained" type="submit">
            {t('profile.profilePage.save')}
          </SaveButton>
          <CancelButton
            size="large"
            variant="contained"
            onClick={closeEditData}
          >
            {t('profile.profilePage.cancel')}
          </CancelButton>
        </SaveBox>
      </Box>
    </form>
  );
};
