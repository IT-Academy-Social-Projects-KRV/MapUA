/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import {
  Avatar,
  Box,
  Button,
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
import { createSearchParams, useNavigate } from 'react-router-dom';
import { topLocationType } from '../../../types';

const TopLocations = () => {
  const { t } = useTranslation();
  const { fetchTopLocations } = useTypedDispatch();
  useEffect(() => {
    fetchTopLocations();
  }, []);
  const navigate = useNavigate();
  const topLocations = useTypedSelector(state => state.topLocations);
  const redirect = (path: string) => {
    navigate({
      pathname: '/',
      search: `?locationName=${path.replaceAll(' ', '+')}`
    });
    window.location.reload();
  };
  if (topLocations.loading) {
    return <h1>{t('profile.profile.loading')}</h1>;
  }
  return (
    <Box sx={{ mb: '50px' }}>
      <h2 style={{ textAlign: 'center' }}>{t('topList.topLocations')}</h2>
      <List>
        {topLocations.data.map((location: topLocationType) => (
          <ListItem key={location._id}>
            <Link
              sx={{ cursor: 'pointer' }}
              onClick={() => redirect(location.locationName)}
            >
              <ListItemAvatar>
                <Avatar src={location.arrayPhotos[0]} />
              </ListItemAvatar>
            </Link>
            <Link
              sx={{ cursor: 'pointer' }}
              onClick={() => redirect(location.locationName)}
            >
              <ListItemText
                primary={location.locationName}
                sx={{ pr: '10px' }}
              />
            </Link>
            <div>
              {t('topList.likes')} {location.likes}
            </div>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TopLocations;
