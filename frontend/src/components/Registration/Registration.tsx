import React, { useState, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
import { emailValidation, passwordValidation } from 'utils/validation';
import { PaperForm, AuthFormWrapper } from '../../theme';

type SignUp = {
  email: string;
  password: string;
};

function Registration() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [visibleSucces, setVisibleSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { handleSubmit, control } = useForm<SignUp>({
    mode: 'onBlur'
  });
  const onSubmit: SubmitHandler<SignUp> = async data => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URI}signup`,
        data
      );
      if (response.status === 200) {
        setVisibleSuccess(true);
        setTimeout(() => navigate('/login'), 1500);
      }
    } catch (e: any) {
      setTimeout(() => setErrorMessage(''), 3000);
      setErrorMessage(e.response.data?.error || 'Something went wrong');
    }
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
                  Create profile
                </Typography>
                <Snackbar
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  open={visibleSucces}
                >
                  <Alert severity="success">Registration successful!</Alert>
                </Snackbar>
                <Snackbar
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  open={!!errorMessage}
                >
                  <Alert severity="error">{errorMessage}</Alert>
                </Snackbar>
                <Controller
                  control={control}
                  name="email"
                  rules={emailValidation}
                  render={({ field }) => (
                    <TextField
                      placeholder="Please enter your email"
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
                        placeholder="Please enter your password"
                        label="Password"
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
                  Create
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
