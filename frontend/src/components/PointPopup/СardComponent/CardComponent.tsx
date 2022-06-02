import { Avatar, IconButton, Typography, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { FC, MouseEventHandler } from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import userImageNotFound from '../../../static/image-not-found.jpg';

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
  // const { displayName } = useTypedSelector(state => state.userData.data);
  const { t } = useTranslation();

  return (
    <>
      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 5,
            mt: 5
          }}
        >
          {t('pointPopUp.locationCreatedBy')}
          <Avatar
            sx={{ mt: -2 }}
            aria-label="author"
            src={(author && author.imageUrl) || userImageNotFound}
          />
          <Typography>
            {(author && author.displayName) || 'undefined'}
          </Typography>

          <Typography>{createdAt.toLocaleDateString()}</Typography>
        </Box>
        <Typography
          variant="subtitle1"
          sx={{
            mt: 5,
            p: 3,
            border: '1px solid grey '
          }}
        >
          {description}
        </Typography>
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
