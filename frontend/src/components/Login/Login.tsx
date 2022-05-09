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
import { Link as RouterLink } from 'react-router-dom';

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
              placeholder="Please enter your password"
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
      </BorderForm>
    </RegistrationFormWrapper>
  );
}

export default Login;
