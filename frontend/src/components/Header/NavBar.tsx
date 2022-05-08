import React, { SyntheticEvent } from 'react';
import { Link } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';

import { StyledAppBar, StyledStack } from './style';

function NavBar() {
  const { isLogged } = useTypedSelector(state => state.userLogin);
  const { logout } = useTypedDispatch();
  const navigate = useNavigate();

  const logoutHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    setTimeout(() => {
      logout();
      navigate('/');
    }, 500);
  };

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
            to="/"
            color="inherit"
            underline="none"
            component={RouterLink}
            onClick={logoutHandler}
          >
            Logout
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
