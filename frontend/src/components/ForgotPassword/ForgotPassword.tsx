import React, { useState, FormEvent, SyntheticEvent } from 'react';
import axios from 'axios';
import _ from 'lodash';
import {
  FormControl,
  TextField,
  Typography,
  Box,
  Stack,
  Alert,
  Snackbar,
  AlertColor
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import {
  WrapH1,
  BorderForm,
  RegistrationFormWrapper,
  StyledSpan,
  WrapButtonAndText
} from './styles';

const { REACT_APP_API_URI } = process.env;

interface INotification {
  type: AlertColor;
  message: string;
}

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [notification, setNotification] = useState<INotification | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCloseNotification = (
    e?: SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotification(null);
  };

  const sendEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${REACT_APP_API_URI}/forgot-password`,
        {
          email
        }
      );
      setEmail('');
      setNotification({ type: 'success', message: data.message });
    } catch (error: any) {
      const { message } = _.has(error, 'response.data.message')
        ? error.response.data
        : error;
      setNotification({ type: 'error', message });
    } finally {
      setLoading(false);
    }
  };

  let snackbar;
  if (notification) {
    snackbar = (
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={!!notification}
        autoHideDuration={5000}
        onClose={handleCloseNotification}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.type}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    );
  }

  return (
    <RegistrationFormWrapper>
      <Box component="form" onSubmit={sendEmail}>
        <BorderForm>
          <FormControl sx={{ width: '35ch' }}>
            <WrapH1>
              <Typography sx={{ fontSize: '24px' }}>
                Forgot password?
              </Typography>
            </WrapH1>

            <Box sx={{ mt: '20px' }}>
              <TextField
                type="email"
                id="email"
                required
                value={email}
                placeholder="Please enter your email"
                label="Email"
                autoComplete="current-email"
                fullWidth
                onChange={e => setEmail(e.target.value)}
              />
            </Box>
            <WrapButtonAndText>
              <LoadingButton
                loading={loading}
                type="submit"
                variant="contained"
              >
                sent password
              </LoadingButton>
              <StyledSpan>
                <span>I remember password</span>
              </StyledSpan>
            </WrapButtonAndText>
          </FormControl>
        </BorderForm>
        <Stack spacing={5} sx={{ width: '100%' }}>
          {snackbar}
        </Stack>
      </Box>
    </RegistrationFormWrapper>
  );
}

export default ForgotPassword;
