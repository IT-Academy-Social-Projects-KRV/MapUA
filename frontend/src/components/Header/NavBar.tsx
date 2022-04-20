import { Link } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { StyledAppBar, StyledStack } from './style';

function NavBar() {
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
        <Link
          color="inherit"
          underline="none"
          component={RouterLink}
          to="/Login"
        >
          Login
        </Link>
      </StyledStack>
    </StyledAppBar>
  );
}

export default NavBar;
