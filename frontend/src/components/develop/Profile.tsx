import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { UserDataType } from '../../../types';
import { fetchData } from '../../utils/requests';

const { REACT_APP_API_URI } = process.env;

function Profile() {
  const [id, setId] = useState<string>('');
  const [userData, setUserData] = useState<UserDataType>({
    email: '',
    createdAt: '',
    updatedAt: '',
    displayName: '',
    description: '',
    imageUrl: '',
    subscribers: [],
    subscriptions: []
  });

  async function onGetToken() {
    if (id) {
      const url = `${REACT_APP_API_URI}userData/${id}`;
      const { status, data } = await fetchData(url);

      if (status && data && data.error) {
        console.error(status, data.error);
        return;
      }

      if (data) {
        setUserData(data.userData);
      }
    }
  }

  const onIdChange = (e: any) => {
    setId(e.target.value);
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
      <TextField value={id} onChange={onIdChange} label="user id" />
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
