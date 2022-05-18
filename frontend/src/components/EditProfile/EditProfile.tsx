import React from 'react';
import { FormControl, TextField, Button, Typography, Box } from '@mui/material';
import {
  BorderForm,
  EditProfileFormWrapper,
  WrapButtonAndText
} from 'components/EditProfile/styles';
import { WrapH1 } from 'components/ForgotPassword/styles';
import { UserActionTypes } from 'redux/types/user';
import { useDispatch } from 'react-redux';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type EditData = {
  displayName: string;
  description: string;
  imageUrl: any;
};
function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleSubmit, control, register } = useForm<EditData>({
    mode: 'onBlur'
  });
  const onSubmit: SubmitHandler<EditData> = async data => {
    console.log(data);
    try {
      dispatch({ type: UserActionTypes.FETCH_USER });
      const response = await axios.post(
        `${process.env.REACT_APP_API_URI}editProfile`,
        data
      );
      if (response.status === 200) {
        console.log(response);
        dispatch({
          type: UserActionTypes.FETCH_USER_SUCCESS,
          payload: response
        });
      }
    } catch (e: any) {
      dispatch({
        type: UserActionTypes.FETCH_USER_ERROR,
        payload: 'An error occurred while loading user data'
      });
      console.log(e.response.data?.error || 'Something went wrong');
    }
  };
  const cancel = () => {
    navigate('/profile');
  };
  return (
    <EditProfileFormWrapper>
      <BorderForm>
        <FormControl sx={{ width: '35ch' }}>
          <WrapH1>
            <Typography sx={{ fontSize: '24px' }}>Edit profile</Typography>
          </WrapH1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ mt: '20px' }}>
              <Controller
                control={control}
                name="displayName"
                render={({ field }) => (
                  <TextField
                    placeholder="Please enter your name"
                    label="Name"
                    fullWidth
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    defaultValue={field.value}
                    type="text"
                  />
                )}
              />
            </Box>
            <Box sx={{ mt: '20px', width: '100%' }}>
              <Controller
                control={control}
                name="description"
                render={({ field }) => (
                  <TextField
                    placeholder="Please enter information about yourself"
                    label="Description"
                    fullWidth
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    defaultValue={field.value}
                    type="text"
                  />
                )}
              />
            </Box>
            <Box sx={{ mt: '20px' }}>
              <Typography sx={{ fontSize: '14px' }}>
                Upload your photo
              </Typography>
              <Box>
                <input type="file" {...register('imageUrl')} />
              </Box>
            </Box>
            <WrapButtonAndText>
              <Button variant="contained" type="submit">
                Save
              </Button>
              <Button variant="contained" sx={{ ml: '2vh' }} onClick={cancel}>
                Cancel
              </Button>
            </WrapButtonAndText>
          </form>
        </FormControl>
      </BorderForm>
    </EditProfileFormWrapper>
  );
}

export default EditProfile;
