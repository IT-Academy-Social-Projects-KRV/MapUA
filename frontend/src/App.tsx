import React, { SyntheticEvent, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import GlobalStyles from '@mui/material/GlobalStyles';
import HomeScreen from 'screens/HomeScreen';
import Login from 'screens/Login/Login';
import ForgotPassword from 'screens/ForgotPassword/ForgotPassword';
import Registration from 'screens/Registration/Registration';
import Profile from 'screens/Profile/Profile';
import Page404 from 'screens/Page_404/Page404';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import AboutUs from 'screens/AboutUs/AboutUs';
import PersonProfile from 'screens/PersonProfile/PersonProfile';
import TopList from 'screens/TopList/TopList';
import Layout from 'components/Layout/Layout';
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

  const { isAuthorized } = useTypedSelector(
    state => state.isUserAuthorized.data
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
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomeScreen />} />
          <Route path="/moderation/:locationId" element={<HomeScreen />} />
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
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:id" element={<PersonProfile />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/top" element={<TopList />} />
          <Route path="/*" element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
