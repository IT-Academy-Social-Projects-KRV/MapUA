import { Box, Button } from '@mui/material';
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { HiddenInput } from '../HiddenInput';

type UploadInputCreateLocationProps = {
  handleFilesChange: Function;
  setlocationImageName: Function;
  locationImageName: string;
};

const UploadInputCreateLocation = (props: UploadInputCreateLocationProps) => {
  const { t } = useTranslation();
  const ref = useRef<null | HTMLInputElement>(null);
  const { handleFilesChange, setlocationImageName, locationImageName } = props;
  return (
    <Box sx={{ mt: '20px' }}>
      <label htmlFor="contained-button-file">
        <HiddenInput
          id="contained-button-file"
          type="file"
          onChange={e => {
            handleFilesChange(e);
            setlocationImageName(
              (ref.current?.files && ref.current?.files[0].name) || ''
            );
          }}
          ref={ref}
          multiple
        />
        <Button sx={{ mr: '10px ' }} variant="contained" component="span">
          {t('profile.profilePage.uploadPhoto')}
        </Button>
        <span>{locationImageName}</span>
      </label>
    </Box>
  );
};

export default UploadInputCreateLocation;
