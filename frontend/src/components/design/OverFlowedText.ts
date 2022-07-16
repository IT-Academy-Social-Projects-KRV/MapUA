import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

const OverFlowedText = styled(Typography)`
  text-overflow: ellipsis;
  width: 150px;
  white-space: nowrap;
  overflow: hidden;
`;
export default OverFlowedText;
