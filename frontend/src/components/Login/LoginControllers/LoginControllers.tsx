import { IconButton, InputAdornment, TextField } from '@mui/material';
import React, { FC, MouseEventHandler } from 'react';
import { Controller, useForm, useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { emailValidation, passwordValidation } from 'utils/validation';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

type SignIn = {
  email: string;
  password: string;
};

type Props = {
  handleClickShowPassword: MouseEventHandler<HTMLButtonElement>;
  handleMouseDownPassword: MouseEventHandler<HTMLButtonElement>;
  showPassword: boolean;
};

export const LoginControllers: FC<Props> = ({
  handleClickShowPassword,
  handleMouseDownPassword,
  showPassword
}) => {
  const { t } = useTranslation();

  const { control } = useForm<SignIn>({
    mode: 'onBlur'
  });

  const { errors } = useFormState({
    control
  });

  return (
    <>
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
                    {showPassword ? <VisibilityOff /> : <Visibility />}
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
            helperText={errors.password?.message}
          />
        )}
      />
    </>
  );
};
