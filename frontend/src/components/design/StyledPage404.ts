import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import image404 from '../../static/404-Page.jpg';

export const StyledPage404 = styled(Box)(({ theme }) => ({
  background: `center url(${image404})`,
  width: '100%',
  height: '100%',
  backgroundSize: 'cover',
  textAlign: 'center',
  color: theme.palette.primary.main
}));
