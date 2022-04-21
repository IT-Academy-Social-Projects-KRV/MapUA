import { OutlinedInput } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledSearchForm = styled(OutlinedInput)(({ theme }) => ({
  position: 'absolute',
  backgroundColor: theme.palette.background.paper,
  top: '10px',
  right: '20px',
  zIndex: '1500'
}));
