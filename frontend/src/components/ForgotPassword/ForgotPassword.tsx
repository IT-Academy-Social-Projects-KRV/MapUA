import React from 'react';
import { FormControl, TextField, Button, Typography, Box } from '@mui/material';

import {
  WrapH1,
  BorderForm,
  RegistrationFormWrapper,
  StyledSpan,
  WrapButtonAndText
} from './styles';

function ForgotPassword() {
  return (
    <RegistrationFormWrapper>
      <BorderForm>
        <FormControl sx={{ width: '35ch' }}>
          <WrapH1>
            <Typography sx={{ fontSize: '24px' }}>Forgot password?</Typography>
          </WrapH1>

          <Box sx={{ mt: '20px' }}>
            <TextField
              placeholder="Please enter your email"
              label="Email"
              autoComplete="current-email"
              fullWidth
            />
          </Box>

          <WrapButtonAndText>
            <Button variant="contained">sent password</Button>

            <StyledSpan>
              <span>I remember password</span>
            </StyledSpan>
          </WrapButtonAndText>
        </FormControl>
      </BorderForm>
    </RegistrationFormWrapper>
  );
}

export default ForgotPassword;
