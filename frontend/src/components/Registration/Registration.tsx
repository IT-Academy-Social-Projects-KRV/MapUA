import { FormControl, TextField, Button, Typography, Box } from '@mui/material';
import {
  BorderForm,
  RegistrationFormWrapper,
  WrapButtonAndText
} from 'components/Registration/styles';
import { WrapH1 } from 'components/ForgotPassword/styles';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Registration() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState("Email can't be empty");
  const [passwordError, setPasswordError] = useState("Password can't be empty");
  const [formValid, setFormValid] = useState(false);
  const [errorReq, setErrorReq] = useState('');
  const [succesReq, setSuccesReq] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (emailError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, passwordError]);

  const registration = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/signup', {
        email,
        password
      });
      if (response.status === 200) {
        setSuccesReq('Registration successful');
        setTimeout(() => navigate('/login'), 3000);
      }
    } catch (e: any) {
      setErrorReq('This email is already exists');
      setTimeout(() => setErrorReq(''), 3000);
    }
  };

  const emailHandler = (e: any) => {
    setEmail(e.target.value);
    const re =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError('Incorrect email');
    } else {
      setEmailError('');
    }
  };
  const passwordHandler = (e: any) => {
    setPassword(e.target.value);
    if (e.target.value.length < 2 || e.target.value.length > 10) {
      setPasswordError('Password should more 2 and less then 10 symbols');
      if (!e.target.value) {
        setPasswordError("Password can't be empty");
      }
    } else {
      setPasswordError('');
    }
  };

  const blurHandler = (e: any) => {
    if (e.target.name === 'email') {
      setEmailDirty(true);
    }
    if (e.target.name === 'password') {
      setPasswordDirty(true);
    }
  };
  return (
    <RegistrationFormWrapper>
      <BorderForm>
        <FormControl sx={{ width: '35ch' }}>
          <WrapH1>
            <Typography sx={{ fontSize: '24px' }}> Create profile</Typography>
          </WrapH1>
          {errorReq && (
            <Box
              style={{
                color: 'red',
                marginBottom: '10px'
              }}
            >
              {errorReq}
            </Box>
          )}
          {succesReq && (
            <Box
              style={{
                color: 'green',
                marginBottom: '10px'
              }}
            >
              {succesReq}
            </Box>
          )}
          <Box sx={{ mt: '20px' }}>
            {emailDirty && emailError && (
              <Box
                style={{
                  color: 'red',
                  marginBottom: '10px',
                  marginTop: '10px'
                }}
              >
                {emailError}
              </Box>
            )}
            <TextField
              value={email}
              placeholder="Please enter your email"
              label="Email"
              autoComplete="current-email"
              fullWidth
              onChange={e => emailHandler(e)}
              onBlur={e => blurHandler(e)}
              type="text"
              name="email"
            />
          </Box>

          <Box sx={{ mt: '20px' }}>
            {passwordDirty && passwordError && (
              <Box
                style={{
                  color: 'red',
                  marginBottom: '10px'
                }}
              >
                {passwordError}
              </Box>
            )}
            <TextField
              value={password}
              placeholder="Please enter your password"
              label="Password"
              type="password"
              autoComplete="current-password"
              fullWidth
              onChange={e => passwordHandler(e)}
              onBlur={e => blurHandler(e)}
              name="password"
            />
          </Box>

          <WrapButtonAndText>
            <Button
              variant="contained"
              disabled={!formValid}
              onClick={registration}
              type="submit"
            >
              Create
            </Button>
          </WrapButtonAndText>
        </FormControl>
      </BorderForm>
    </RegistrationFormWrapper>
  );
}

export default Registration;
