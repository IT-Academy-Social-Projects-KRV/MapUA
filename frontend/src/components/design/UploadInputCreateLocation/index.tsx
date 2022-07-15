import { Box, Button } from '@mui/material';
import React, { memo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { StyledHiddenInput } from '../StyledHiddenInput';

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
    <Box>
      <label htmlFor="contained-button-file">
        <StyledHiddenInput
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
        <Box>
          {ref.current?.files && ref.current?.files.length > 0
            ? `You selected ${locationImageName} photos`
            : ''}
        </Box>
      </label>
    </Box>
  );
};

export default memo(UploadInputCreateLocation);
