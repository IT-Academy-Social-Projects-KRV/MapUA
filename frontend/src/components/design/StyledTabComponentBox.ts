import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledTabComponentBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'stretch',
  marginBottom: '10px',

  '& a': {
    marginLeft: '15px',
    textAlign: 'center'
  }
}));
