import { AppBar, Stack, Link } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

function NavBar() {
  return (
    <AppBar
      position="static"
      sx={{ justifyContent: 'center', padding: '20px 0 20px 0' }}
    >
      <Stack justifyContent="center" direction="row" spacing={40}>
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
        <Link color="inherit" underline="none" component={RouterLink} to="/Map">
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
      </Stack>
    </AppBar>
  );
}

export default NavBar;
