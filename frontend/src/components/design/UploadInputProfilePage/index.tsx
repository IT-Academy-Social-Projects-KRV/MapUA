import { Box, Button } from '@mui/material';
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { HiddenInput } from '../HiddenInput';

const UploadInputProfilePage = (props: any) => {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const { register, setUserImage } = props;
  return (
    <Box>
      <label htmlFor="contained-button-file">
        <HiddenInput
          id="contained-button-file"
          type="file"
          {...register('imageUrl')}
          ref={inputRef}
          onChange={(e: any) => {
            setUserImage(e.target?.files?.[0] || '');
          }}
        />
        <Button
          sx={{ m: '10px 0 10px 0' }}
          variant="contained"
          component="span"
        >
          {t('profile.profilePage.uploadPhoto')}
        </Button>
      </label>
    </Box>
  );
};

export default UploadInputProfilePage;
