import React from 'react';
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';

import { StyledAppBar, StyledStack } from './style';

function NavBar() {
  const { isLogged } = useTypedSelector(state => state.userLogin);

  return (
    <StyledAppBar>
      <StyledStack direction="row">
        <Link
          color="inherit"
          underline="none"
          component={RouterLink}
          to="/About_US"
        >
          About US
        </Link>
        <Link
          color="inherit"
          underline="none"
          component={RouterLink}
          to="/News"
        >
          News
        </Link>
        <Link color="inherit" underline="none" component={RouterLink} to="/">
          Map
        </Link>
        {isLogged ? (
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
            to="/Login"
          >
            Login
          </Link>
        )}
      </StyledStack>
    </StyledAppBar>
  );
}

export default NavBar;
