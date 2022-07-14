import { styled } from '@mui/material/styles';

const RemoveUploadedImageButton = styled('button')`
  position: absolute;
  right: -16px;
  top: 0;

  width: 32px;
  height: 32px;

  background-color: red;
  padding: 0;
  margin: 0;
  border-radius: 50%;
  border: none;

  z-index: 1000;
  &:hover {
    background-color: rgb(255, 100, 100);
  }
`;

export default RemoveUploadedImageButton;
