import {
  Avatar,
  Box,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@mui/material';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { getPath } from 'utils/createPath';
import { Link as RouterLink } from 'react-router-dom';
import { TopUserType } from '../../../types';

const TopUsers = () => {
  const { t } = useTranslation();
  const { fetchTopUsers } = useTypedDispatch();
  useEffect(() => {
    fetchTopUsers();
  }, []);
  const topUsers = useTypedSelector(state => state.topUsers);
  const { _id } = useTypedSelector(state => state.userData.data);
  if (topUsers.loading) {
    return <h1>{t('profile.profile.loading')}</h1>;
  }
  return (
    <Box sx={{ mb: '50px' }}>
      <h2 style={{ textAlign: 'center' }}>{t('topList.topUsers')}</h2>
      <List>
        {topUsers.data.map((user: TopUserType) => (
          <ListItem key={user._id}>
            <ListItemAvatar>
              <Link component={RouterLink} to={getPath(_id, user._id)}>
                <Avatar src={user.imageUrl} />
              </Link>
            </ListItemAvatar>

            <Link component={RouterLink} to={getPath(_id, user._id)}>
              <ListItemText primary={user.displayName} sx={{ pr: '10px' }} />
            </Link>
            <div>
              {t('topList.locationsAdded')} {user.count}
            </div>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TopUsers;
