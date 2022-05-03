import React from 'react';
import { FormControl, TextField, Button, Typography, Box } from '@mui/material';
import {
  BorderForm,
  RegistrationFormWrapper,
  StyledSpan,
  StyledSpanEnd
} from 'components/Login/styles';
import { WrapButtonAndText, WrapH1 } from 'components/ForgotPassword/styles';

function Login() {
  return (
    <RegistrationFormWrapper>
      <BorderForm>
        <FormControl sx={{ width: '35ch' }}>
          <WrapH1>
            <Typography sx={{ fontSize: '24px' }}>Login</Typography>
          </WrapH1>

          <Box sx={{ mt: '20px' }}>
            <TextField
              placeholder="Please enter your email"
              label="Email"
              autoComplete="current-email"
              fullWidth
            />
          </Box>

          <Box sx={{ mt: '20px' }}>
            <TextField
              placeholder="Please enter your email"
              label="Password"
              type="password"
              autoComplete="current-password"
              fullWidth
            />
          </Box>

          <StyledSpanEnd>
            <span>Forgot the password?</span>
          </StyledSpanEnd>

          <WrapButtonAndText>
            <Button variant="contained">Login</Button>
            <StyledSpan>
              <span>or</span>
            </StyledSpan>
            <Button variant="contained">Sing in with google</Button>

            <StyledSpan>
              <span>don`t have an account</span>
            </StyledSpan>
          </WrapButtonAndText>
        </FormControl>
      </BorderForm>
    </RegistrationFormWrapper>
  );
}

export default Login;
