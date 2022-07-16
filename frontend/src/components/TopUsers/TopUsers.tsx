import {
  Avatar,
  Box,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@mui/material';
import { StyledCardTopRated } from 'components/design/StyledCardTopRated';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { selectTopUsers } from 'redux/memoizedSelectors/topUsersSelectors';
import { selectUserId } from 'redux/memoizedSelectors/userDataSelectors';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { getPath } from 'utils/createPath';
import { Link as RouterLink } from 'react-router-dom';
import CircularLoader from 'components/CircularLoader/CircularLoader';
import { TopUserType } from '../../../types';

const TopUsers = () => {
  const { t } = useTranslation();
  const { fetchTopUsers } = useTypedDispatch();
  useEffect(() => {
    fetchTopUsers();
  }, []);
  const topUsers = useTypedSelector(selectTopUsers);
  const userId = useTypedSelector(selectUserId);

  if (topUsers.loading) {
    return <CircularLoader />;
  }
  return (
    <Box sx={{ mb: '50px' }}>
      <h2 style={{ textAlign: 'center' }}>{t('topList.topUsers')}</h2>
      <List>
        {topUsers.data.map((user: TopUserType) => (
          <StyledCardTopRated key={user._id}>
            <ListItem>
              <ListItemAvatar>
                <Link component={RouterLink} to={getPath(userId, user._id)}>
                  <Avatar src={user.imageUrl} />
                </Link>
              </ListItemAvatar>

              <Link component={RouterLink} to={getPath(userId, user._id)}>
                <ListItemText primary={user.displayName} sx={{ pr: '10px' }} />
              </Link>
              <div>
                {t('topList.locationsAdded')} {user.count}
              </div>
            </ListItem>
          </StyledCardTopRated>
        ))}
      </List>
    </Box>
  );
};

export default TopUsers;
