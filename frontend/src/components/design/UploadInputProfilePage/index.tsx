import { Box, Button } from '@mui/material';
import React, { memo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { resizeSingleImageFn } from 'utils/imgResizer';
import { StyledHiddenInput } from '../StyledHiddenInput';

type UploadInputProfilePageProps = {
  register: Function;
  setUserImage: Function;
};

const UploadInputProfilePage = (props: UploadInputProfilePageProps) => {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const { register, setUserImage } = props;
  return (
    <Box>
      <label htmlFor="contained-button-file">
        <StyledHiddenInput
          id="contained-button-file"
          type="file"
          {...register('imageUrl')}
          ref={inputRef}
          onChange={async (e: any) => {
            const file = e.target?.files?.[0];
            const image = await resizeSingleImageFn(file, 300, 150);
            setUserImage(image);
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

export default memo(UploadInputProfilePage);
