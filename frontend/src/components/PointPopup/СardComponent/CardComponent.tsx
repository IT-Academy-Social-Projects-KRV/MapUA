import { Avatar, IconButton, Typography, Box, TextField } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { FC, MouseEventHandler } from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
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
  // const { displayName } = useTypedSelector(state => state.userData.data);
  const { t } = useTranslation();

  return (
    <>
      <Box>
        <StyledCardComponentBox>
          {t('pointPopUp.locationCreatedBy')}
          <Avatar
            aria-label="author"
            src={(author && author.imageUrl) || userImageNotFound}
          />

          {(author && author.displayName) || 'undefined'}

          <Typography>{createdAt.toLocaleDateString()}</Typography>
        </StyledCardComponentBox>
        <TextField
          margin="normal"
          disabled
          multiline
          fullWidth
          minRows={2}
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
