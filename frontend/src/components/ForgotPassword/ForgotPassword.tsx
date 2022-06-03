import React, { useState, SyntheticEvent } from 'react';
import axios from 'services/axios';
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
import {
  useForm,
  Controller,
  SubmitHandler,
  useFormState
} from 'react-hook-form';
import LoadingButton from '@mui/lab/LoadingButton';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { ForgotPasswordSchema } from 'utils/validation';
import { StyledPaperForm } from '../design/StyledPaperForm';
import { StyledAuthFormWrapper } from '../design/StyledAuthFormWrapper';

interface INotification {
  type: AlertColor;
  message: string;
}

type EmailCheck = {
  email: string;
};

function ForgotPassword() {
  const [notification, setNotification] = useState<INotification | null>(null);
  const [loading, setLoading] = useState(false);

  const { handleSubmit, control } = useForm<EmailCheck>({
    mode: 'onBlur',
    resolver: yupResolver(ForgotPasswordSchema)
  });

  const { errors } = useFormState({
    control
  });

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

  const sendEmail: SubmitHandler<EmailCheck> = async ({ email }, e) => {
    setLoading(true);

    try {
      const { data } = await axios().post(`forgot-password`, { email });
      e?.target.reset();
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
    <StyledAuthFormWrapper>
      <Grid container justifyContent="center">
        <Grid item md={4}>
          <StyledPaperForm>
            <Box component="form" onSubmit={handleSubmit(sendEmail)}>
              <Stack spacing={4}>
                <Typography align="center" variant="h4">
                  {t('common.forgotPassword')}
                </Typography>

                <Controller
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <TextField
                      placeholder={t('common.enterYourEmail')}
                      label="Email"
                      autoComplete="current-email"
                      fullWidth
                      onChange={e => field.onChange(e)}
                      onBlur={field.onBlur}
                      defaultValue={field.value}
                      error={!!errors.email?.message}
                      helperText={t(
                        !errors.email ? '' : String(errors.email.message)
                      )}
                    />
                  )}
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
          </StyledPaperForm>
          <Stack spacing={5} sx={{ width: '100%' }}>
            {snackbar}
          </Stack>
        </Grid>
      </Grid>
    </StyledAuthFormWrapper>
  );
}

export default ForgotPassword;
