import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './screens/HomeScreen';
import Scan from './screens/ScanScreen';
import NavTab from './screens/NavTab';
import Setting from './screens/SettingScreen';
import Book from './screens/BookScreen';

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <NavTab />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Scan" element={<Scan />} />
          <Route path="/Book" element={<Book />} />
          <Route path="/Setting" element={<Setting />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}