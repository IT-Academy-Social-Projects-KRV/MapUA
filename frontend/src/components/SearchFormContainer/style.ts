import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledSearchFormContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  position: 'absolute',
  top: '10px',
  right: '20px',
  zIndex: '1500',
  width: '300px'
}));
