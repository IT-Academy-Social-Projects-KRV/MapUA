import React, { FC, MouseEventHandler } from 'react';
import { Box, Button, Input, TextField } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { useTranslation } from 'react-i18next';
import {
  CancelButton,
  ProfileAvatar,
  SaveBox,
  SaveButton,
  UploadBox
} from '../styles';
import { UserForm } from '../../../../types';
import UploadInputProfilePage from 'components/design/UploadInputProfilePage';

type Props = {
  onSubmit: SubmitHandler<UserForm>;
  displayName: string;
  description: string;
  closeEditData: MouseEventHandler<HTMLButtonElement>;
  setUserImage: Function;
  userImage: any;
};

export const SaveGroup: FC<Props> = ({
  onSubmit,
  displayName,
  description,
  closeEditData,
  setUserImage,
  userImage
}) => {
  const { t } = useTranslation();
  const { imageUrl: userAvatar } = useTypedSelector(
    state => state.userData.data
  );
  const { handleSubmit, control, register } = useForm<UserForm>({
    mode: 'onBlur',
    defaultValues: { displayName, description }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <UploadBox>
          <ProfileAvatar
            aria-label="avatar"
            src={(userImage && URL.createObjectURL(userImage)) || userAvatar}
          />
          <UploadBox>
            <UploadInputProfilePage
              setUserImage={setUserImage}
              register={register}
            />
          </UploadBox>
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
