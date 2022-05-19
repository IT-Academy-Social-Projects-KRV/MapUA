import React from 'react';
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { useTranslation } from 'react-i18next';
import { StyledAppBar, StyledStack } from './style';

function NavBar() {
  const { isLogged } = useTypedSelector(state => state.userLogin);
  const { t } = useTranslation();

  // const changeLanguage = (language: string) => () => {
  //   i18n.changeLanguage(language);
  // };

  return (
    <StyledAppBar>
      <StyledStack direction="row">
        {/* <button type="button" onClick={changeLanguage('en')}>
          English
        </button>
        <button type="button" onClick={changeLanguage('ua')}>
          Українська
        </button> */}
        <Link
          color="inherit"
          underline="none"
          component={RouterLink}
          to="/about_us"
        >
          {t('common.aboutUs')}
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
