import { Box, Avatar, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
// import { Typography } from '@mui/material';

export const ProfileFormWrapper = styled(Box)`
  box-sizing: border-box;
  height: 85vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ProfileContentWrapper = styled(ProfileFormWrapper)`
  height: 70vh;
  // flex-shrink: 2;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
`;

export const ProfileUsertWrapper = styled(ProfileFormWrapper)`
  height: 70vh;
  width: 60wh;
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const ProfileFilterWrapper = styled(ProfileFormWrapper)`
  height: 15vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #768eb0;
`;

export const ProfileAvatar = styled(Avatar)`
  width: 150px;
  height: 150px;
`;
export const FileField = styled(TextField)`
  // dsd
`;
export const UploadBox = styled(Box)`
  margin: 0 0 3vh 4vh;
`;
export const LogoutButton = styled(Button)`
  /* display: none; */
`;
export const CancelButton = styled(Button)`
  margin-left: 3.5vh;
`;
export const SaveButton = styled(Button)`
  margin: 0 0 0 6vh;
`;
export const SaveBox = styled(Box)`
  display: flex;
  margin: 2vh 0 2vh 0;
`;
