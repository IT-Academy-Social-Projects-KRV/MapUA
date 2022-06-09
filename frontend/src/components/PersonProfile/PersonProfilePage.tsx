// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { useParams } from 'react-router-dom';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import userImageNotFound from '../../static/user-image-not-found.png';
import {
  ProfileAvatar,
  ProfileContentWrapper,
  ProfileFormWrapper,
  ProfileUserWrapper,
  SubsrcibeButton
} from '../design/StyledProfile';
import BasicTabs from './BasicTabs';

export default function PersonProfilePage() {
  const { t } = useTranslation();

  const { loading: userLoading } = useTypedSelector(
    state => state.otherUserData
  );

  const params = useParams();
  const { fetchOtherUserData } = useTypedDispatch();
  useEffect(() => {
    fetchOtherUserData(params?.id || '');
  }, [params.id]);
  const {
    data: { displayName, imageUrl: userAvatar }
  } = useTypedSelector(state => state.otherUserData);
  if (userLoading) {
    return <h1>{t('profile.profile.loading')}</h1>;
  }
  return (
    <ProfileFormWrapper>
      <ProfileContentWrapper sx={{ height: 'auto' }}>
        <ProfileAvatar
          aria-label="avatar"
          src={userAvatar || userImageNotFound}
        />
        <Typography mt={2} variant="h5" component="h4" align="center">
          {displayName === undefined
            ? `${t('profile.profilePage.yourName')}`
            : displayName}
        </Typography>
        <SubsrcibeButton size="large" variant="contained" onClick={() => null}>
          {t('profile.profilePage.subscribe')}
        </SubsrcibeButton>
      </ProfileContentWrapper>

      <ProfileUserWrapper>
        <BasicTabs />
      </ProfileUserWrapper>
    </ProfileFormWrapper>
  );
}
