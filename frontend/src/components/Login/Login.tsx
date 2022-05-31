/* eslint-disable no-unused-vars */
import React, { useEffect, useState, MouseEvent, SyntheticEvent } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { useForm, SubmitHandler, useFormState } from 'react-hook-form';
import {
  Box,
  Snackbar,
  Alert,
  Divider,
  Button,
  Typography,
  Link,
  Grid,
  Stack
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PaperForm } from '../design/PaperForm';
import { AuthFormWrapper } from '../design/AuthFormWrapper';
import { LoginControllers } from './LoginControllers/LoginControllers';

type SignIn = {
  email: string;
  password: string;
};

function Login() {
  const location = useLocation();
  const { login, loginOAuth } = useTypedDispatch();
  const { handleSubmit, control } = useForm<SignIn>({
    mode: 'onBlur'
  });
  const [showPassword, setShowPassword] = useState(false);

  const { t } = useTranslation();

  const { isAuthorized, error } = useTypedSelector(state => state.userAuth);
  const [notification, setNotification] = useState<string | {} | null>(null);
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

  const navigate = useNavigate();

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
    login(email, password);
  };

  const { errors } = useFormState({
    control
  });

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
                <LoginControllers
                  handleClickShowPassword={handleClickShowPassword}
                  handleMouseDownPassword={handleMouseDownPassword}
                  showPassword={showPassword}
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
