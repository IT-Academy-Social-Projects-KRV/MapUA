import React, { useState, MouseEvent, useEffect } from 'react';
import axios from 'services/axios';
import { useNavigate } from 'react-router-dom';
import { selectIsUserAuthorizedError } from 'redux/memoizedSelectors/isUserAuthorizedSelectors';
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
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { useTranslation } from 'react-i18next';
import { RegistrationFormSchema } from 'utils/validation';
import { StyledPaperForm } from '../../components/design/StyledPaperForm';
import { StyledAuthFormWrapper } from '../../components/design/StyledAuthFormWrapper';
import { useTypedDispatch } from '../../redux/hooks/useTypedDispatch';

type SignUp = {
  displayName: string;
  email: string;
  password: string;
};
function Registration() {
  const { SetErrorSnackbar, SetSuccessSnackbar } = useTypedDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const { t } = useTranslation();

  const { handleSubmit, control } = useForm<SignUp>({
    mode: 'onBlur',
    resolver: yupResolver(RegistrationFormSchema)
  });

  const { errors } = useFormState({
    control
  });

  const onSubmit: SubmitHandler<SignUp> = async data => {
    try {
      const response = await axios().post(`signup`, data);
      if (response.status === 200) {
        SetSuccessSnackbar(`${t('registration.registrationSuccess')}`);
        setTimeout(() => navigate('/login'), 2000);
      }
    } catch (e: any) {
      SetErrorSnackbar(
        e.response.data?.info.message || `${t('registration.registrationFail')}`
      );
    }
  };

  const error = useTypedSelector(selectIsUserAuthorizedError);

  useEffect(() => {
    if (error && typeof error === 'string') {
      SetErrorSnackbar(error);
    }
  }, [error]);

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
                <Controller
                  control={control}
                  name="displayName"
                  render={({ field }) => (
                    <TextField
                      placeholder={t('common.enterYourDisplayName')}
                      label="Name"
                      fullWidth
                      onChange={e => field.onChange(e)}
                      onBlur={field.onBlur}
                      defaultValue={field.value}
                      error={!!errors.displayName?.message}
                      helperText={t(
                        !errors.displayName
                          ? ''
                          : String(errors.displayName.message)
                      )}
                    />
                  )}
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
