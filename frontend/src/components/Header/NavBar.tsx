import React from 'react';
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';

import { StyledAppBar, StyledStack } from './style';

function NavBar() {
  const { isAuthorized } = useTypedSelector(state => state.userLogin);
  console.log('NavBar', isAuthorized);

  return (
    <StyledAppBar>
      <StyledStack direction="row">
        <Link
          color="inherit"
          underline="none"
          component={RouterLink}
          to="/about_us"
        >
          About US
        </Link>
        <Link
          color="inherit"
          underline="none"
          component={RouterLink}
          to="/news"
        >
          News
        </Link>
        <Link color="inherit" underline="none" component={RouterLink} to="/">
          Map
        </Link>
        {isAuthorized ? (
          <Link
            to="/profile"
            color="inherit"
            underline="none"
            component={RouterLink}
          >
            My Profile
          </Link>
        ) : (
          <Link
            color="inherit"
            underline="none"
            component={RouterLink}
            to="/login"
          >
            Login
          </Link>
        )}
      </StyledStack>
    </StyledAppBar>
  );
}

export default NavBar;
