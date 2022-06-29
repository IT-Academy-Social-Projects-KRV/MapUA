import React, { useState } from 'react';
import axios from 'services/axios';
import { Box, TextField, Typography, Stack, Grid, Link } from '@mui/material';
import {
  useForm,
  Controller,
  SubmitHandler,
  useFormState
} from 'react-hook-form';
import LoadingButton from '@mui/lab/LoadingButton';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { ForgotPasswordSchema } from 'utils/validation';
import { StyledPaperForm } from '../design/StyledPaperForm';
import { StyledAuthFormWrapper } from '../design/StyledAuthFormWrapper';
import { useTypedDispatch } from '../../redux/hooks/useTypedDispatch';
import CircularLoader from '../CircularLoader/CircularLoader';

type EmailCheck = {
  email: string;
};

function ForgotPassword() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { SetSuccessSnackbar, SetErrorSnackbar } = useTypedDispatch();
  const [loading, setLoading] = useState(false);

  const { handleSubmit, control } = useForm<EmailCheck>({
    mode: 'onBlur',
    resolver: yupResolver(ForgotPasswordSchema)
  });
  const { errors } = useFormState({
    control
  });

  const sendEmail: SubmitHandler<EmailCheck> = async ({ email }, e) => {
    setLoading(true);

    try {
      const { data } = await axios().post(`forgot-password`, { email });
      e?.target.reset();
      SetSuccessSnackbar(data.message);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error: any) {
      const message = error?.response?.data?.error
        ? error.response.data.error
        : error.message;
      SetErrorSnackbar(message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <CircularLoader />;
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
        </Grid>
      </Grid>
    </StyledAuthFormWrapper>
  );
}

export default ForgotPassword;
