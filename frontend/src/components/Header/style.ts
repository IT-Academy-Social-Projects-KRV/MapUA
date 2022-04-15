import { AppBar, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledAppBar = styled(AppBar)`
  position: static;
  background-color: ${({ theme }) => theme.palette.primary.main};
  padding: 20px 0 20px 0;
`;

export const StyledStack = styled(Stack)`
  justify-content: space-around;
  spacing: 40;
`;
