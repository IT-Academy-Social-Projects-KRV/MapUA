import React from 'react';
import { Link } from '@mui/material';
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
        <Link
          color="inherit"
          underline="none"
          component={RouterLink}
          to="/login"
        >
          Login
        </Link>
      </StyledStack>
    </StyledAppBar>
  );
}

export default NavBar;
