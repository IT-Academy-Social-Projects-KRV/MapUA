import { OutlinedInput } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledSearchForm = styled(OutlinedInput)`
  position: absolute;
  background-color: ${({ theme }) => theme.palette.background.paper};
  top: 10px;
  right: 20px;
  z-index: 1500;
`;
