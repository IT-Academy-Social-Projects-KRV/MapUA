import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from 'screens/HomeScreen';
import Map from 'components/Map/index';
import NavBar from 'components/Header/NavBar';
import Footer from 'components/Footer/Footer';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/Map" element={<Map />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
