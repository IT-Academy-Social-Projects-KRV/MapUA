import React, { memo, MouseEventHandler, useCallback } from 'react';
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Menu,
  MenuItem
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import TourOutlinedIcon from '@mui/icons-material/TourOutlined';
import TourIcon from '@mui/icons-material/Tour';
import DeleteIcon from '@mui/icons-material/Delete';
import VerifiedIcon from '@mui/icons-material/Verified';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ReportIcon from '@mui/icons-material/Report';
import EditIcon from '@mui/icons-material/Edit';
import ReportOffIcon from '@mui/icons-material/ReportOff';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import {
  selectAuthor,
  selectRaiting,
  selectReported,
  selectVerificationStatus
} from 'redux/memoizedSelectors/popupLocationSelectors';
import { selectUserId } from 'redux/memoizedSelectors/userDataSelectors';
import {
  selectIsUserAuthorized,
  selectUserRole
} from 'redux/memoizedSelectors/isUserAuthorizedSelectors';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { useTranslation } from 'react-i18next';

import ConfirmOrDecline from './ConfirmOrDecline';

type Props = {
  handleRating: Function;
  handleFavoriteClick: MouseEventHandler<HTMLButtonElement>;
  handleVisitedClick: MouseEventHandler<HTMLButtonElement>;
  handleDeleteClick: any;
  locationIsFavorite: boolean | '' | undefined;
  locationIsVisited: boolean | '' | undefined;
  editData: any;
  locationAuthorId: any;
  locationId: any;
};

const IconsComponent = ({
  handleRating,
  handleFavoriteClick,
  locationIsFavorite,
  locationIsVisited,
  handleVisitedClick,
  editData,
  locationAuthorId,
  handleDeleteClick,
  locationId
}: Props) => {
  const { t } = useTranslation();
  const {
    addReportToLocation,
    deleteReportToLocation,
    SetSuccessSnackbar,
    updatePopupLocationRating
  } = useTypedDispatch();

  const rating = useTypedSelector(selectRaiting);
  const verificationStatus = useTypedSelector(selectVerificationStatus);
  const author = useTypedSelector(selectAuthor);
  const reported = useTypedSelector(selectReported);
  const userId = useTypedSelector(selectUserId);
  const isAuthorized = useTypedSelector(selectIsUserAuthorized);
  const role = useTypedSelector(selectUserRole);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const copyToClipBoard = async () => {
    const params = new URLSearchParams(window.location.search);
    const path = `http://localhost:3000/?${params.toString()}`;
    await navigator.clipboard.writeText(path);
    SetSuccessSnackbar(t('pointPopUp.copy'));
  };

  const reportLocation = () => {
    addReportToLocation(
      locationId,
      true,
      t('createLocation.locationSuccessfullyReported')
    );
  };

  const deleteReport = () => {
    deleteReportToLocation(
      locationId,
      false,
      t('createLocation.locationSuccessfullyDeclineReport')
    );
  };

  const handleConfirmOrDeclineVerification = useCallback(
    (status: string) => {
      updatePopupLocationRating(locationId, {
        rating,
        verificationStatus: status
      });
    },
    [locationId, rating]
  );

  return (
    <>
      {verificationStatus === 'verified' ? (
        <Tooltip title={t('mainFilters.verifiedValues.verified')}>
          <IconButton>
            <VerifiedIcon color="primary" />
          </IconButton>
        </Tooltip>
      ) : null}
      {verificationStatus === 'waiting' ? (
        <Tooltip title={t('mainFilters.verifiedValues.waiting')}>
          <IconButton>
            <AutorenewIcon color="primary" />
          </IconButton>
        </Tooltip>
      ) : null}
      <IconButton
        onClick={e => {
          if (isAuthorized) {
            handleRating(e, 'likes');
          }
        }}
      >
        {rating.likes.includes(userId) ? (
          <ThumbUpIcon fontSize="small" sx={{ mr: '5px' }} />
        ) : (
          <ThumbUpOutlinedIcon fontSize="small" sx={{ mr: '5px' }} />
        )}
        {rating.likes.length}
      </IconButton>

      <IconButton
        onClick={e => {
          if (isAuthorized) {
            handleRating(e, 'dislikes');
          }
        }}
      >
        {rating.dislikes.includes(userId) ? (
          <ThumbDownIcon fontSize="small" sx={{ mr: '5px' }} />
        ) : (
          <ThumbDownAltOutlinedIcon fontSize="small" sx={{ mr: '5px' }} />
        )}
        {rating.dislikes.length}
      </IconButton>

      <IconButton
        size="small"
        onClick={copyToClipBoard}
        title={t('pointPopUp.toShare')}
      >
        <ShareIcon />
      </IconButton>

      <IconButton
        size="small"
        onClick={handleFavoriteClick}
        title={
          locationIsFavorite
            ? `${t('pointPopUp.removeFromFavorite')}`
            : `${t('pointPopUp.addToFavorite')}`
        }
      >
        {locationIsFavorite ? <BookmarkIcon /> : <BookmarkBorderIcon />}
      </IconButton>

      <IconButton
        size="small"
        onClick={handleVisitedClick}
        title={
          locationIsVisited
            ? `${t('pointPopUp.removeFromVisited')}`
            : `${t('pointPopUp.addToVisited')}`
        }
      >
        {locationIsVisited ? <TourIcon /> : <TourOutlinedIcon />}
      </IconButton>
      {isAuthorized && (
        <IconButton
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <MoreHorizIcon />
        </IconButton>
      )}

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
        {((author && author._id === userId) ||
          role === 'moderator' ||
          role === 'admin') && (
          <MenuItem onClick={handleDeleteClick}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>{t('createLocation.deleteLocation')}</ListItemText>
          </MenuItem>
        )}

        {((role === 'moderator' && verificationStatus === 'waiting') ||
          (role === 'admin' && verificationStatus === 'waiting')) && (
          <ConfirmOrDecline
            handleConfirmOrDeclineVerification={
              handleConfirmOrDeclineVerification
            }
          />
        )}

        {(locationAuthorId?._id === userId ||
          role === 'moderator' ||
          role === 'admin') &&
          verificationStatus !== 'verified' &&
          role !== 'bannedUser' && (
            <MenuItem onClick={editData}>
              <ListItemIcon>
                <EditIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>{t('createLocation.editLocation')}</ListItemText>
            </MenuItem>
          )}

        {isAuthorized && !reported && role !== 'bannedUser' && (
          <MenuItem onClick={reportLocation}>
            <ListItemIcon>
              <ReportIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>{t('createLocation.reportLocation')}</ListItemText>
          </MenuItem>
        )}

        {(role === 'moderator' || role === 'admin') && reported && (
          <MenuItem onClick={deleteReport}>
            <ListItemIcon>
              <ReportOffIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>
              {t('createLocation.declineReportLocation')}
            </ListItemText>
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default memo(IconsComponent);
