import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { UserDataType } from '../../../types';
import { fetchData } from '../../utils/requests';

const { REACT_APP_API_URI } = process.env;

function Profile() {
  const [token, setToken] = useState<string>('');
  const [userData, setUserData] = useState<UserDataType>({
    email: '',
    createdAt: '',
    updatedAt: '',
    displayName: '',
    description: '',
    imageUrl: '',
    userToken: '',
    locations: {
      personal: [],
      favorite: [],
      visited: []
    },
    subscribers: [],
    subscriptions: []
  });

  async function onGetToken() {
    if (token) {
      const url = `${REACT_APP_API_URI}userData/${token}`;
      const { status, data } = await fetchData(url);

      console.log(status, data);
      if (status && data && data.message) {
        console.log(status, data.message);
        return;
      }

      if (data) {
        setUserData(data.userData);
        console.log(data.userData);
      }
    }
  }

  const onTokenChange = (e: any) => {
    setToken(e.target.value);
  };

  return (
    <Box
      sx={{
        m: 3,
        '&>*:not(:last-child)': {
          m: 3
        }
      }}
    >
      <TextField value={token} onChange={onTokenChange} label="user token" />
      <Button variant="contained" onClick={() => onGetToken()}>
        Check token
      </Button>
      <Box
        sx={{
          mt: 3,
          p: 3,
          border: '1px solid black'
        }}
      >
        <Box>{`email: ${userData.email}`}</Box>
        <Box>{`displayName: ${userData.displayName}`}</Box>
      </Box>
    </Box>
  );
}

export default Profile;
