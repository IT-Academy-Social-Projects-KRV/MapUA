import React from 'react';
import { FormControl, TextField, Button, Typography, Box } from '@mui/material';
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

type SignIn = {
  email: string;
  password: string;
};

function Login() {
  const { login } = useTypedDispatch();
  const { handleSubmit, control } = useForm<SignIn>({
    mode: 'onBlur'
  });

  const onSubmit: SubmitHandler<SignIn> = async ({ email, password }) => {
    login(email, password);
  };
  const { errors } = useFormState({
    control
  });

  return (
    <RegistrationFormWrapper>
      <BorderForm>
        <FormControl sx={{ width: '35ch' }}>
          <WrapH1>
            <Typography sx={{ fontSize: '24px' }}>Login</Typography>
          </WrapH1>
          <form onSubmit={handleSubmit(onSubmit)}>
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
              <span>Forgot the password?</span>
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
                <span>don`t have an account</span>
              </StyledSpan>
            </WrapButtonAndText>
          </form>
        </FormControl>
      </BorderForm>
    </RegistrationFormWrapper>
  );
}

export default Login;
