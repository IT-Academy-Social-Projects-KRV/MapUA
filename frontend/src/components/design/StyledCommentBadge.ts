import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';

export const StyledCommentBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: 31,
    top: 38,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px'
  }
}));
