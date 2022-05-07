import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalStyles from '@mui/material/GlobalStyles';
import HomeScreen from 'screens/HomeScreen';
import NavBar from 'components/Header/NavBar';
import Footer from 'components/Footer/Footer';
import Login from 'components/Login/Login';
import ForgotPassword from 'components/ForgotPassword/ForgotPassword';
import Registration from 'components/Registration/Registration';
import Profile from 'components/develop/Profile';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles
        styles={{
          html: {
            height: '100%',
            width: '100%'
          },
          '*, *::before, *::after': {
            boxSizing: 'border-box',
            padding: 0,
            margin: 0,
            border: 0
          },
          body: {
            height: '100%',
            width: '100%'
          },
          '#root': {
            height: '100%',
            width: '100%'
          }
        }}
      />
      <NavBar />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/test-profile-data" element={<Profile />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
