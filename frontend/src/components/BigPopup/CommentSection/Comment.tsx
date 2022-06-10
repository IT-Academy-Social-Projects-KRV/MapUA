import React from 'react';
import {
  Avatar,
  Box,
  IconButton,
  ListItem,
  ListItemAvatar,
  Typography
} from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DeleteIcon from '@mui/icons-material/Delete';
import ReportIcon from '@mui/icons-material/Report';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { StyledCommentBox } from '../../design/StyledCommentBox';
import { useTypedSelector } from '../../../redux/hooks/useTypedSelector';

interface Props {
  authorId: string | undefined;
  text: string;
  createdAt: Date;
  authorsName: string;
  authorsImage: string;
}

const Comment = ({
  authorId,
  text,
  createdAt,
  authorsName,
  authorsImage
}: Props) => {
  const date = new Date(createdAt);
  const { _id: userId } = useTypedSelector(state => state.userData.data);
  const { role } = useTypedSelector(state => state.isUserAuthorized.data);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ListItem alignItems="flex-start" sx={{ display: 'block', pl: 0 }}>
      <ListItemAvatar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex' }}>
          <Avatar
            sx={{ mr: 2 }}
            alt="Comment's author avatar"
            src={authorsImage}
          />
          <Typography component="span" variant="h6" color="text.primary">
            {authorsName}
          </Typography>
        </Box>
        <Box>
          <IconButton
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <MoreHorizIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={() => {
              handleClose();
            }}
            MenuListProps={{
              'aria-labelledby': 'basic-button'
            }}
          >
            <MenuItem onClick={handleClose}>
              <IconButton size="small" onClick={() => null}>
                <ReportIcon />
                Report
              </IconButton>
            </MenuItem>
            {((authorId && authorId === userId) ||
              role === 'moderator' ||
              role === 'admin') && (
              <MenuItem onClick={handleClose}>
                <IconButton size="small" onClick={() => null}>
                  <DeleteIcon />
                  Delete
                </IconButton>
              </MenuItem>
            )}
          </Menu>
        </Box>
      </ListItemAvatar>
      <Typography variant="subtitle1">{text}</Typography>
      <StyledCommentBox>
        <Typography variant="subtitle2">{date.toLocaleDateString()}</Typography>
        <IconButton>
          <ThumbUpOutlinedIcon fontSize="small" />
        </IconButton>
        <IconButton>
          <ThumbDownAltOutlinedIcon fontSize="small" />
        </IconButton>
      </StyledCommentBox>
    </ListItem>
  );
};
export default Comment;
