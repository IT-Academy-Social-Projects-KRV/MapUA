import React from 'react';
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
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import './i18n/config';

function App() {
  const { isLogged } = useTypedSelector(state => state.userLogin);
  return (
    <BrowserRouter>
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
        <Route path="/registration" element={<Registration />} />
        <Route
          path="/login"
          element={isLogged ? <Navigate to="/" replace /> : <Login />}
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/test-redux-components" element={<ComposeComponents />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
