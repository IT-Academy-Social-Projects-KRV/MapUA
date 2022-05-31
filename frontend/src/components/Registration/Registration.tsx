import React, { useState, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
  Grid,
  Stack
} from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { PaperForm } from '../design/PaperForm';
import { AuthFormWrapper } from '../design/AuthFormWrapper';
import { Controllers } from './Controllers/Controllers';

type SignUp = {
  email: string;
  password: string;
};

function Registration() {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [visibleSucces, setVisibleSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { handleSubmit } = useForm<SignUp>({
    mode: 'onBlur'
  });
  const onSubmit: SubmitHandler<SignUp> = async data => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URI}signup`,
        data
      );
      if (response.status === 200) {
        setVisibleSuccess(true);
        setTimeout(() => navigate('/login'), 1500);
      }
    } catch (e: any) {
      setTimeout(() => setErrorMessage(''), 3000);
      setErrorMessage(
        e.response.data?.error || `${t('registration.regisrationFail')}`
      );
    }
  };

  const handleMouseDownPassword = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <AuthFormWrapper>
      <Grid container justifyContent="center">
        <Grid item md={4}>
          <PaperForm>
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4}>
                <Typography align="center" variant="h4">
                  {t('registration.createProfile')}
                </Typography>
                <Snackbar
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  open={visibleSucces}
                >
                  <Alert severity="success">
                    {t('registration.regisrationSuccess')}
                  </Alert>
                </Snackbar>
                <Snackbar
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  open={!!errorMessage}
                >
                  <Alert severity="error">{errorMessage}</Alert>
                </Snackbar>
                <Controllers
                  handleClickShowPassword={handleClickShowPassword}
                  handleMouseDownPassword={handleMouseDownPassword}
                  showPassword={showPassword}
                />
                <Button fullWidth variant="contained" type="submit">
                  {t('registration.create')}
                </Button>
              </Stack>
            </Box>
          </PaperForm>
        </Grid>
      </Grid>
    </AuthFormWrapper>
  );
}

export default Registration;
