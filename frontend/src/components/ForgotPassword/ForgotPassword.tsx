import React, { useState, FormEvent, SyntheticEvent } from 'react';
import axios from 'axios';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
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

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ForgotPassword() {
  const [data, setData] = useState('');
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (data.includes('@')) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const handleClose = (e?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const sendEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setData('');
    console.log(data);
    if (!data) return;

    const res = await axios
      .post(`${REACT_APP_API_URI}forgot-password`, { email: data })
      .then(res => console.log(res))
      .catch(error => console.log(error));
  };

  return (
    <RegistrationFormWrapper>
      <form onSubmit={e => sendEmail(e)}>
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
                value={data}
                placeholder="Please enter your email"
                label="Email"
                autoComplete="current-email"
                fullWidth
                onChange={e => setData(e.target.value)}
              />
            </Box>
            <WrapButtonAndText>
              <Button onClick={handleClick} type="submit" variant="contained">
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
          >
            <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
              A new password has been sent to your email !
            </Alert>
          </Snackbar>
        </Stack>
      </form>
    </RegistrationFormWrapper>
  );
}

export default ForgotPassword;
