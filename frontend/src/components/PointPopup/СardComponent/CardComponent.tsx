import {
  Avatar,
  IconButton,
  Typography,
  Box,
  TextField,
  Badge
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { FC, MouseEventHandler } from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { getPath } from 'utils/createPath';
import { Link } from 'react-router-dom';
import userImageNotFound from '../../../static/image-not-found.jpg';
import { StyledCardComponentBox } from '../../design/StyledCardComponentBox';

type Props = {
  description: string;
  handleExpandClick: MouseEventHandler<HTMLButtonElement>;
  expanded: boolean;
};

export const CardComponent: FC<Props> = ({
  description,
  handleExpandClick,
  expanded
}) => {
  const { createdAt, author } = useTypedSelector(
    state => state.popupLocation.data
  );
  const { _id, subscriptions } = useTypedSelector(state => state.userData.data);
  const {
    data: { _id: otherUserId }
  } = useTypedSelector(state => state.otherUserData);

  const isSubscribed = subscriptions.includes(otherUserId);
  const { t } = useTranslation();

  return (
    <>
      <Box>
        <StyledCardComponentBox>
          {t('pointPopUp.locationCreatedBy')}
          <Badge color="secondary" variant="dot" invisible={!isSubscribed}>
            <Link to={getPath(_id, author?._id)}>
              <Avatar
                aria-label="author"
                src={(author && author.imageUrl) || userImageNotFound}
              />
            </Link>
          </Badge>
          <Link to={getPath(_id, author?._id)}>
            {(author && author.displayName) || 'undefined'}
          </Link>

          <Typography>{createdAt.toLocaleDateString()}</Typography>
        </StyledCardComponentBox>
        <TextField
          margin="normal"
          disabled
          multiline
          fullWidth
          rows={4}
          defaultValue={description}
        />
      </Box>
      <IconButton
        onClick={handleExpandClick}
        sx={{
          mt: 3,
          transform: !expanded ? 'rotate(0deg)' : 'rotate(180deg)'
        }}
      >
        <ExpandMoreIcon />
      </IconButton>
    </>
  );
};
