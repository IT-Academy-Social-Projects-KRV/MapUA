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
} from '../../components/design/StyledProfile';
import BasicTabs from './BasicTabs';
import CircularLoader from '../../components/CircularLoader/CircularLoader';

export default function PersonProfilePage() {
  const { role } = useTypedSelector(state => state.otherUserData.data);

  const { role: myRole } = useTypedSelector(
    state => state.isUserAuthorized.data
  );

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

  const { fetchOtherUserData, toggleUserSubscription, toggleUserBan } =
    useTypedDispatch();

  const isSubscribed = subscriptions.some((s: any) => s._id === otherUserId);

  const params = useParams();
  useEffect(() => {
    fetchOtherUserData(params?.id || '');
  }, [params.id]);

  if (userLoading) {
    return <CircularLoader />;
  }

  const handleSubscription = () => {
    if (isAuthorized) {
      toggleUserSubscription(
        otherUserId,
        t('personalProfile.personalProfilePage.subscriptionUpdated')
      );
    }
  };

  const toogleBanStatus = (): string => {
    if (role === 'user') {
      return 'bannedUser';
    }
    return 'user';
  };

  const handleBan = () => {
    if (isAuthorized) {
      toggleUserBan(
        otherUserId,
        toogleBanStatus(),
        t('personalProfile.personalProfilePage.banningUpdated')
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
        {isAuthorized.isAuthorized && (
          <>
            <SubsrcibeButton
              size="large"
              variant="contained"
              onClick={handleSubscription}
            >
              {isSubscribed
                ? t('profile.profilePage.unsubscribe')
                : t('profile.profilePage.subscribe')}
            </SubsrcibeButton>

            {role !== 'admin' &&
              role !== 'moderator' &&
              (myRole === 'moderator' || myRole === 'admin') && (
                <SubsrcibeButton
                  size="large"
                  variant="contained"
                  onClick={handleBan}
                >
                  {role === 'bannedUser'
                    ? t('profile.profilePage.unban')
                    : t('profile.profilePage.ban')}
                </SubsrcibeButton>
              )}
          </>
        )}
      </ProfileContentWrapper>
      <ProfileUserWrapper>
        <BasicTabs />
      </ProfileUserWrapper>
    </ProfileFormWrapper>
  );
}
