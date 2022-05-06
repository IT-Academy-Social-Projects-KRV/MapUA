import React, { useState, FormEvent, SyntheticEvent } from 'react';
import axios from 'axios';
import {
  FormControl,
  TextField,
  Button,
  Typography,
  Box,
  Stack,
  Snackbar
} from '@mui/material';

import {
  WrapH1,
  BorderForm,
  RegistrationFormWrapper,
  StyledSpan,
  WrapButtonAndText
} from './styles';

const { REACT_APP_API_URI } = process.env;

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(false);

  const handleClose = (e?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const sendEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${REACT_APP_API_URI}forgot-password`, {
        email
      });
      setEmail('');
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <RegistrationFormWrapper>
      <form onSubmit={sendEmail}>
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
                required
                value={email}
                placeholder="Please enter your email"
                label="Email"
                autoComplete="current-email"
                fullWidth
                onChange={e => setEmail(e.target.value)}
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
        <Stack spacing={5} sx={{ width: '100%' }}>
          <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            open={open}
            autoHideDuration={5000}
            onClose={handleClose}
          />
        </Stack>
      </form>
    </RegistrationFormWrapper>
  );
}

export default ForgotPassword;
