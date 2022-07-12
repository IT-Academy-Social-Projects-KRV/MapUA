// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useRef } from 'react';
import { Typography, Button } from '@mui/material';
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
} from '../../components/design/StyledProfile';
import BasicTabs from './BasicTabs';
import CircularLoader from '../../components/CircularLoader/CircularLoader';

export default function PersonProfilePage() {
  const { t } = useTranslation();
  const {
    loading: userLoading,
    data: {
      _id: otherUserId,
      displayName,
      imageUrl: userAvatar,
      role: otherUserRole
    }
  } = useTypedSelector(state => state.otherUserData);
  const {
    data: { subscriptions }
  } = useTypedSelector(state => state.userData);

  const {
    data: { isAuthorized, role }
  } = useTypedSelector(state => state.isUserAuthorized);

  const { fetchOtherUserData, toggleUserSubscription, toggleModeratorRights } =
    useTypedDispatch();

  const isSubscribed = subscriptions.some((s: any) => s._id === otherUserId);

  const params = useParams();
  useEffect(() => {
    fetchOtherUserData(params?.id || '');
  }, [params.id, role]);

  if (userLoading) {
    return <CircularLoader />;
  }

  const handleModeratorRights = () => {
    if (role === 'admin') {
      toggleModeratorRights(
        otherUserId,
        t('personalProfile.personalProfilePage.rightsUpdated')
      );
    }
  };

  const handleSubscription = () => {
    if (isAuthorized) {
      toggleUserSubscription(
        otherUserId,
        t('personalProfile.personalProfilePage.subscriptionUpdated')
      );
    }
  };
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
        {isAuthorized && (
          <SubsrcibeButton
            size="large"
            variant="contained"
            onClick={handleSubscription}
          >
            {isSubscribed
              ? t('profile.profilePage.unsubscribe')
              : t('profile.profilePage.subscribe')}
          </SubsrcibeButton>
        )}
        {role === 'admin' && otherUserRole !== 'admin' && (
          <Button variant="outlined" onClick={handleModeratorRights}>
            {otherUserRole === 'moderator'
              ? t('profile.profilePage.removeModerator')
              : t('profile.profilePage.createModerator')}
          </Button>
        )}
      </ProfileContentWrapper>
      <ProfileUserWrapper>
        <BasicTabs />
      </ProfileUserWrapper>
    </ProfileFormWrapper>
  );
}
