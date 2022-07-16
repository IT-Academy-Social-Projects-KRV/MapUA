import { Avatar, Box } from '@mui/material';
import { StyledTabComponentBox } from 'components/design/StyledTabComponentBox';
import { StyledCardProfileTabs } from 'components/design/StyledCardProfileTabs';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { getPath } from 'utils/createPath';
import { selectUserId } from 'redux/memoizedSelectors/userDataSelectors';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { v4 } from 'uuid';
import userImageNotFound from '../../static/image-not-found.jpg';

type Props = {
  array: any;
};

const ProfileTabsData = ({ array }: Props) => {
  const userId = useTypedSelector(selectUserId);

  return (
    <Box>
      {array.map((s: any) => (
        <StyledTabComponentBox key={v4()}>
          <StyledCardProfileTabs>
            <Link to={getPath(userId, s?._id)}>
              <Avatar
                aria-label="User"
                src={(s && s.imageUrl) || userImageNotFound}
              />
            </Link>
            <Link
              to={getPath(userId, s?._id)}
              style={{ textDecoration: 'none' }}
            >
              {(s && s.displayName) || 'undefined'}
            </Link>
          </StyledCardProfileTabs>
        </StyledTabComponentBox>
      ))}
    </Box>
  );
};

export default memo(ProfileTabsData);
