import React, { SyntheticEvent, useState } from 'react';
import { FormControl, TextField, Button, Typography, Box } from '@mui/material';
import {
  BorderForm,
  RegistrationFormWrapper,
  StyledSpan,
  StyledSpanEnd
} from 'components/Login/styles';
import { WrapButtonAndText, WrapH1 } from 'components/ForgotPassword/styles';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';

function Login() {
  const { login } = useTypedDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form onSubmit={submitHandler}>
      <RegistrationFormWrapper>
        <BorderForm>
          <FormControl sx={{ width: '35ch' }} onSubmit={submitHandler}>
            <WrapH1>
              <Typography sx={{ fontSize: '24px' }}>Login</Typography>
            </WrapH1>

            <Box sx={{ mt: '20px' }}>
              <TextField
                placeholder="Please enter your email"
                label="Email"
                autoComplete="current-email"
                fullWidth
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Box>

            <Box sx={{ mt: '20px' }}>
              <TextField
                placeholder="Please enter your password"
                label="Password"
                type="password"
                autoComplete="current-password"
                fullWidth
                value={password}
                onChange={e => setPassword(e.target.value)}
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
          </FormControl>
        </BorderForm>
      </RegistrationFormWrapper>
    </form>
  );
}

export default Login;
