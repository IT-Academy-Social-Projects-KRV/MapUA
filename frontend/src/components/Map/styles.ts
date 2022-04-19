import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledMap = styled(Box)`
  background-color: ${({ theme }) => theme.palette.primary.main};
  width: 10wvh;
  height: 100vh;
`;
