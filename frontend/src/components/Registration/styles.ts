import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const RegistrationFormWrapper = styled(Box)`
  height: 82vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BorderForm = styled(RegistrationFormWrapper)`
  border: 2px solid black;
  padding: 50px;
  height: 56vh;
  border-radius: 20px;
`;
