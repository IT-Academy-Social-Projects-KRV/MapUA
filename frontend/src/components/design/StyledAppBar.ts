import { Toolbar } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledAppBar = styled(Toolbar)(({ theme }) => ({
  position: 'static',
  backgroundColor: theme.palette.primary.main,
  display: 'flex',
  justifyContent: 'space-around',
  color: 'white',
  zIndex: 1000
}));
