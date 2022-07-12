import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { v4 } from 'uuid';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import UploadedImageBox from './UploadedImageBox/UploadedImageBox';

type UploadedImagesListProps = {
  files: File[];
  setFiles: Function;
};

const UploadedImagesListWrapper = styled(Box)`
  overflow-x: auto;
  display: flex;
  flex-direction: row;
`;

const UploadedImagesList = ({ files, setFiles }: UploadedImagesListProps) => {
  const [isErrorVisible, setIsErrorVisible] = useState<boolean>(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (files.length > 1) {
      setIsErrorVisible(false);
    } else {
      setTimeout(() => setIsErrorVisible(false), 3000);
    }
  }, [files]);

  const handleRemoveFile = (file: File) => {
    setFiles((prev: File[]) => {
      if (prev.length > 1) {
        return [...prev.filter((f: File) => f.name !== file.name)];
      }
      setIsErrorVisible(true);
      return [...prev];
    });
  };

  return (
    <>
      <UploadedImagesListWrapper>
        {files.map(f => (
          <UploadedImageBox
            key={v4()}
            file={f}
            onRemoveFile={handleRemoveFile}
          />
        ))}
      </UploadedImagesListWrapper>
      <Typography color="red">
        {isErrorVisible ? t('pointPopUp.mustBeAtLeastOneImage') : ''}
      </Typography>
    </>
  );
};

export default UploadedImagesList;
