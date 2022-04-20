import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledFooter = styled(Box)`
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: white;
  width: 100%;
  height: 100px;
  padding: 30px 0 0 50px;
`;
