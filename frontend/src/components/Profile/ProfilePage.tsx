import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import { Typography, FormControlLabel, Switch } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import userImageNotFound from '../../static/user-image-not-found.png';

import {
  ProfileAvatar,
  ProfileButton,
  ProfileContentWrapper,
  ProfileFilterWrapper,
  ProfileFormWrapper,
  ProfileUsertWrapper
} from './styles';
import BasicTabs from './BasicTabs';

interface ProfilePageProps {
  email: string;
  displayName: string;
  createdAt: Date | string;
}

export default function ProfilePage(props: ProfilePageProps) {
  const { email, displayName, createdAt } = props;
  const { logout } = useTypedDispatch();

  const { t } = useTranslation();

  return (
    <>
      <ProfileFormWrapper>
        <ProfileContentWrapper>
          <ProfileAvatar aria-label="avatar" src={userImageNotFound} />
          <Typography variant="h3" component="h4" align="center">
            {displayName === undefined
              ? `${t('profile.profilePage.nameIsUndefined')}`
              : displayName}
          </Typography>
          <Typography variant="h5" component="h4" align="center">
            {t('profile.profilePage.creatingDate')} {createdAt}
          </Typography>
          <Typography variant="h5" component="h5" align="center">
            {email}
          </Typography>
          <ProfileButton onClick={logout} size="large" variant="contained">
            {t('profile.profilePage.logout')}
          </ProfileButton>
        </ProfileContentWrapper>
        <ProfileUsertWrapper>
          <BasicTabs />
        </ProfileUsertWrapper>
      </ProfileFormWrapper>
      <ProfileFilterWrapper>
        <FormGroup row>
          <FormControlLabel
            control={<Switch defaultChecked />}
            label={t('profile.profilePage.visited')}
          />
          <FormControlLabel
            control={<Switch />}
            label={t('profile.profilePage.favorites')}
          />
          <FormControlLabel
            control={<Switch />}
            label={t('profile.profilePage.personal')}
          />
        </FormGroup>
      </ProfileFilterWrapper>
    </>
  );
}
