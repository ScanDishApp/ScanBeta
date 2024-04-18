import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './screens/HomeScreen';
import Scan from './screens/ScanScreen';
import NavTab from './screens/NavTab';
import Profile from './screens/ProfileScreen';
import Book from './screens/BookScreen';
import DummyPage from './screens/DummyPage'; // Assuming DummyPage is your new component
import MyBooks from './screens/MyBooksScreen';
import NewUser from './screens/NewUserScreen';
import Temperatur from './screens/TemperatureScreen';
import BookDesign from './screens/BookDesignPage';
import Calculator from './screens/CalculatorScreen';
import NewPage from './screens/NewPageScreen';
import EditUser from './screens/EditUserScreen';


export default function App() {
  let userId = localStorage.getItem("userId");
  return (
    <div>
      <Router>
        <NavTab />
        <Routes>
    
          <Route path="/" element={<Home />} />
          <Route path="/Scan" element={<Scan />} />
          <Route path="/Book" element={<Book />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/dummy-page" element={<DummyPage />} /> {/* New route for DummyPage */}
          <Route path="/new-user-page" element={<NewUser />} /> {/* New route for DummyPage */}
          <Route path="/edit-user-page" element={<EditUser />} /> {/* New route for DummyPage */}
          <Route path="/bookDesign" element={<BookDesign />} /> {/* New route for DummyPage */}
          <Route path="/Calculator" element={<Calculator />} /> {/* New route for DummyPage */}
          <Route path="/Temperatur" element={<Temperatur />} /> {/* New route for DummyPage */}
          <Route path="/MyBooks" element={<MyBooks />} /> {/* New route for DummyPage */}
          <Route path="/NewPage" element={<NewPage />} /> {/* New route for DummyPage */}


        </Routes>
      </Router>
    </div>
  );
}
