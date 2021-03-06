import React, { useEffect, useState, MouseEvent } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import {
  selectIsUserAuthorized,
  selectIsUserAuthorizedError,
  selectIsUserAuthorizedLoading
} from 'redux/memoizedSelectors/isUserAuthorizedSelectors';
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
import { LoginFormSchema } from 'utils/validation';
import { StyledPaperForm } from '../../components/design/StyledPaperForm';
import { StyledAuthFormWrapper } from '../../components/design/StyledAuthFormWrapper';
import CircularLoader from '../../components/CircularLoader/CircularLoader';

type SignIn = {
  email: string;
  password: string;
};

function Login() {
  const { SetErrorSnackbar } = useTypedDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { login, loginOAuth } = useTypedDispatch();

  const { handleSubmit, control } = useForm<SignIn>({
    mode: 'onBlur',
    resolver: yupResolver(LoginFormSchema)
  });

  const { errors } = useFormState({
    control
  });

  const { t } = useTranslation();

  const isAuthorized = useTypedSelector(selectIsUserAuthorized);
  const error = useTypedSelector(selectIsUserAuthorizedError);
  const loading = useTypedSelector(selectIsUserAuthorizedLoading);

  useEffect(() => {
    if (error && typeof error === 'string') {
      SetErrorSnackbar(error);
    }
  }, [error]);

  useEffect(() => {
    if (isAuthorized) {
      navigate('/');
    }
  }, [isAuthorized]);

  useEffect(() => {
    if (location.search.includes('oauth=1')) {
      const accessToken = Cookies.get('accessToken') || '';
      loginOAuth(accessToken);
    }
  }, []);

  const onSubmit: SubmitHandler<SignIn> = async ({ email, password }) => {
    login(email.toLowerCase(), password, t('login.youLoggedInSuccessfully'));
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

  if (loading) {
    return <CircularLoader />;
  }

  return (
    <StyledAuthFormWrapper>
      <Grid container justifyContent="center">
        <Grid item md={4}>
          <StyledPaperForm>
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4}>
                <Typography align="center" variant="h4">
                  {t('common.login')}
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
                    sx={{ width: '100%' }}
                  >
                    {t('login.signup')}
                  </Link>
                </Button>
              </Stack>
            </Box>
          </StyledPaperForm>
        </Grid>
      </Grid>
    </StyledAuthFormWrapper>
  );
}

export default Login;
