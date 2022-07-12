import React from 'react';
import { Box } from '@mui/material';
import { v4 } from 'uuid';
import { styled } from '@mui/material/styles';
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
  const handleRemoveFile = (file: File) => {
    setFiles((prev: File[]) => [
      ...prev.filter((f: File) => f.name !== file.name)
    ]);
  };
  return (
    <UploadedImagesListWrapper>
      {files.map(f => (
        <UploadedImageBox key={v4()} file={f} onRemoveFile={handleRemoveFile} />
      ))}
    </UploadedImagesListWrapper>
  );
};

export default UploadedImagesList;
