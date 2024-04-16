import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './screens/HomeScreen';
import Scan from './screens/ScanScreen';
import NavTab from './screens/NavTab';
import Setting from './screens/ProfileScreen';
import Book from './screens/BookScreen';
import DummyPage from './screens/DummyPage'; // Assuming DummyPage is your new component

import NewUser from './screens/NewUserScreen';
import Temperature from './screens/TemperatureScreen';
import BookDesign from './screens/BookDesignPage';
import Calculator from './screens/CalculatorScreen';


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

          <Route path="/new-user-page" element={<NewUser />} /> {/* New route for DummyPage */}


          <Route path="/bookDesign" element={<BookDesign />} /> {/* New route for DummyPage */}
          <Route path="/Calculator" element={<Calculator />} /> {/* New route for DummyPage */}
          <Route path="/Temperature" element={<Temperature />} /> {/* New route for DummyPage */}

        </Routes>
      </Router>
    </div>
  );
}
