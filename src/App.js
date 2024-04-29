import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './screens/Header'; // Import the Header component
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
import NewPage from './screens/NewPageScreen';
import SharedBooks from './screens/ShareBookScreen';
import Friends from './screens/FriendListScreen';
import FriendRequest from './screens/FriendRequestScreen';


import TemperatureConverter from './screens/TemperatureScreen';

import StickerMenu from './screens/Stickers';
import Calculator from './screens/CalculatorScreen';
import EditUser from './screens/EditUserScreen';

export default function App() {
  let userId = localStorage.getItem("userId");
  return (
    <div>
      <Router>
        <Header />
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
          <Route path="/TemperatureConverter" element={<TemperatureConverter />} /> {/* New route for DummyPage */}
          <Route path="/MyBooks" element={<MyBooks />} /> {/* New route for DummyPage */}
          <Route path="/NewPage" element={<NewPage />} /> {/* New route for DummyPage */}
          <Route path="/StickerMenu" element={<StickerMenu   />} /> {/* New route for DummyPage */}
          <Route path="/Friends" element={<Friends   />} /> {/* New route for DummyPage */}
          <Route path="/friend-request-screen" element={<FriendRequest   />} /> {/* New route for DummyPage */}
          <Route path="/shared-books" element={<SharedBooks   />} /> {/* New route for DummyPage */}



        </Routes>
      </Router>
    </div>
  );
}
