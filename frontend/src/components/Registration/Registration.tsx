import React, { useState, MouseEvent, SyntheticEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import {
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
  InputAdornment,
  IconButton,
  Grid,
  Stack
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  useForm,
  Controller,
  SubmitHandler,
  useFormState
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { emailValidation, passwordValidation } from 'utils/validation';
import axios from 'services/axios';
import { PaperForm } from '../design/PaperForm';
import { AuthFormWrapper } from '../design/AuthFormWrapper';

type SignUp = {
  email: string;
  password: string;
};

function Registration() {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [visibleSucces, setVisibleSuccess] = useState(false);
  const [notification, setNotification] = useState<string | {} | null>(null);
  const { handleSubmit, control } = useForm<SignUp>({
    mode: 'onBlur'
  });
  const onSubmit: SubmitHandler<SignUp> = async data => {
    try {
      const response = await axios.post(`signup`, data);
      if (response.status === 200) {
        setVisibleSuccess(true);
        setTimeout(() => setVisibleSuccess(false), 3000);
        setTimeout(() => navigate('/login'), 2000);
      }
    } catch (e: any) {
      setNotification(
        e.response.data?.info.message || `${t('registration.regisrationFail')}`
      );
    }
  };
  const { error } = useTypedSelector(state => state.user);
  useEffect(() => {
    if (error) {
      setNotification(error);
    }
  }, [error]);
  const handleCloseNotification = (
    e?: SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setVisibleSuccess(false);
    setNotification(null);
  };
  const { errors } = useFormState({
    control
  });
  const handleMouseDownPassword = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <AuthFormWrapper>
      <Grid container justifyContent="center">
        <Grid item md={4}>
          <PaperForm>
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4}>
                <Typography align="center" variant="h4">
                  {t('registration.createProfile')}
                </Typography>
                <Snackbar
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  sx={{ zIndex: 10000 }}
                  open={!!notification}
                  autoHideDuration={3000}
                  onClose={handleCloseNotification}
                >
                  <Alert
                    onClose={handleCloseNotification}
                    severity="error"
                    sx={{ mt: '1vh' }}
                  >
                    {notification}
                  </Alert>
                </Snackbar>
                <Snackbar
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  sx={{ zIndex: 10000 }}
                  open={!!visibleSucces}
                  onClose={handleCloseNotification}
                >
                  <Alert
                    onClose={handleCloseNotification}
                    severity="success"
                    sx={{ mt: '1vh' }}
                  >
                    {t('registration.regisrationSuccess')}
                  </Alert>
                </Snackbar>
                <Controller
                  control={control}
                  name="email"
                  rules={emailValidation}
                  render={({ field }) => (
                    <TextField
                      placeholder={t('common.enterYourEmail')}
                      label="Email"
                      autoComplete="current-email"
                      fullWidth
                      onChange={e => field.onChange(e)}
                      onBlur={field.onBlur}
                      defaultValue={field.value}
                      type="text"
                      error={!!errors.email?.message}
                      helperText={errors.email?.message}
                    />
                  )}
                />
                <Box sx={{ my: 4 }}>
                  <Controller
                    control={control}
                    name="password"
                    rules={passwordValidation}
                    render={({ field }) => (
                      <TextField
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                        type={showPassword ? 'text' : 'password'}
                        placeholder={t('common.enterPassword')}
                        label={t('common.password')}
                        autoComplete="current-password"
                        fullWidth
                        onChange={e => field.onChange(e)}
                        onBlur={field.onBlur}
                        defaultValue={field.value}
                        error={!!errors.password?.message}
                        helperText={errors.password?.message}
                      />
                    )}
                  />
                </Box>
                <Button fullWidth variant="contained" type="submit">
                  {t('registration.create')}
                </Button>
              </Stack>
            </Box>
          </PaperForm>
        </Grid>
      </Grid>
    </AuthFormWrapper>
  );
}

export default Registration;
