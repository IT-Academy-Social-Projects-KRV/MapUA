import React from 'react';
import { FormControl, TextField, Button, Typography } from '@mui/material';
import {
  BorderForm,
  RegistrationFormWrapper,
  StyledSpan,
  WrapButtonAndText
} from 'components/Registration/styles';
import { TextFieldWrap, WrapH1 } from 'components/ForgotPassword/styles';

function Registration() {
  return (
    <RegistrationFormWrapper>
      <BorderForm>
        <FormControl sx={{ width: '35ch' }}>
          <WrapH1>
            <Typography> Create profile</Typography>
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
