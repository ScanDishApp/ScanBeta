import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './screens/Header'; 
import Home from './screens/HomeScreen';
import Scan from './screens/ScanScreen';
import NavTab from './screens/NavTab';
import Profile from './screens/ProfileScreen';
import Book from './screens/BookScreen';
import DummyPage from './screens/DummyPage';
import MyBooks from './screens/MyBooksScreen';
import NewUser from './screens/NewUserScreen';
import Temperatur from './screens/TemperatureScreen';
import BookDesign from './screens/BookDesignPage';
import NewPage from './screens/NewPageScreen';
import SharedBooks from './screens/ShareBookScreen';
import Friends from './screens/FriendListScreen';
import FriendRequest from './screens/FriendRequestScreen';
import PaperEnhancer from './screens/ScanConvert';
import TemperatureConverter from './screens/TemperatureScreen';
import StickerMenu from './screens/Stickers';
import Calculator from './screens/CalculatorScreen';
import EditUser from './screens/EditUserScreen';

export default function App() {
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
          <Route path="/dummy-page" element={<DummyPage />} /> 
          <Route path="/new-user-page" element={<NewUser />} /> 
          <Route path="/edit-user-page" element={<EditUser />} /> 
          <Route path="/bookDesign" element={<BookDesign />} />
          <Route path="/Calculator" element={<Calculator />} /> 
          <Route path="/TemperatureConverter" element={<TemperatureConverter />} /> 
          <Route path="/MyBooks" element={<MyBooks />} /> 
          <Route path="/NewPage" element={<NewPage />} /> 
          <Route path="/StickerMenu" element={<StickerMenu   />} /> 
          <Route path="/Friends" element={<Friends   />} /> 
          <Route path="/friend-request-screen" element={<FriendRequest   />} /> 
          <Route path="/shared-books" element={<SharedBooks   />} /> 
          <Route path="/PaperEnhancer" element={<PaperEnhancer />} />
        </Routes>
      </Router>
    </div>
  );
}
