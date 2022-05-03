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
  height: 72vh;
  border-radius: 20px;
  width: 500px;
`;

export const StyledSpan = styled(Box)`
  margin-top: 20px;
  text-align: end;
`;

export const StyledSpanOr = styled(Box)`
  display: block;
`;

export const StyledSpanEnd = styled(StyledSpan)`
  margin-top: 15px;
`;

export const WrapH1 = styled('div')`
  text-align: center;
`;

export const WrapButtonAndText = styled('div')`
  display: flex;
  margin-top: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
