import React, { memo, useCallback, useState } from 'react';
import { Link, Box } from '@mui/material';
import { Link as RouterLink, useSearchParams } from 'react-router-dom';
import { selectIsUserAuthorized } from 'redux/memoizedSelectors/isUserAuthorizedSelectors';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { StyledAppBar } from '../design/StyledAppBar';
import { StyledChangeLangButton } from '../design/StyledChangeLangButton';
import HowToAddLocation from '../HowToAddLocation/HowToAddLocation';

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
  const isAuthorized = useTypedSelector(selectIsUserAuthorized);
  const { t, i18n } = useTranslation();
  const lng = localStorage.getItem('i18nextLng');
  const [currentLanguage, setCurrentLanguage] = useState<any>(lng);
  const [, setSearchParams] = useSearchParams();
  const { setLocationName } = useTypedDispatch();

  const changeLanguage = useCallback(
    (language: string) => () => {
      i18n.changeLanguage(language);
      setCurrentLanguage(language);
    },
    []
  );

  const handleOnClick = useCallback(() => {
    setSearchParams({});
    setLocationName('');
  }, []);

  return (
    <StyledAppBar>
      <StyledLink to="/about-us">{t('navBar.aboutUs')}</StyledLink>
      <StyledLink to="/top">{t('navBar.top')}</StyledLink>
      <StyledLink onClick={handleOnClick} to="/">
        {t('navBar.map')}
      </StyledLink>
      {isAuthorized ? <HowToAddLocation /> : null}
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

export default memo(NavBar);
