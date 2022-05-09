import React from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { toogleProfilePage } from 'redux/actions-creators/profilepage';
import BasicTabs from './BasicTabs';
import {
  ProfileAvatar,
  ProfileButton,
  ProfileContentWrapper,
  ProfileFilterWrapper,
  ProfileFormWrapper,
  ProfileUsertWrapper
} from './styles';

// const testUserData = {
//   email: 'test@email.com',
//   createdAt: '11082021',
//   updatedAt: '11012022',
//   displayName: 'Test UserName',
//   description: 'here is should be description',
//   imageUrl: '/static/media/image-not-found.1668c579705e7d36ceab.jpg',
//   subscribers: ['First Subscriber', 'Second Subscriber', 'Third Subscriber'],
//   subscriptions: [
//     'First Subscriptions',
//     'Second Subscriptions',
//     'Third Subscriptions'
//   ]
// };

interface ProfilePageProps {
  email: string;
  displayName: string;
  createdAt: Date | string;
}

export default function ProfilePage(props: ProfilePageProps) {
  // const stater = useTypedSelector(state => state.user);
  const { email, displayName, createdAt } = props;
  const dispatch = useDispatch();

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
            <CloseIcon onClick={() => dispatch(toogleProfilePage())} />
          </IconButton>
          <ProfileAvatar
            aria-label="avatar"
            src="https://cdn-icons-png.flaticon.com/512/147/147142.png"
          />
          <Typography variant="h4" component="h4" align="center">
            {displayName}
            Creation date: {createdAt}
          </Typography>
          <Typography variant="h5" component="h5" align="center">
            {email}
          </Typography>
          <ProfileButton size="large" variant="contained">
            Subscribe
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
