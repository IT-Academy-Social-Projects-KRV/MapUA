import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const RegistrationFormWrapper = styled(Box)`
  height: 83vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BorderForm = styled(RegistrationFormWrapper)`
  border: 2px solid black;
  height: 62vh;
  border-radius: 20px;
  width: 500px;
`;

export const RegistrationError = styled(Box)`
  margin-bottom: 10px;
  margin-top: 10px;
  color: #ff0000;
`;

export const RegistrationSucces = styled(Box)`
  margin-bottom: 10px;
  color: #008000;
`;
export const EmailError = styled(Box)`
  color: #ff0000;
  margin: 10px 0;
`;
export const PasswordError = styled(Box)`
  color: #ff0000;
  margin: 10px 0;
`;

export const WrapButtonAndText = styled('div')`
  display: flex;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
`;
