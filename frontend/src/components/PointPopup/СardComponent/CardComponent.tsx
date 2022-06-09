import { Avatar, IconButton, Typography, Box, TextField } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { FC, MouseEventHandler } from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { Controller } from 'react-hook-form';
import { StyledCardComponentBox } from '../../design/StyledCardComponentBox';
import userImageNotFound from '../../../static/image-not-found.jpg';

type Props = {
  description: string;
  handleExpandClick: MouseEventHandler<HTMLButtonElement>;
  expanded: boolean;
  showEditPanel: boolean;
  control: any;
  errors: any;
};

export const CardComponent: FC<Props> = ({
  description,
  handleExpandClick,
  expanded,
  showEditPanel,
  control,
  errors
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

        {showEditPanel ? (
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <TextField
                placeholder={t('profile.profilePage.enterName')}
                label={t('profile.profilePage.name')}
                fullWidth
                onChange={field.onChange}
                onBlur={field.onBlur}
                defaultValue={description}
                type="text"
                error={!!errors.description?.message}
                helperText={t(
                  !errors.description ? '' : String(errors.description.message)
                )}
              />
            )}
          />
        ) : (
          <TextField
            margin="normal"
            disabled
            multiline
            fullWidth
            minRows={2}
            defaultValue={description}
          />
        )}
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
