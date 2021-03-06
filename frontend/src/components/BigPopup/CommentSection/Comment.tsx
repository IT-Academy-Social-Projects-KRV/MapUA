import React, {
  useState,
  MouseEvent,
  useEffect,
  useCallback,
  useMemo,
  memo
} from 'react';
import {
  Avatar,
  Box,
  IconButton,
  Typography,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import AlertDialog from 'components/AlertDialog';
import { StyledCommentBadge } from 'components/design/StyledCommentBadge';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ReportIcon from '@mui/icons-material/Report';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Link } from 'react-router-dom';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { useTranslation } from 'react-i18next';
import { selectUserId } from 'redux/memoizedSelectors/userDataSelectors';
import { selectUserRole } from 'redux/memoizedSelectors/isUserAuthorizedSelectors';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { getPath } from 'utils/createPath';
import { useForm, SubmitHandler, useFormState } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CommentSectionSchema } from 'utils/validation';
import { CommentType, AuthorInfoType } from '../../../../types';
import EditCommentField from './EditCommentField';
import ReplyCommentField from './ReplyCommentField';
import ChangeComment from './ChangeComment';
import RatingCommentSection from './RatingCommentSection';
import CommentReplyList from './CommentReplyList';

interface Props {
  authorId: string;
  text: string;
  createdAt: Date;
  authorsName: string;
  authorsImage: string;
  authorRole: string;
  id: string;
  locationId: string;
  likes: string[];
  dislikes: string[];
  parentComment: string | undefined;
  comments: CommentType<AuthorInfoType>[];
  index: number;
  deleted: boolean;
  parentAuthorUrl?: string;
  parentAuthorName?: string;
  hasReplies: boolean;
  topCommentsOnPageIndex: number;
}

type ChangeCommentCheck = {
  commentText: string;
};

const Comment = ({
  authorId,
  text,
  createdAt,
  authorsName,
  authorsImage,
  authorRole,
  id,
  locationId,
  likes,
  dislikes,
  parentComment,
  comments,
  index,
  hasReplies,
  topCommentsOnPageIndex,
  deleted,
  parentAuthorUrl,
  parentAuthorName
}: Props) => {
  const date = new Date(createdAt);
  const { t } = useTranslation();
  const [showEditComment, setShowEditComment] = useState(false);
  const [showReplyComment, setShowReplyComment] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const [disabledPressedButton, setDisabledPressedButton] = useState(false);

  const userId = useTypedSelector(selectUserId);
  const role = useTypedSelector(selectUserRole);

  const { sendComment, fetchComments, editComment, deleteComment } =
    useTypedDispatch();

  const [openDialog, setOpen] = useState(false);

  const handleCloseDialog = useCallback(() => setOpen(false), []);
  const handleOpenDialog = useCallback(() => setOpen(true), []);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const childComments = useMemo(
    () => comments.filter(c => c.parentComment === id),
    [comments]
  );

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleDeleteAndUpdate = useCallback(async () => {
    setShowAnswers(false);
    await deleteComment(id);
    await fetchComments(locationId, parentComment, topCommentsOnPageIndex);
    handleCloseDialog();
  }, [id, locationId, parentComment, topCommentsOnPageIndex]);

  useEffect(() => {
    if (showAnswers) {
      fetchComments(locationId, id, topCommentsOnPageIndex);
    }
  }, [showAnswers]);

  const toggleShowAnswers = () => {
    setShowAnswers(value => !value);
  };

  const { handleSubmit, control } = useForm<ChangeCommentCheck>({
    mode: 'onBlur',
    resolver: yupResolver(CommentSectionSchema)
  });

  const { errors } = useFormState({
    control
  });

  const openEditOrReplyComment = useCallback(
    (
      e: MouseEvent<HTMLLIElement, globalThis.MouseEvent>,
      type: 'edit' | 'reply'
    ) => {
      if (type === 'edit') {
        setShowEditComment(true);
      } else if (type === 'reply') {
        setShowReplyComment(true);
      }
      setDisabledPressedButton(true);
      handleClose();
    },
    []
  );

  const closeEditComment = useCallback(() => {
    setShowEditComment(false);
    setDisabledPressedButton(false);
  }, []);

  const closeReplyComment = useCallback(() => {
    setShowReplyComment(false);
    setDisabledPressedButton(false);
  }, []);

  const onSubmitEditComment: SubmitHandler<ChangeCommentCheck> = useCallback(
    data => {
      const comment = {
        text: data.commentText,
        author: authorId,
        locationId,
        likes,
        dislikes,
        parentComment
      };
      editComment(comment, id);
      closeEditComment();
    },
    [authorId, locationId, likes, dislikes, parentComment]
  );

  const onSubmitReplyComment: SubmitHandler<ChangeCommentCheck> = useCallback(
    data => {
      const comment = {
        text: data.commentText,
        author: userId,
        locationId,
        parentComment: id
      };
      sendComment(comment);
      closeReplyComment();
    },
    [userId, locationId, id]
  );

  const pathToProfile = useMemo(
    () => getPath(userId, authorId),
    [userId, authorId]
  );

  return (
    <>
      {!deleted ? (
        <Box alignItems="flex-start" sx={{ display: 'block', pl: 0, py: 6 }}>
          <AlertDialog
            openDialog={openDialog}
            transmittHandlerFunction={handleDeleteAndUpdate}
            handleCloseDialog={handleCloseDialog}
            deletingObject={t(
              'bigPopup.commentSection.commentSection.alertdialogmessagedata'
            )}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex' }}>
              <Link to={pathToProfile}>
                <StyledCommentBadge
                  color="info"
                  badgeContent={authorRole}
                  invisible={authorRole === 'user'}
                >
                  <Avatar
                    sx={{ mr: 2 }}
                    alt="Comment's author avatar"
                    src={authorsImage}
                  />
                </StyledCommentBadge>
              </Link>
              <Link to={pathToProfile}>
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
                  <ListItemText>
                    {t(
                      'bigPopup.commentSection.commentSection.complainToComment'
                    )}
                  </ListItemText>
                </MenuItem>
                {((authorId && authorId === userId) ||
                  role === 'moderator' ||
                  role === 'admin') && (
                  <ChangeComment
                    deleteComment={handleOpenDialog}
                    openEditOrReplyComment={openEditOrReplyComment}
                    disabledPressedButton={disabledPressedButton}
                  />
                )}
              </Menu>
            </Box>
          </Box>
          {showEditComment ? (
            <EditCommentField
              name="newCommentText"
              errors={errors}
              onSubmitEditComment={onSubmitEditComment}
              handleSubmit={handleSubmit}
              control={control}
              text={text}
              closeEditComment={closeEditComment}
            />
          ) : (
            <Typography mt={4} variant="subtitle1">
              {parentAuthorUrl && parentAuthorName && (
                <Link style={{ textDecoration: 'none' }} to={parentAuthorUrl}>
                  <Typography component="span" color="primary">
                    @{parentAuthorName.toLowerCase()},<br />
                  </Typography>
                </Link>
              )}
              {text}
            </Typography>
          )}
          <RatingCommentSection
            id={id}
            disabledPressedButton={disabledPressedButton}
            openEditOrReplyComment={openEditOrReplyComment}
            userId={userId}
            role={role}
            date={date}
            likes={likes}
            dislikes={dislikes}
          />
        </Box>
      ) : (
        <Typography
          sx={{ fontStyle: 'italic', m: 1 }}
          py={8}
          my={8}
          align="center"
        >
          {t('bigPopup.commentSection.commentSection.deletedOriginalComment')}
        </Typography>
      )}

      {showReplyComment && (
        <ReplyCommentField
          name="replyCommentText"
          authorsName={authorsName}
          errors={errors}
          onSubmitReplyComment={onSubmitReplyComment}
          handleSubmit={handleSubmit}
          control={control}
          closeReplyComment={closeReplyComment}
        />
      )}
      {hasReplies && index === 0 && (
        <Box sx={{ display: 'block', pr: 0 }}>
          <Accordion sx={{ boxShadow: 0 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              onClick={toggleShowAnswers}
            >
              {!showAnswers ? (
                <Typography color="primary">
                  {t('bigPopup.commentSection.commentSection.showAnswers')}
                </Typography>
              ) : (
                <Typography color="primary">
                  {t('bigPopup.commentSection.commentSection.hideAnswers')}
                </Typography>
              )}
            </AccordionSummary>
            <AccordionDetails>
              <CommentReplyList
                topCommentsOnPageIndex={topCommentsOnPageIndex}
                hasReplies={hasReplies}
                parentAuthorName={authorsName}
                parentAuthorUrl={pathToProfile}
                comments={comments}
                index={index}
                childComments={childComments}
              />
            </AccordionDetails>
          </Accordion>
        </Box>
      )}
      {childComments.length > 0 && index !== 0 && (
        <CommentReplyList
          topCommentsOnPageIndex={topCommentsOnPageIndex}
          hasReplies={hasReplies}
          parentAuthorName={authorsName}
          parentAuthorUrl={pathToProfile}
          comments={comments}
          index={index}
          childComments={childComments}
        />
      )}
    </>
  );
};

Comment.defaultProps = {
  parentAuthorUrl: '',
  parentAuthorName: ''
};

export default memo(Comment);
