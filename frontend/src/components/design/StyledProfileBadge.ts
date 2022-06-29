import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';

export const StyledProfileBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: 74,
    top: 147,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px'
  }
}));
