import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Map from 'components/Map/index';
import NavBar from 'Header/NavBar';
import Footer from 'Footer/Footer';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/Map" element={<Map />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
