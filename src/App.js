import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './screens/HomeScreen';
import Scan from './screens/ScanScreen';
import NavTab from './screens/NavTab';
import Setting from './screens/ProfileScreen';
import Book from './screens/BookScreen';
import DummyPage from './screens/DummyPage'; // Assuming DummyPage is your new component

export default function App() {
  return (
    <div>
      <Router>
        <NavTab />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Scan" element={<Scan />} />
          <Route path="/Book" element={<Book />} />
          <Route path="/Profile" element={<Setting />} />
          <Route path="/dummy-page" element={<DummyPage />} /> {/* New route for DummyPage */}
        </Routes>
      </Router>
    </div>
  );
}
