import React from 'react';
import { FormControl, TextField, Button, Typography, Box } from '@mui/material';
import {
  BorderForm,
  RegistrationFormWrapper,
  StyledSpan,
  WrapButtonAndText
} from 'components/Registration/styles';
import { WrapH1 } from 'components/ForgotPassword/styles';

function Registration() {
  return (
    <RegistrationFormWrapper>
      <BorderForm>
        <FormControl sx={{ width: '35ch' }}>
          <WrapH1>
            <Typography sx={{ fontSize: '24px' }}> Create profile</Typography>
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

          <WrapButtonAndText>
            <Button variant="contained">Create</Button>
            <StyledSpan>
              <span>Return to login</span>
            </StyledSpan>
          </WrapButtonAndText>
        </FormControl>
      </BorderForm>
    </RegistrationFormWrapper>
  );
}

export default Registration;
