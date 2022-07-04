import { Card } from '@mui/material';
import { styled } from '@mui/material/styles';
import theme from 'theme';

export const StyledCardProfileTabs = styled(Card)(() => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  minWidth: 375,
  minHeight: 60,
  marginBottom: '1px',
  boxShadow: '6px 6px 2px 1px rgba(0, 0, 255, .2)',
  border: '1px solid',
  borderColor: theme.palette.primary.main,
  textDecoration: 'none'
}));
