import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalStyles from '@mui/material/GlobalStyles';
import HomeScreen from 'screens/HomeScreen';
import NavBar from 'components/Header/NavBar';
import Footer from 'components/Footer/Footer';
import Registration from './components/Registration/Registration';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles
        styles={{
          html: {
            '-webkit-font-smoothing': 'antialiased',
            '-moz-osx-font-smoothing': 'grayscale',
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
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
