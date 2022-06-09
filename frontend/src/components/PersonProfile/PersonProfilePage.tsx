// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
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
  // const [isSubscribed, setIsSubscribed] = useState(false);
  const {
    loading: userLoading,
    data: { _id: otherUserId, displayName, imageUrl: userAvatar }
  } = useTypedSelector(state => state.otherUserData);
  const {
    data: { _id: userId, subscriptions }
  } = useTypedSelector(state => state.userData);

  const { fetchOtherUserData, toogleUserSubscription } = useTypedDispatch();

  const isSubscribed = subscriptions.includes(otherUserId);
  // console.log('otherId: ', otherUserId);
  // console.log('userId: ', userId);
  // console.log('subscriptions: ', subscriptions.includes(otherUserId));
  console.log('subscriptions: ', subscriptions);

  const params = useParams();
  useEffect(() => {
    fetchOtherUserData(params?.id || '');
  }, [params.id]);

  if (userLoading) {
    return <h1>{t('profile.profile.loading')}</h1>;
  }

  const handleSubscription = () => {
    toogleUserSubscription(
      otherUserId,
      userId,
      t('profile.profilePage.profilePageUpdatedSuccessfully')
    );
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
        <SubsrcibeButton
          size="large"
          variant="contained"
          onClick={handleSubscription}
        >
          {!isSubscribed
            ? t('profile.profilePage.subscribe')
            : t('profile.profilePage.unsubscribe')}
        </SubsrcibeButton>
      </ProfileContentWrapper>

      <ProfileUserWrapper>
        <BasicTabs />
      </ProfileUserWrapper>
    </ProfileFormWrapper>
  );
}
