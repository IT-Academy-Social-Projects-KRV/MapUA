import { Tooltip } from 'react-leaflet';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const StyledTooltip = styled(Tooltip)({
  borderRadius: '20px'
});

export const StyledBox = styled(Box)({
  display: 'flex',
  alignItems: 'center'
});

export const StyledMediaBox = styled(Box)({
  width: '160px',
  height: '106px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});
