import React from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Typography } from '@mui/material';

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
  return (
    <>
      <ProfileFormWrapper>
        <ProfileContentWrapper>
          <IconButton
            aria-label="Close"
            sx={{
              borderRadius: 0,
              position: 'absolute',
              right: '20px',
              top: '90px'
            }}
          >
            <CloseIcon />
          </IconButton>
          <ProfileAvatar
            aria-label="avatar"
            src="https://cdn-icons-png.flaticon.com/512/147/147142.png"
          />
          <Typography variant="h3" component="h4" align="center">
            {displayName === undefined ? 'name is undefined' : displayName}
          </Typography>
          <Typography variant="h5" component="h4" align="center">
            Creation date: {createdAt}
          </Typography>
          <Typography variant="h5" component="h5" align="center">
            {email}
          </Typography>
          <ProfileButton size="large" variant="contained">
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
