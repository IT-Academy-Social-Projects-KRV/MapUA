import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledAddLocationButton = styled(Button)`
  z-index: 1000;
  position: absolute;
  top: 15px;
  left: 50px;
`;

export const StyledCloseAddingModeLocationButton = styled(Button)`
  z-index: 1000;
  position: absolute;
  top: 15px;
  left: 230px;
  background-color: yellow;
  height: 35px;
  min-width: 35px;
  color: black;
  &:hover {
    background-color: yellow;
  }
`;
