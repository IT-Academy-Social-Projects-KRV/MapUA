import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledMap = styled(Box)`
  background-color: ${({ theme }) => theme.palette.primary.main};
  width: 500px;
  height: 500px;
  :hover {
    background-color: ${({ theme }) => theme.palette.secondary.main};
  }
`;
