import { OutlinedInput } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledSearchForm = styled(OutlinedInput)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  height: '64px',
  width: '300px'
}));
