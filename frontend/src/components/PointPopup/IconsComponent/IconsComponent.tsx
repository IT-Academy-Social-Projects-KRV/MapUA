import React, { FC, MouseEventHandler } from 'react';
import { IconButton, ListItemIcon, ListItemText } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
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
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { useTranslation } from 'react-i18next';
import ReportIcon from '@mui/icons-material/Report';
import EditIcon from '@mui/icons-material/Edit';
import ReportIconModerator from '@mui/icons-material/ReportGmailerrorred';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';

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

export const IconsComponent: FC<Props> = ({
  handleRating,
  handleFavoriteClick,
  locationIsFavorite,
  locationIsVisited,
  handleVisitedClick,
  editData,
  locationAuthorId,
  handleDeleteClick,
  locationId
}) => {
  const { t } = useTranslation();

  const { addReportToLocation } = useTypedDispatch();

  const { rating } = useTypedSelector(state => state.popupLocation.data);

  const { author } = useTypedSelector(state => state.popupLocation.data);
  const { _id: userId } = useTypedSelector(state => state.userData.data);
  const { isAuthorized } = useTypedSelector(
    state => state.isUserAuthorized.data
  );
  const { role } = useTypedSelector(state => state.isUserAuthorized.data);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const reportLocation = () => {
    addReportToLocation(
      locationId,
      true,
      t('createLocation.locationSuccessfullyReported')
    );
  };

  return (
    <>
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

      <IconButton size="small" title={t('pointPopUp.toShare')}>
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
          <ListItemText>{t('createLocation.complainToLocation')}</ListItemText>
        </MenuItem>
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

        {locationAuthorId?._id === userId && (
          <MenuItem onClick={editData}>
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>{t('createLocation.editLocation')}</ListItemText>
          </MenuItem>
        )}

        {(role === 'moderator' || role === 'admin') && (
          <MenuItem onClick={() => reportLocation()}>
            <ListItemIcon>
              <ReportIconModerator fontSize="small" />
            </ListItemIcon>
            <ListItemText>{t('createLocation.reportLocation')}</ListItemText>
          </MenuItem>
        )}
      </Menu>
    </>
  );
};
