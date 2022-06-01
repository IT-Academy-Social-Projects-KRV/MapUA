import React, { useEffect, useState } from 'react';
import {
  Typography,
  Button,
  Box,
  TextField,
  Snackbar,
  Alert
} from '@mui/material';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import UploadInputProfilePage from 'components/design/UploadInputProfilePage';
import userImageNotFound from '../../static/user-image-not-found.png';
import {
  ProfileContentWrapper,
  ProfileFormWrapper,
  ProfileUsertWrapper,
  SaveBox,
  UploadBox,
  EditButton,
  TypographyDate
} from './styles';
import BasicTabs from './BasicTabs';
import { UserForm } from '../../../types';
import { SaveGroup } from './SaveGroup/SaveGroup';
import { EditGroup } from './EditGroup/EditGroup';

export default function ProfilePage() {
  const { t } = useTranslation();
  const { updateUserData, deleteUserData, deletePrivateUserData, logout } =
    useTypedDispatch();
  const {
    success: updateSuccess,
    error: updateError,
    data: { _id: id, displayName, description, imageUrl: userAvatar }
  } = useTypedSelector(state => state.userData);
  const { email, createdAt, updatedAt } = useTypedSelector(
    state => state.privateUserData.data
  );

  const { handleSubmit, control, register } = useForm<UserForm>({
    mode: 'onBlur',
    defaultValues: { displayName, description }
  });
  const [showEditPanel, setShowEditPanel] = useState(false);
  const [userImage, setUserImage] = useState<File | null | Blob>(null);
  const [newDescription, setNewDescription] = useState(description);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    if (updateError) {
      setTimeout(() => setErrorMessage(''), 3000);
      setErrorMessage(
        (typeof updateError === 'string' ? updateError : updateError.message) ||
          `${t('profile.profilePage.lostNetwork')}`
      );
    }
  }, [updateError]);

  useEffect(() => {
    if (updateSuccess) {
      setSuccessMessage(true);
      setTimeout(() => setSuccessMessage(false), 3000);
      setShowEditPanel(false);
    }
  }, [updateSuccess]);

  const onSubmit: SubmitHandler<UserForm> = async (data, event) => {
    event?.preventDefault();
    const formData = new FormData();
    if (userImage) {
      formData.append('image', userImage);
    }
    formData.append('id', id);
    formData.append('displayName', data.displayName);
    formData.append('description', newDescription);

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
    <ProfileFormWrapper>
      <ProfileContentWrapper>
        <Snackbar
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
        </Snackbar>

        {showEditPanel ? (
          <SaveGroup
            onSubmit={onSubmit}
            displayName={displayName}
            description={displayName}
            closeEditData={closeEditData}
            setUserImage={setUserImage}
          />
        ) : (
          <EditGroup displayName={displayName} editData={editData} />

          // <form onSubmit={handleSubmit(onSubmit)}>
          //   <Box>
          //     <UploadBox>
          //       <ProfileAvatar
          //         aria-label="avatar"
          //         src={
          //           (userImage && URL.createObjectURL(userImage)) || userAvatar
          //         }
          //       />
          //       <UploadInputProfilePage
          //         setUserImage={setUserImage}
          //         register={register}
          //       />
          //     </UploadBox>
          //     <Controller
          //       control={control}
          //       name="displayName"
          //       render={({ field }) => (
          //         <TextField
          //           placeholder={t('profile.profilePage.enterName')}
          //           label={t('profile.profilePage.name')}
          //           fullWidth
          //           onChange={field.onChange}
          //           onBlur={field.onBlur}
          //           defaultValue={field.value}
          //           type="text"
          //         />
          //       )}
          //     />
          //     <SaveBox>
          //       <SaveButton size="large" variant="contained" type="submit">
          //         {t('profile.profilePage.save')}
          //       </SaveButton>
          //       <CancelButton
          //         size="large"
          //         variant="contained"
          //         onClick={closeEditData}
          //       >
          //         {t('profile.profilePage.cancel')}
          //       </CancelButton>
          //     </SaveBox>
          //   </Box>
          // </form>
          // ) : (
          //   <UploadBox>
          //     <ProfileAvatar
          //       aria-label="avatar"
          //       src={userAvatar || userImageNotFound}
          //     />
          //     <Typography
          //       sx={{ mt: '3vh' }}
          //       variant="h5"
          //       component="h4"
          //       align="center"
          //     >
          //       {displayName === undefined
          //         ? `${t('profile.profilePage.yourName')}`
          //         : displayName}
          //     </Typography>

          //     <EditButton size="large" variant="contained" onClick={editData}>
          //       {t('profile.profilePage.editProfile')}
          //     </EditButton>
          //   </UploadBox>
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
      <ProfileUsertWrapper>
        <BasicTabs
          showEditPanel={showEditPanel}
          setShowEditPanel={setShowEditPanel}
          setNewDescription={setNewDescription}
          control={control}
          newDescription={newDescription}
        />
      </ProfileUsertWrapper>
    </ProfileFormWrapper>
  );
}
