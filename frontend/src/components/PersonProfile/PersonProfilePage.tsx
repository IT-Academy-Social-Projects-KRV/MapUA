// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { useParams } from 'react-router-dom';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { StyledBadge } from 'components/design/StyledBadge';
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
  const {
    loading: userLoading,
    data: { _id: otherUserId, displayName, imageUrl: userAvatar }
  } = useTypedSelector(state => state.otherUserData);
  const {
    data: { subscriptions }
  } = useTypedSelector(state => state.userData);

  const { data: isAuthorized } = useTypedSelector(
    state => state.isUserAuthorized
  );

  const { fetchOtherUserData, toggleUserSubscription } = useTypedDispatch();

  const isSubscribed = subscriptions.some((s: any) => s._id === otherUserId);

  const params = useParams();
  useEffect(() => {
    fetchOtherUserData(params?.id || '');
  }, [params.id]);

  if (userLoading) {
    return <h1>{t('profile.profile.loading')}</h1>;
  }

  const handleSubscription = () => {
    if (isAuthorized) {
      toggleUserSubscription(
        otherUserId,
        t('profile.profilePage.profilePageUpdatedSuccessfully')
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

        {/* <ProfileAvatar
          aria-label="avatar"
          src={userAvatar || userImageNotFound}
        /> */}
        <StyledBadge
          color="info"
          badgeContent={isAuthorized.role}
          invisible={false}
        >
          <Typography mt={2} variant="h5" component="h4" align="center">
            {displayName === undefined
              ? `${t('profile.profilePage.yourName')}`
              : displayName}
          </Typography>
        </StyledBadge>
        {isAuthorized.isAuthorized && (
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
      </ProfileContentWrapper>
      <ProfileUserWrapper>
        <BasicTabs />
      </ProfileUserWrapper>
    </ProfileFormWrapper>
  );
}
