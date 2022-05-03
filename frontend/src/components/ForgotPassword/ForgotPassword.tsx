import React from 'react';
import { FormControl, TextField, Button } from '@mui/material';

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
            <h1>Forgot password?</h1>
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
