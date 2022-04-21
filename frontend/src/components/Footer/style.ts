import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledFooter = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  width: '100%',
  height: '50px',
  paddingLeft: '20px'
}));
