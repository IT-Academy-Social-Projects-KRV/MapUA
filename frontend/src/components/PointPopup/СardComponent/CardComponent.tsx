import {
  Avatar,
  Button,
  Typography,
  Box,
  TextField,
  Badge,
  Stack,
  Divider
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { FC, memo, MouseEventHandler, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  selectAuthor,
  selectCreatedAt,
  selectDescription
} from 'redux/memoizedSelectors/popupLocationSelectors';
import {
  selectUserDataSubscriptions,
  selectUserId
} from 'redux/memoizedSelectors/userDataSelectors';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { Controller } from 'react-hook-form';
import { getPath } from 'utils/createPath';
import { Link } from 'react-router-dom';
import { StyledCardComponentBox } from '../../design/StyledCardComponentBox';
import userImageNotFound from '../../../static/image-not-found.jpg';
import { AuthorInfoType } from '../../../../types';

type Props = {
  handleExpandClick: MouseEventHandler<HTMLButtonElement>;
  expanded: boolean;
  showEditPanel: boolean;
  control: any;
  errors: any;
};

const CardComponent: FC<Props> = ({
  handleExpandClick,
  expanded,
  showEditPanel,
  control,
  errors
}) => {
  const { t } = useTranslation();

  const createdAt = useTypedSelector(selectCreatedAt);
  const author = useTypedSelector(selectAuthor);
  const description = useTypedSelector(selectDescription);

  const userId = useTypedSelector(selectUserId);
  const subscriptions = useTypedSelector(selectUserDataSubscriptions);

  const isSubscribed = subscriptions.some(
    (s: AuthorInfoType) => s._id === author?._id
  );

  const pathToProfile = useMemo(
    () => getPath(userId, author?._id),
    [userId, author?._id]
  );

  const URL_REGEX =
    // eslint-disable-next-line no-useless-escape
    /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim;

  function getListOfWords() {
    const newDescription = description.split(' ');
    return newDescription;
  }
  return (
    <Box>
      <StyledCardComponentBox>
        {t('pointPopUp.locationCreatedBy')}
        <Badge color="secondary" variant="dot" invisible={!isSubscribed}>
          <Link to={pathToProfile}>
            <Avatar
              aria-label="author"
              src={(author && author.imageUrl) || userImageNotFound}
            />
          </Link>
        </Badge>
        <Link to={pathToProfile}>
          {(author && author.displayName) || 'undefined'}
        </Link>

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
        <Stack spacing={4} marginY={3}>
          <Divider />
          <Typography paddingX={3}>
            {getListOfWords().map(el => {
              if (el.match(URL_REGEX)) {
                return (
                  <>
                    <a target="_blank" rel="noreferrer" href={el}>
                      {el}
                    </a>{' '}
                  </>
                );
              }
              return `${el} `;
            })}{' '}
          </Typography>
          <Button
            size="small"
            color="info"
            onClick={handleExpandClick}
            sx={{
              transform: !expanded ? 'rotate(0deg)' : 'rotate(180deg)'
            }}
          >
            {!expanded ? (
              <Typography>{t('createLocation.openComments')}</Typography>
            ) : (
              ''
            )}

            <ExpandMoreIcon />
          </Button>
        </Stack>
      )}
    </Box>
  );
};

export default memo(CardComponent);
