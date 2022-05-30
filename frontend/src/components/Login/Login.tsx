import React, { useEffect, useState, MouseEvent, SyntheticEvent } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import {
  useForm,
  Controller,
  SubmitHandler,
  useFormState
} from 'react-hook-form';
import {
  Box,
  Snackbar,
  Alert,
  Divider,
  TextField,
  Button,
  Typography,
  Link,
  InputAdornment,
  IconButton,
  Grid,
  Stack
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useTranslation } from 'react-i18next';
import { AuthFormSchema } from 'utils/validation';
import { PaperForm } from '../design/PaperForm';
import { AuthFormWrapper } from '../design/AuthFormWrapper';

type SignIn = {
  email: string;
  password: string;
};

function Login() {
  const [notification, setNotification] = useState<string | {} | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { login, loginOAuth } = useTypedDispatch();
  const { isAuthorized, error } = useTypedSelector(state => state.userAuth);

  const { handleSubmit, control } = useForm<SignIn>({
    mode: 'onBlur',
    resolver: yupResolver(AuthFormSchema)
  });

  const { errors } = useFormState({
    control
  });

  const { t } = useTranslation();

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
    setNotification(null);
  };

  useEffect(() => {
    if (isAuthorized) {
      navigate('/');
    }
  }, [isAuthorized]);

  useEffect(() => {
    if (location.search.includes('oauth=1')) {
      const accessToken = Cookies.get('accessToken') || '';
      const userId = Cookies.get('userId') || '';
      loginOAuth(accessToken, userId);
    }
  }, []);

  const onSubmit: SubmitHandler<SignIn> = async ({ email, password }) => {
    login(email.toLowerCase(), password);
  };

  const handleOAuth = (type: 'google' | 'facebook') => {
    if (type === 'google') {
      window.open(`${process.env.REACT_APP_API_URI}signin-google`, '_self');
    } else if (type === 'facebook') {
      window.open(`${process.env.REACT_APP_API_URI}signin-fb`, '_self');
    }
  };

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
                  {t('common.login')}
                </Typography>

                <Snackbar
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  open={!!notification}
                  autoHideDuration={3000}
                  onClose={handleCloseNotification}
                >
                  <Alert onClose={handleCloseNotification} severity="error">
                    {notification}
                  </Alert>
                </Snackbar>

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
                      type="email"
                      error={!!errors.email?.message}
                      helperText={t(
                        !errors.email ? '' : String(errors.email.message)
                      )}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="password"
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
                      placeholder={t('common.enterPassword')}
                      label={t('common.password')}
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      fullWidth
                      onChange={e => field.onChange(e)}
                      onBlur={field.onBlur}
                      defaultValue={field.value}
                      error={!!errors.password?.message}
                      helperText={t(
                        !errors.password ? '' : String(errors.password.message)
                      )}
                    />
                  )}
                />

                <Typography sx={{ my: 4 }} align="right">
                  <Link
                    underline="none"
                    component={RouterLink}
                    to="/forgot-password"
                  >
                    {t('common.forgotPassword')}
                  </Link>
                </Typography>
                <Button variant="contained" type="submit">
                  {t('common.login')}
                </Button>
                <Divider> {t('login.or')}</Divider>
                <Button
                  variant="contained"
                  onClick={() => handleOAuth('google')}
                >
                  {t('login.signInWithGoogle')}
                </Button>
                <Button
                  variant="contained"
                  onClick={() => handleOAuth('facebook')}
                >
                  {t('login.signInWithFacebook')}
                </Button>
                <Button variant="contained">
                  <Link
                    component={RouterLink}
                    to="/registration"
                    color="inherit"
                    underline="none"
                  >
                    {t('login.signup')}
                  </Link>
                </Button>
              </Stack>
            </Box>
          </PaperForm>
        </Grid>
      </Grid>
    </AuthFormWrapper>
  );
}

export default Login;
