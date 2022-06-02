import React, { useState } from 'react';
import { Link, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { useTranslation } from 'react-i18next';
import { StyledAppBar, StyledStack } from './style';

const StyledLink: React.FC<React.PropsWithChildren<{ to: string }>> = ({
  to,
  children
}) => (
  <Link
    style={{
      display: 'flex',
      alignItems: 'center'
    }}
    color="inherit"
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
  <Button
    sx={{
      color: 'white',
      minWidth: 'fit-content',
      borderBottom: isChosen ? '2px solid white' : 'none'
    }}
    onClick={onClick}
  >
    {children}
  </Button>
);

function NavBar() {
  const { data: isAuthorized } = useTypedSelector(
    state => state.isUserAuthorized
  );
  const { t, i18n } = useTranslation();
  const lng = localStorage.getItem('i18nextLng');
  const [currentLanguage, setCurrentLanguage] = useState<any>(lng);
  const changeLanguage = (language: string) => () => {
    i18n.changeLanguage(language);
    setCurrentLanguage(language);
  };

  return (
    <StyledAppBar>
      <StyledStack direction="row">
        <StyledLink to="/about_us">{t('navBar.aboutUs')}</StyledLink>
        <StyledLink to="/news">{t('navBar.news')}</StyledLink>
        <StyledLink to="/">{t('navBar.map')}</StyledLink>
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
      </StyledStack>
    </StyledAppBar>
  );
}

export default NavBar;
