import { IconButton } from '@mui/material';
import React, { FC, MouseEventHandler } from 'react';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import TourOutlinedIcon from '@mui/icons-material/TourOutlined';
import TourIcon from '@mui/icons-material/Tour';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { useTranslation } from 'react-i18next';

type Props = {
  handleRating: Function;
  handleFavoriteClick: MouseEventHandler<HTMLButtonElement>;
  handleVisitedClick: MouseEventHandler<HTMLButtonElement>;
  locationIsFavorite: boolean | '' | undefined;
  locationIsVisited: boolean | '' | undefined;
  handleDeleteClick: MouseEventHandler<HTMLButtonElement>;
  authorOfThisLocation: boolean | '' | undefined;
};

export const IconsComponent: FC<Props> = ({
  handleRating,
  handleFavoriteClick,
  locationIsFavorite,
  locationIsVisited,
  handleVisitedClick,
  handleDeleteClick,
  authorOfThisLocation
}) => {
  const { t } = useTranslation();

  const { rating } = useTypedSelector(state => state.popupLocation.data);

  const { _id: userId } = useTypedSelector(state => state.userData.data);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={e => handleRating(e, 'likes')}>
        {rating.likes.includes(userId) ? (
          <ThumbUpIcon fontSize="small" sx={{ color: 'text.secondary' }} />
        ) : (
          <ThumbUpOutlinedIcon
            fontSize="small"
            sx={{ color: 'text.secondary' }}
          />
        )}
        {rating.likes.length}
      </IconButton>

      <IconButton onClick={e => handleRating(e, 'dislikes')}>
        {rating.dislikes.includes(userId) ? (
          <ThumbDownIcon fontSize="small" sx={{ color: 'text.secondary' }} />
        ) : (
          <ThumbDownAltOutlinedIcon
            fontSize="small"
            sx={{ color: 'text.secondary' }}
          />
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
          {authorOfThisLocation && (
            <IconButton size="small" onClick={handleDeleteClick}>
              {t('pointPopUp.deleteLocation')}
            </IconButton>
          )}
        </MenuItem>
      </Menu>
    </>
  );
};
