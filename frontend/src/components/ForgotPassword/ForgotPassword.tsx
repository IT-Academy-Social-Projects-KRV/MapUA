import React from 'react';
import type { FormEvent } from 'react';
import { FormControl, TextField, Button, Typography, Box } from '@mui/material';

import {
  WrapH1,
  BorderForm,
  RegistrationFormWrapper,
  StyledSpan,
  WrapButtonAndText
} from './styles';

function ForgotPassword() {
  const sendFormData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email } = e.target as typeof e.target & {
      email: { value: string };
    };

    // this is a test address
    // after I make MAP-77 the data will go to the backend
    console.log(email.value);

    await fetch('/reset-password', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        email: email.value
      })
    });
  };

  return (
    <RegistrationFormWrapper>
      <form onSubmit={e => sendFormData(e)}>
        <BorderForm>
          <FormControl sx={{ width: '35ch' }}>
            <WrapH1>
              <Typography sx={{ fontSize: '24px' }}>
                Forgot password?
              </Typography>
            </WrapH1>

            <Box sx={{ mt: '20px' }}>
              <TextField
                type="email"
                id="email"
                placeholder="Please enter your email"
                label="Email"
                autoComplete="current-email"
                fullWidth
              />
            </Box>
            <WrapButtonAndText>
              <Button type="submit" variant="contained">
                sent password
              </Button>
              <StyledSpan>
                <span>I remember password</span>
              </StyledSpan>
            </WrapButtonAndText>
          </FormControl>
        </BorderForm>
      </form>
    </RegistrationFormWrapper>
  );
}

export default ForgotPassword;
