import { Avatar, Box } from '@mui/material';
import { StyledTabComponentBox } from 'components/design/StyledTabComponentBox';
import React from 'react';
import { Link } from 'react-router-dom';
import { getPath } from 'utils/createPath';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
// import { v4 } from 'uuid';
import { v4 } from 'uuid';
import userImageNotFound from '../../static/image-not-found.jpg';

type Props = {
  array: any;
};

const ProfileTabsData = ({ array }: Props) => {
  const { _id } = useTypedSelector(state => state.userData.data);

  return (
    <Box>
      {array.map((s: any) => (
        <StyledTabComponentBox key={v4()}>
          <Link to={getPath(_id, s?._id)}>
            <Avatar
              aria-label="User"
              src={(s && s.imageUrl) || userImageNotFound}
            />
          </Link>
          <Link to={getPath(_id, s?._id)}>
            {(s && s.displayName) || 'undefined'}
          </Link>
        </StyledTabComponentBox>
      ))}
    </Box>
  );
};

export default ProfileTabsData;
