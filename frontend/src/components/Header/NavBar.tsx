import React from 'react';
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { useTranslation } from 'react-i18next';
import LanguageSelect from 'components/LanguageSelect/LanguageSelect';
import { StyledAppBar, StyledStack } from './style';

function NavBar() {
  const { isAuthorized } = useTypedSelector(state => state.userAuth);
  const { t } = useTranslation();

  return (
    <StyledAppBar>
      <StyledStack direction="row">
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
        <LanguageSelect />
      </StyledStack>
    </StyledAppBar>
  );
}

export default NavBar;
