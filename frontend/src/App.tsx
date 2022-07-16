import React, {
  Suspense,
  lazy,
  SyntheticEvent,
  useEffect,
  useCallback
} from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import GlobalStyles from '@mui/material/GlobalStyles';
import HomeScreen from 'screens/HomeScreen';
import Login from 'screens/Login/Login';
import { selectIsUserAuthorized } from 'redux/memoizedSelectors/isUserAuthorizedSelectors';
import {
  selectSnackbarNotification,
  selectSnackbarType,
  selectSnackbarVisible
} from 'redux/memoizedSelectors/snackbarSelectors';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import Layout from 'components/Layout/Layout';
import CircularLoader from 'components/CircularLoader/CircularLoader';
import { useTypedDispatch } from './redux/hooks/useTypedDispatch';
import ExtendSnackbar from './components/ExtendSnackbar/ExtendSnackbar';

const LazyProfile = lazy(() => import('screens/Profile/Profile'));
const LazyPage404 = lazy(() => import('components/Page_404/Page404'));
const LazyTopList = lazy(() => import('screens/TopList/TopList'));
const LazyAboutUs = lazy(() => import('screens/AboutUs/AboutUs'));
const LazyRegistration = lazy(
  () => import('screens/Registration/Registration')
);
const LazyForgotPassword = lazy(
  () => import('screens/ForgotPassword/ForgotPassword')
);
const LazyPersonProfile = lazy(
  () => import('screens/PersonProfile/PersonProfile')
);

function App() {
  let accessToken = localStorage.getItem('accessToken');

  const type = useTypedSelector(selectSnackbarType);
  const visible = useTypedSelector(selectSnackbarVisible);
  const notification = useTypedSelector(selectSnackbarNotification);

  const { ResetSnackbar } = useTypedDispatch();
  const handleCloseNotification = useCallback(
    (e?: SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
      ResetSnackbar();
    },
    []
  );

  const isAuthorized = useTypedSelector(selectIsUserAuthorized);

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
      <Suspense fallback={<CircularLoader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomeScreen />} />
            <Route path="/moderation/:locationId" element={<HomeScreen />} />
            <Route
              path="/registration"
              element={
                isAuthorized ? (
                  <Navigate to="/" replace />
                ) : (
                  <LazyRegistration />
                )
              }
            />
            <Route
              path="/login"
              element={isAuthorized ? <Navigate to="/" replace /> : <Login />}
            />
            <Route
              path="/forgot-password"
              element={
                isAuthorized ? (
                  <Navigate to="/" replace />
                ) : (
                  <LazyForgotPassword />
                )
              }
            />
            <Route path="/profile" element={<LazyProfile />} />
            <Route path="/profile/:id" element={<LazyPersonProfile />} />
            <Route path="/about-us" element={<LazyAboutUs />} />
            <Route path="/top" element={<LazyTopList />} />
            <Route path="/*" element={<LazyPage404 />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
