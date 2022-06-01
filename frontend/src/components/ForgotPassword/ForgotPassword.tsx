import React, { useState, FormEvent, SyntheticEvent } from 'react';
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
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import axios from 'services/axios';
import { PaperForm } from '../design/PaperForm';
import { AuthFormWrapper } from '../design/AuthFormWrapper';

interface INotification {
  type: AlertColor;
  message: string;
}

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [notification, setNotification] = useState<INotification | null>(null);
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();

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
      const { data } = await axios().post(`forgot-password`, { email });
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
        sx={{ zIndex: 10000 }}
        open={!!notification}
        autoHideDuration={3000}
        onClose={handleCloseNotification}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.type}
          sx={{ width: '100%', mt: '4vh' }}
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
                  {t('common.forgotPassword')}
                </Typography>

                <TextField
                  label="Email"
                  type="email"
                  id="email"
                  required
                  value={email}
                  placeholder={t('common.enterYourEmail')}
                  autoComplete="current-email"
                  fullWidth
                  onChange={e => setEmail(e.target.value)}
                />

                <LoadingButton
                  loading={loading}
                  type="submit"
                  variant="contained"
                >
                  {t('forgotPassword.sentPassword')}
                </LoadingButton>

                <Typography align="right">
                  <Link to="/login" underline="none" component={RouterLink}>
                    {t('forgotPassword.rememberPassword')}
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
