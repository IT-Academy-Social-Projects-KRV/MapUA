import { AppBar, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: 'static',
  backgroundColor: theme.palette.primary.main,
  padding: '20px 0 20px 0'
}));

export const StyledStack = styled(Stack)({
  justifyContent: 'space-around',
  spacing: 40,
  zIndex: 1500
});
