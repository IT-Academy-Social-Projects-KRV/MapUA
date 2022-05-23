import React from 'react';
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { useTranslation } from 'react-i18next';
import { StyledAppBar, StyledStack } from './style';

function NavBar() {
  const { isAuthorized } = useTypedSelector(state => state.userAuth);
  const { t, i18n } = useTranslation();

  const changeLanguage = (language: string) => () => {
    i18n.changeLanguage(language);
  };

  return (
    <StyledAppBar>
      <StyledStack direction="row">
        <button type="button" onClick={changeLanguage('en')}>
          English
        </button>
        <button type="button" onClick={changeLanguage('ua')}>
          Українська
        </button>
        <Link
          color="inherit"
          underline="none"
          component={RouterLink}
          to="/about_us"
        >
          {t('navBar.aboutUs')}
        </Link>
        <Link
          color="inherit"
          underline="none"
          component={RouterLink}
          to="/news"
        >
          {t('navBar.news')}
        </Link>
        <Link color="inherit" underline="none" component={RouterLink} to="/">
          {t('navBar.map')}
        </Link>
        {isAuthorized ? (
          <Link
            to="/profile"
            color="inherit"
            underline="none"
            component={RouterLink}
          >
            {t('navBar.myProfile')}
          </Link>
        ) : (
          <Link
            color="inherit"
            underline="none"
            component={RouterLink}
            to="/login"
          >
            {t('common.login')}
          </Link>
        )}
      </StyledStack>
    </StyledAppBar>
  );
}

export default NavBar;
