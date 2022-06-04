import React, { useState, MouseEvent, SyntheticEvent, useEffect } from 'react';
import axios from 'services/axios';
import { useNavigate } from 'react-router-dom';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  TextField,
  Button,
  Typography,
  Box,
  InputAdornment,
  IconButton,
  Grid,
  Stack
} from '@mui/material';
import {
  useForm,
  Controller,
  SubmitHandler,
  useFormState
} from 'react-hook-form';
import ExtendSnackbar from 'components/ExtendSnackbar/ExtendSnackbar';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { useTranslation } from 'react-i18next';
import { AuthFormSchema } from 'utils/validation';
import { StyledPaperForm } from '../design/StyledPaperForm';
import { StyledAuthFormWrapper } from '../design/StyledAuthFormWrapper';

type SignUp = {
  email: string;
  password: string;
};
function Registration() {
  const [showPassword, setShowPassword] = useState(false);
  const [visibleSucces, setVisibleSuccess] = useState(false);

  const navigate = useNavigate();

  const { t } = useTranslation();

  const [notification, setNotification] = useState<string | {} | null>(null);
  const { handleSubmit, control } = useForm<SignUp>({
    mode: 'onBlur',
    resolver: yupResolver(AuthFormSchema)
  });

  const { errors } = useFormState({
    control
  });

  const onSubmit: SubmitHandler<SignUp> = async data => {
    try {
      const response = await axios().post(`signup`, data);
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

  const { error } = useTypedSelector(state => state.isUserAuthorized);
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

  const handleMouseDownPassword = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <StyledAuthFormWrapper>
      <Grid container justifyContent="center">
        <Grid item md={4}>
          <StyledPaperForm>
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4}>
                <Typography align="center" variant="h4">
                  {t('registration.createProfile')}
                </Typography>
                <ExtendSnackbar
                  open={!!notification}
                  notification={notification}
                  onClose={handleCloseNotification}
                />
                <ExtendSnackbar
                  open={!!visibleSucces}
                  notification={t('registration.regisrationSuccess')}
                  onClose={handleCloseNotification}
                  severity="success"
                />
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

                <Box sx={{ my: 4 }}>
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
                        type={showPassword ? 'text' : 'password'}
                        placeholder={t('common.enterPassword')}
                        label={t('common.password')}
                        autoComplete="current-password"
                        fullWidth
                        onChange={e => field.onChange(e)}
                        onBlur={field.onBlur}
                        defaultValue={field.value}
                        error={!!errors.password?.message}
                        helperText={t(
                          !errors.password
                            ? ''
                            : String(errors.password.message)
                        )}
                      />
                    )}
                  />
                </Box>
                <Button fullWidth variant="contained" type="submit">
                  {t('registration.create')}
                </Button>
              </Stack>
            </Box>
          </StyledPaperForm>
        </Grid>
      </Grid>
    </StyledAuthFormWrapper>
  );
}
export default Registration;
