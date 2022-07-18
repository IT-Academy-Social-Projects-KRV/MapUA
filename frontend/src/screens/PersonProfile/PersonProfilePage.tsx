// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import { Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  selectOtherUserAvatar,
  selectOtherUserDataLoading,
  selectOtherUserDisplayName,
  selectOtherUserId,
  selectOtherUserRole
} from 'redux/memoizedSelectors/otherUserDataSelectors';
import { selectUserDataSubscriptions } from 'redux/memoizedSelectors/userDataSelectors';
import {
  selectIsUserAuthorized,
  selectUserRole
} from 'redux/memoizedSelectors/isUserAuthorizedSelectors';
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

  const userLoading = useTypedSelector(selectOtherUserDataLoading);
  const otherUserId = useTypedSelector(selectOtherUserId);
  const displayName = useTypedSelector(selectOtherUserDisplayName);
  const userAvatar = useTypedSelector(selectOtherUserAvatar);
  const otherUserRole = useTypedSelector(selectOtherUserRole);
  const subscriptions = useTypedSelector(selectUserDataSubscriptions);
  const isAuthorized = useTypedSelector(selectIsUserAuthorized);
  const myRole = useTypedSelector(selectUserRole);

  const {
    fetchOtherUserData,
    toggleUserSubscription,
    toggleUserBan,
    toggleModeratorRights
  } = useTypedDispatch();

  const isSubscribed = subscriptions.some((s: any) => s._id === otherUserId);

  const params = useParams();
  useEffect(() => {
    fetchOtherUserData(params?.id || '');
  }, [params.id]);

  if (userLoading) {
    return <CircularLoader />;
  }

  const handleModeratorRights = () => {
    if (myRole === 'admin') {
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

  const toogleBanStatus = (): string => {
    if (otherUserRole === 'user') {
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
          {!displayName ? `${t('profile.profilePage.yourName')}` : displayName}
        </Typography>

        {isAuthorized && (
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

            {otherUserRole !== 'admin' &&
              otherUserRole !== 'moderator' &&
              (myRole === 'moderator' || myRole === 'admin') && (
                <SubsrcibeButton
                  sx={{ mb: '40px' }}
                  size="large"
                  variant="contained"
                  onClick={handleBan}
                >
                  {otherUserRole === 'bannedUser'
                    ? t('profile.profilePage.unban')
                    : t('profile.profilePage.ban')}
                </SubsrcibeButton>
              )}

            {myRole === 'admin' && otherUserRole !== 'admin' && (
              <Button variant="outlined" onClick={handleModeratorRights}>
                {otherUserRole === 'moderator'
                  ? t('profile.profilePage.removeModerator')
                  : t('profile.profilePage.createModerator')}
              </Button>
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
