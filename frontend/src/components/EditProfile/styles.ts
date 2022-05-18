import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const EditProfileFormWrapper = styled(Box)`
  height: 86vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BorderForm = styled(EditProfileFormWrapper)`
  border: 2px solid black;
  height: 62vh;
  border-radius: 20px;
  width: 500px;
`;

export const WrapButtonAndText = styled('div')`
  display: flex;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
`;
