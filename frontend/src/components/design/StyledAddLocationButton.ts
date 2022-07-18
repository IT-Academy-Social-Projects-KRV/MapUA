import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledAddLocationButton = styled(Button)`
  z-index: 1000;
`;

export const StyledCloseAddingModeLocationButton = styled(Button)`
  z-index: 1000;
  margin-left: 8px;
  background-color: yellow;
  min-width: 35px;
  color: black;
  &:hover {
    background-color: yellow;
  }
`;
