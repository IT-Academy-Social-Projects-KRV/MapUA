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
              (ref.current?.files && ref.current?.files.length) || ''
            );
          }}
          ref={ref}
          multiple
        />
        <Button variant="contained" component="span">
          {t('profile.profilePage.uploadPhoto')}
        </Button>
        <Box sx={{ mt: '10px' }}>
          {ref.current?.files && ref.current?.files.length > 0
            ? `You selected ${locationImageName} photos`
            : ''}
        </Box>
      </label>
    </Box>
  );
};

export default UploadInputCreateLocation;
