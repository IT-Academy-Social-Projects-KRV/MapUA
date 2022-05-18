import React, { useState, FormEvent, SyntheticEvent } from 'react';
import axios from 'axios';
import {
  Box,
  TextField,
  Typography,
  Stack,
  Alert,
  Snackbar,
  AlertColor,
  Grid,
  Link
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import { PaperForm } from '../design/PaperForm';
import { AuthFormWrapper } from '../design/AuthFormWrapper';

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
      const message = error?.response?.data?.error
        ? error.response.data.error
        : error.message;
      setNotification({ type: 'error', message });
    } finally {
      setLoading(false);
    }
  };

  let snackbar;
  if (notification) {
    snackbar = (
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
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
    <AuthFormWrapper>
      <Grid container justifyContent="center">
        <Grid item md={4}>
          <PaperForm>
            <Box component="form" onSubmit={sendEmail}>
              <Stack spacing={4}>
                <Typography align="center" variant="h4">
                  Forgot password?
                </Typography>

                <TextField
                  label="Email"
                  type="email"
                  id="email"
                  required
                  value={email}
                  placeholder="Please enter your email"
                  autoComplete="current-email"
                  fullWidth
                  onChange={e => setEmail(e.target.value)}
                />

                <LoadingButton
                  loading={loading}
                  type="submit"
                  variant="contained"
                >
                  sent password
                </LoadingButton>

                <Typography align="right">
                  <Link to="/login" underline="none" component={RouterLink}>
                    I remember password
                  </Link>
                </Typography>
              </Stack>
            </Box>
          </PaperForm>
          <Stack spacing={5} sx={{ width: '100%' }}>
            {snackbar}
          </Stack>
        </Grid>
      </Grid>
    </AuthFormWrapper>
  );
}

export default ForgotPassword;
