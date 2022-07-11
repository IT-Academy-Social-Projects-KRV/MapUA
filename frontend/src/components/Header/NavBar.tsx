import React, { useState } from 'react';
import { Link, Box } from '@mui/material';
import { Link as RouterLink, useSearchParams } from 'react-router-dom';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { StyledAppBar } from '../design/StyledAppBar';
import { StyledChangeLangButton } from '../design/StyledChangeLangButton';

const StyledLink: React.FC<
  // eslint-disable-next-line react/require-default-props
  React.PropsWithChildren<{ to: string; onClick?: any }>
> = ({ to, children, onClick }) => (
  <Link
    color="inherit"
    onClick={onClick}
    underline="none"
    component={RouterLink}
    to={to}
  >
    {children}
  </Link>
);

const StyledLangButton: React.FC<
  React.PropsWithChildren<{ isChosen: boolean; onClick: any }>
> = ({ isChosen, children, onClick }) => (
  <StyledChangeLangButton
    sx={{ borderBottom: isChosen ? '2px solid white' : 'none' }}
    onClick={onClick}
  >
    {children}
  </StyledChangeLangButton>
);

function NavBar() {
  const { isAuthorized } = useTypedSelector(
    state => state.isUserAuthorized.data
  );
  const { t, i18n } = useTranslation();
  const lng = localStorage.getItem('i18nextLng');
  const [currentLanguage, setCurrentLanguage] = useState<any>(lng);
  const [, setSearchParams] = useSearchParams();
  const { setLocationName } = useTypedDispatch();

  const changeLanguage = (language: string) => () => {
    i18n.changeLanguage(language);
    setCurrentLanguage(language);
  };

  return (
    <StyledAppBar>
      <StyledLink to="/about-us">{t('navBar.aboutUs')}</StyledLink>
      <StyledLink to="/top">{t('navBar.top')}</StyledLink>
      <StyledLink
        onClick={() => {
          setSearchParams({});
          setLocationName('');
        }}
        to="/"
      >
        {t('navBar.map')}
      </StyledLink>
      {isAuthorized ? (
        <StyledLink to="/profile">{t('navBar.myProfile')}</StyledLink>
      ) : (
        <StyledLink to="/login">{t('common.login')}</StyledLink>
      )}
      <Box>
        <StyledLangButton
          isChosen={currentLanguage === 'en'}
          onClick={changeLanguage('en')}
        >
          EN
        </StyledLangButton>
        |
        <StyledLangButton
          isChosen={currentLanguage === 'ua'}
          onClick={changeLanguage('ua')}
        >
          UA
        </StyledLangButton>
      </Box>
    </StyledAppBar>
  );
}

export default NavBar;
