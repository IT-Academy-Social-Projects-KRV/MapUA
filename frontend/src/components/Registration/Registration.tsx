import React from 'react';
import { FormControl, TextField, Button } from '@mui/material';
import {
  BorderForm,
  RegistrationFormWrapper
} from 'components/Registration/styles';

function Registration() {
  return (
    <RegistrationFormWrapper>
      <BorderForm>
        <FormControl sx={{ width: '25ch' }}>
          <h1 style={{ textAlign: 'center' }}>Registration</h1>
          <TextField
            placeholder="Please enter your email"
            label="Email"
            autoComplete="current-email"
          />
          <TextField
            placeholder="Please enter your email"
            label="Password"
            type="password"
            autoComplete="current-password"
          />
          <div style={{ display: 'flex' }}>
            <Button variant="contained" style={{ width: '50%' }}>
              Contained
            </Button>
            <span>Return to login</span>
          </div>
        </FormControl>
      </BorderForm>
    </RegistrationFormWrapper>
  );
}

export default Registration;
