import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import { Typography, FormControlLabel, Switch } from '@mui/material';
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
  return (
    <>
      <ProfileFormWrapper>
        <ProfileContentWrapper>
          <ProfileAvatar aria-label="avatar" src={userImageNotFound} />
          <Typography variant="h3" component="h4" align="center">
            {displayName === undefined ? 'name is undefined' : displayName}
          </Typography>
          <Typography variant="h5" component="h4" align="center">
            Creation date: {createdAt}
          </Typography>
          <Typography variant="h5" component="h5" align="center">
            {email}
          </Typography>
          <ProfileButton onClick={logout} size="large" variant="contained">
            Logout
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
            label="Visited"
          />
          <FormControlLabel control={<Switch />} label="Favorites" />
          <FormControlLabel control={<Switch />} label="Personal" />
        </FormGroup>
      </ProfileFilterWrapper>
    </>
  );
}
