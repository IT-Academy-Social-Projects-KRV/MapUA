import React, { useEffect, useState, useRef } from 'react';
// import { Typography, Button, Box, Snackbar, Alert } from '@mui/material';
import { Typography, Button, Box } from '@mui/material';
import { useForm, SubmitHandler, useFormState } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { EditProfileSchema } from 'utils/validation';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import ExtendSnackbar from 'components/ExtendSnackbar/ExtendSnackbar';
import {
  ProfileContentWrapper,
  ProfileFormWrapper,
  ProfileUserWrapper,
  TypographyDate
} from './styles';
import BasicTabs from './BasicTabs';
import { UserForm } from '../../../types';
import { SaveGroup } from './SaveGroup/SaveGroup';
import { EditGroup } from './EditGroup/EditGroup';
import useDebounce from '../../utils/useDebounce';

export default function ProfilePage() {
  const { t } = useTranslation();
  const isMounted = useRef(false);

  const { updateUserData, deleteUserData, deletePrivateUserData, logout } =
    useTypedDispatch();
  const {
    success: updateSuccess,
    error: updateError,
    data: { _id: id, displayName, description }
  } = useTypedSelector(state => state.userData);
  const { email, createdAt, updatedAt } = useTypedSelector(
    state => state.privateUserData.data
  );
  const isMountedDebounced = useDebounce(isMounted.current, 1000);
  const [showEditPanel, setShowEditPanel] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [userImage, setUserImage] = useState<File | null>();
  const [errorMessage, setErrorMessage] = useState('');

  const { handleSubmit, control } = useForm<UserForm>({
    mode: 'onBlur',
    defaultValues: { displayName, description },
    resolver: yupResolver(EditProfileSchema)
  });

  const { errors } = useFormState({
    control
  });

  useEffect(() => {
    if (isMountedDebounced) {
      if (updateError) {
        setTimeout(() => setErrorMessage(''), 3000);
        setErrorMessage(
          (typeof updateError === 'string'
            ? updateError
            : updateError.message) || `${t('profile.profilePage.lostNetwork')}`
        );
      }
    } else {
      isMounted.current = true;
    }
  }, [updateError]);
  useEffect(() => {
    if (isMountedDebounced) {
      if (updateSuccess) {
        setSuccessMessage(true);
        setTimeout(() => setSuccessMessage(false), 3000);
        setShowEditPanel(false);
      }
    } else {
      isMounted.current = true;
    }
  }, [updateSuccess]);

  const onSubmit: SubmitHandler<UserForm> = async data => {
    const formData = new FormData();
    if (userImage) {
      formData.append('image', userImage);
    }
    formData.append('id', id);
    formData.append('displayName', data.displayName);
    formData.append('description', data.description);

    updateUserData(formData);
  };
  const editData = () => {
    setShowEditPanel(true);
  };
  const closeEditData = () => {
    setShowEditPanel(false);
  };
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setErrorMessage('');
    setSuccessMessage(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <ProfileFormWrapper>
        <ProfileContentWrapper>
          {/* <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            sx={{ zIndex: 10000 }}
            open={successMessage}
            autoHideDuration={3000}
            onClose={handleClose}
          >
            <Alert severity="success" onClose={handleClose} sx={{ mt: '4vh' }}>
              {t('profile.profilePage.dataSuccessChanged')}
            </Alert>
          </Snackbar>

          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            sx={{ zIndex: 10000 }}
            open={!!errorMessage}
            onClose={handleClose}
            autoHideDuration={3000}
          >
            <Alert onClose={handleClose} severity="error" sx={{ mt: '4vh' }}>
              {errorMessage}
            </Alert>
          </Snackbar> */}

          <ExtendSnackbar
            open={successMessage}
            notification={successMessage}
            onClose={handleClose}
            severity="success"
          />
          <ExtendSnackbar
            open={!!errorMessage}
            notification={!!errorMessage}
            onClose={handleClose}
          />

          {showEditPanel ? (
            <SaveGroup
              onSubmit={onSubmit}
              displayName={displayName}
              description={displayName}
              closeEditData={closeEditData}
              setUserImage={setUserImage}
              userImage={userImage}
            />
          ) : (
            <EditGroup displayName={displayName} editData={editData} />
          )}

          <TypographyDate variant="h6">
            {t('profile.profilePage.creationDate')}{' '}
            {new Date(createdAt).toLocaleDateString('en-GB')}
          </TypographyDate>
          <TypographyDate variant="h6">
            {t('profile.profilePage.updateDate')}{' '}
            {new Date(updatedAt).toLocaleDateString('en-GB')}
          </TypographyDate>

          <Typography variant="h6" component="h6" align="center">
            {email}
          </Typography>
          <Button
            size="large"
            onClick={() => {
              deleteUserData();
              deletePrivateUserData();
              logout();
            }}
            variant="contained"
          >
            {t('profile.profilePage.logout')}
          </Button>
        </ProfileContentWrapper>
        <ProfileUserWrapper>
          <BasicTabs
            error={errors.description}
            showEditPanel={showEditPanel}
            setShowEditPanel={setShowEditPanel}
            control={control}
          />
        </ProfileUserWrapper>
      </ProfileFormWrapper>
    </Box>
  );
}
