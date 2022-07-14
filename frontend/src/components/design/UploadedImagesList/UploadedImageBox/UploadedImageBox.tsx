import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import UploadedImageWrapper from './UploadedImageWrapper';
import UploadedImage from './UploadedImage';
import RemoveUploadedImageButton from './RemoveUploadedImageButton';
import OverFlowedText from '../../OverFlowedText';

type uploadedImageBoxProps = {
  file: File;
  onRemoveFile?: Function;
};

const UploadedImageBox = ({
  file,
  onRemoveFile = () => {}
}: uploadedImageBoxProps) => (
  <UploadedImageWrapper>
    <UploadedImage src={URL.createObjectURL(file)} alt="uploaded" />

    <br />
    <OverFlowedText>{file.name}</OverFlowedText>

    <RemoveUploadedImageButton type="button" onClick={() => onRemoveFile(file)}>
      <CloseIcon sx={{ color: 'white' }} />
    </RemoveUploadedImageButton>
  </UploadedImageWrapper>
);

UploadedImageBox.defaultProps = {
  onRemoveFile: () => {}
};

export default UploadedImageBox;
