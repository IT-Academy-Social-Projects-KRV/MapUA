import { IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledArrowLeftButton = styled(IconButton)(() => ({
  borderRadius: 0,
  paddingRight: '88%',
  position: 'sticky',
  top: 0,
  display: 'inline',
  zIndex: 10,
  backgroundColor: 'white',
  '&:hover': {
    backgroundColor: '#F5F5F5'
  }
}));
