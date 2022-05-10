import {
  FormControl,
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert
} from '@mui/material';
import {
  BorderForm,
  RegistrationFormWrapper,
  WrapButtonAndText
} from 'components/Registration/styles';
import { WrapH1 } from 'components/ForgotPassword/styles';
import React, { useState } from 'react';
import {
  useForm,
  Controller,
  SubmitHandler,
  useFormState
} from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { emailValidation, passwordValidation } from 'utils/validation';

type SignUp = {
  email: string;
  password: string;
};

function Registration() {
  const navigate = useNavigate();
  const [visibleSucces, setVisibleSucces] = useState(false);
  const [visibleError, setVisibleError] = useState(false);
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
        setVisibleSucces(true);
        setTimeout(() => navigate('/login'), 1500);
      }
    } catch (e: any) {
      setVisibleError(true);
      setTimeout(() => setVisibleError(false), 3000);
    }
  };
  const { errors } = useFormState({
    control
  });
  return (
    <RegistrationFormWrapper>
      <BorderForm>
        <FormControl sx={{ width: '35ch' }}>
          <WrapH1>
            <Typography sx={{ fontSize: '24px' }}> Create profile</Typography>
          </WrapH1>
          <Snackbar open={visibleSucces}>
            <Alert
              variant="filled"
              severity="success"
              sx={{ width: '100%', mb: '2rem', textAlign: 'center' }}
            >
              Registration successful!
            </Alert>
          </Snackbar>
          <Snackbar open={visibleError}>
            <Alert
              variant="filled"
              severity="error"
              sx={{ width: '100%', mb: '2rem', textAlign: 'center' }}
            >
              This email is already exists!
            </Alert>
          </Snackbar>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ mt: '20px' }}>
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
            </Box>
            <Box sx={{ mt: '20px' }}>
              <Controller
                control={control}
                name="password"
                rules={passwordValidation}
                render={({ field }) => (
                  <TextField
                    placeholder="Please enter your password"
                    label="Password"
                    autoComplete="current-password"
                    fullWidth
                    onChange={e => field.onChange(e)}
                    onBlur={field.onBlur}
                    defaultValue={field.value}
                    type="password"
                    error={!!errors.password?.message}
                    helperText={errors.password?.message}
                  />
                )}
              />
            </Box>
            <WrapButtonAndText>
              <Button variant="contained" type="submit">
                Create
              </Button>
            </WrapButtonAndText>
          </form>
        </FormControl>
      </BorderForm>
    </RegistrationFormWrapper>
  );
}

export default Registration;
