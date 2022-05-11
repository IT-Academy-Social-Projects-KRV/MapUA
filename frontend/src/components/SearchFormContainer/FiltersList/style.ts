import { List } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledList = styled(List)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  maxHeight: '500px'
}));
