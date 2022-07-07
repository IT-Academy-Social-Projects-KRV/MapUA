import { Card } from '@mui/material';
import { styled } from '@mui/material/styles';
import theme from 'theme';

export const StyledCardTopRated = styled(Card)(() => ({
  minWidth: 275,
  marginBottom: '10px',
  boxShadow: '6px 6px 2px 1px rgba(0, 0, 255, .2)',
  border: '1px solid',
  borderColor: theme.palette.primary.main
}));
