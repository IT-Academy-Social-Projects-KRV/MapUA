import React from 'react';
import { FormControl, TextField, Button } from '@mui/material';
import {
  BorderForm,
  RegistrationFormWrapper,
  StyledSpan,
  StyledSpanEnd
} from 'components/Login/styles';
import {
  TextFieldWrap,
  WrapButtonAndText,
  WrapH1
} from 'components/ForgotPassword/styles';

function Login() {
  return (
    <RegistrationFormWrapper>
      <BorderForm>
        <FormControl sx={{ width: '35ch' }}>
          <WrapH1>
            <h1>Login</h1>
          </WrapH1>
          <TextFieldWrap>
            <TextField
              placeholder="Please enter your email"
              label="Email"
              autoComplete="current-email"
            />
          </TextFieldWrap>

          <TextFieldWrap>
            <TextField
              placeholder="Please enter your email"
              label="Password"
              type="password"
              autoComplete="current-password"
            />
          </TextFieldWrap>

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
