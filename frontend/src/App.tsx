import React, { SyntheticEvent, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import GlobalStyles from '@mui/material/GlobalStyles';
import HomeScreen from 'screens/HomeScreen';
import NavBar from 'components/Header/NavBar';
import Footer from 'components/Footer/Footer';
import Login from 'components/Login/Login';
import ForgotPassword from 'components/ForgotPassword/ForgotPassword';
import Registration from 'components/Registration/Registration';
import ComposeComponents from 'redux/components/ComposeComponents';
import Profile from 'components/Profile/Profile';
import Page404 from 'components/Page_404/Page404';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import PersonProfile from 'components/PersonProfile/PersonProfile';
import { useTypedDispatch } from './redux/hooks/useTypedDispatch';
import ExtendSnackbar from './components/ExtendSnackbar/ExtendSnackbar';

function App() {
  let accessToken = localStorage.getItem('accessToken');
  const { type, visible, notification } = useTypedSelector(
    state => state.snackbar
  );
  const { ResetSnackbar } = useTypedDispatch();
  const handleCloseNotification = (
    e?: SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    ResetSnackbar();
  };

  const { data: isAuthorized } = useTypedSelector(
    state => state.isUserAuthorized
  );
  const { checkIsUserAuthorized, fetchUserData } = useTypedDispatch();

  useEffect(() => {
    accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      checkIsUserAuthorized();
    }
    if (accessToken && isAuthorized) {
      fetchUserData(accessToken);
    }
  }, [isAuthorized]);

  return (
    <BrowserRouter>
      <ExtendSnackbar
        open={visible}
        notification={notification}
        onClose={handleCloseNotification}
        severity={type}
      />
      <GlobalStyles
        styles={{
          '#root': {
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            minHeight: '100vh',
            width: '100%'
          }
        }}
      />
      <NavBar />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route
          path="/registration"
          element={
            isAuthorized ? <Navigate to="/" replace /> : <Registration />
          }
        />
        <Route
          path="/login"
          element={isAuthorized ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/forgot-password"
          element={
            isAuthorized ? <Navigate to="/" replace /> : <ForgotPassword />
          }
        />
        <Route path="/test-redux-components" element={<ComposeComponents />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:id" element={<PersonProfile />} />
        <Route path="/*" element={<Page404 />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
