import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledFooter = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  position: 'fixed',
  display: 'flex',
  alignItems: 'center',
  bottom: 0,
  left: 0,
  right: 0,
  width: '100%',
  height: '50px',
  paddingLeft: '20px',
  zIndex: 1000
}));
