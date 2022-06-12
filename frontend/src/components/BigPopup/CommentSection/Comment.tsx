import React, { useState, MouseEvent } from 'react';
import {
  Avatar,
  Box,
  IconButton,
  ListItem,
  ListItemAvatar,
  Typography,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { useTranslation } from 'react-i18next';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { getPath } from 'utils/createPath';
import { useForm, SubmitHandler, useFormState } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DeleteIcon from '@mui/icons-material/Delete';
import ReportIcon from '@mui/icons-material/Report';
import EditIcon from '@mui/icons-material/Edit';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { CommentSectionSchema } from 'utils/validation';
import EditCommentField from './EditCommentField';
import { StyledCommentBox } from '../../design/StyledCommentBox';

interface Props {
  authorId: string | undefined;
  text: string;
  createdAt: Date;
  authorsName: string;
  authorsImage: string;
  id: string | undefined;
  locationId: string;
  likes: string[];
  dislikes: string[];
}

type CommentCheck = {
  commentText: string;
};

const Comment = ({
  authorId,
  text,
  createdAt,
  authorsName,
  authorsImage,
  id,
  locationId,
  likes,
  dislikes
}: Props) => {
  const date = new Date(createdAt);
  const { t } = useTranslation();
  const [showEditComment, setShowEditComment] = useState(false);
  const [disabledEditButton, setDisabledEditButton] = useState(false);
  const { _id: userId } = useTypedSelector(state => state.userData.data);
  const { role } = useTypedSelector(state => state.isUserAuthorized.data);
  const { editComment } = useTypedDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { handleSubmit, control } = useForm<CommentCheck>({
    mode: 'onBlur',
    resolver: yupResolver(CommentSectionSchema)
  });

  const { errors } = useFormState({
    control
  });

  const handleEditComment = () => {
    setShowEditComment(true);
    setDisabledEditButton(true);
    handleClose();
  };

  const closeEditData = () => {
    setShowEditComment(false);
    setDisabledEditButton(false);
  };

  const onSubmit: SubmitHandler<CommentCheck> = data => {
    const comment = {
      text: data.commentText,
      author: authorId,
      locationId,
      likes,
      dislikes
    };

    editComment(comment, id);

    closeEditData();
  };

  return (
    <ListItem alignItems="flex-start" sx={{ display: 'block', pl: 0 }}>
      <ListItemAvatar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex' }}>
          <Link to={getPath(userId, authorId)}>
            <Avatar
              sx={{ mr: 2 }}
              alt="Comment's author avatar"
              src={authorsImage}
            />
          </Link>
          <Link to={getPath(userId, authorId)}>
            <Typography component="span" variant="h6" color="text.primary">
              {authorsName}
            </Typography>
          </Link>
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
              <ListItemIcon onClick={() => null}>
                <ReportIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Report</ListItemText>
            </MenuItem>
            {((authorId && authorId === userId) ||
              role === 'moderator' ||
              role === 'admin') && (
              <Box>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon onClick={() => null}>
                    <DeleteIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Delete</ListItemText>
                </MenuItem>
                <MenuItem
                  disabled={disabledEditButton}
                  onClick={handleEditComment}
                >
                  <ListItemIcon>
                    <EditIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>
                    {t('profile.profilePage.editComment')}
                  </ListItemText>
                </MenuItem>
              </Box>
            )}
          </Menu>
        </Box>
      </ListItemAvatar>
      {showEditComment ? (
        <EditCommentField
          name="newCommentText"
          errors={errors}
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          control={control}
          text={text}
          closeEditData={closeEditData}
        />
      ) : (
        <Typography variant="subtitle1">{text}</Typography>
      )}
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
