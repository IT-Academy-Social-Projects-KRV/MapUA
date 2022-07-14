import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

const UploadedImageWrapper = styled(Box)`
  display: flex;
  align-items: center;

  width: fit-content;
  margin: 8px;
  padding: 8px;
  flex-direction: column;
  position: relative;

  border: 1px solid lightgray;
`;

export default UploadedImageWrapper;
