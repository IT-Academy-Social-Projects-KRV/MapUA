import React from 'react';
import {
  FormControl,
  TextField,
  Button,
  Typography,
  Box,
  Link
} from '@mui/material';
import {
  BorderForm,
  RegistrationFormWrapper,
  StyledSpan,
  StyledSpanEnd
} from 'components/Login/styles';
import { WrapButtonAndText, WrapH1 } from 'components/ForgotPassword/styles';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { emailValidation, passwordValidation } from 'utils/validation';
import {
  useForm,
  Controller,
  SubmitHandler,
  useFormState
} from 'react-hook-form';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

type SignIn = {
  email: string;
  password: string;
};

function Login() {
  const { login } = useTypedDispatch();
  const { handleSubmit, control } = useForm<SignIn>({
    mode: 'onBlur'
  });

  const { isLogged } = useTypedSelector(state => state.userLogin);
  const navigate = useNavigate();
  if (isLogged === true) {
    navigate('/');
  }

  const onSubmit: SubmitHandler<SignIn> = async ({ email, password }) => {
    login(email, password);
  };
  const { errors } = useFormState({
    control
  });

  return (
    <RegistrationFormWrapper>
      <BorderForm>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl sx={{ width: '35ch' }}>
            <WrapH1>
              <Typography sx={{ fontSize: '24px' }}>Login</Typography>
            </WrapH1>

            <Box sx={{ mt: 4 }}>
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

            <Box sx={{ mt: 4 }}>
              <Controller
                control={control}
                name="password"
                rules={passwordValidation}
                render={({ field }) => (
                  <TextField
                    placeholder="Please enter your password"
                    label="Password"
                    type="password"
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

            <StyledSpanEnd>
              <Link
                color="inherit"
                underline="none"
                component={RouterLink}
                to="/forgot-password"
              >
                Forgot the password?
              </Link>
            </StyledSpanEnd>

            <WrapButtonAndText>
              <Button variant="contained" type="submit">
                Login
              </Button>
              <StyledSpan>
                <span>or</span>
              </StyledSpan>
              <Button variant="contained">Sing in with google</Button>

              <StyledSpan>
                <Button variant="contained">
                  <Link
                    component={RouterLink}
                    to="/registration"
                    color="inherit"
                    underline="none"
                  >
                    Sign up
                  </Link>
                </Button>
              </StyledSpan>
            </WrapButtonAndText>
          </FormControl>
        </form>
      </BorderForm>
    </RegistrationFormWrapper>
  );
}

export default Login;
