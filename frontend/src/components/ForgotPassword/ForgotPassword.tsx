import React from 'react';
import { FormControl, TextField, Button, Typography } from '@mui/material';

import {
  TextFieldWrap,
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
            <Typography>Forgot password?</Typography>
          </WrapH1>

          <TextFieldWrap>
            <TextField
              placeholder="Please enter your email"
              label="Email"
              autoComplete="current-email"
            />
          </TextFieldWrap>

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
