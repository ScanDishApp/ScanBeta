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
import LookMyBooks from './screens/LookAtBookScreen';
import Favorites from './screens/FavouriteScreen';
const Layout = ({ children }) => (
  <div>
    <Header />
   
    {children}
  </div>
);

export default function App() {
  return (
    <div>
      <Router>
      <NavTab />
        <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/Scan" element={<Layout><Scan /></Layout>} />
          <Route path="/Book" element={<Layout><Book /></Layout>} />
          <Route path="/Profile" element={<Layout><Profile /></Layout>} />
          <Route path="/dummy-page" element={<DummyPage />}/> 
          <Route path="/new-user-page" element={<NewUser />} /> 
          <Route path="/edit-user-page" element={<Layout><EditUser /></Layout>} /> 
          <Route path="/bookDesign" element={<BookDesign />} />
          <Route path="/Calculator" element={<Layout><Calculator /></Layout>} /> 
          <Route path="/TemperatureConverter" element={<Layout><TemperatureConverter /></Layout>} /> 
          <Route path="/MyBooks" element={<Layout><MyBooks /></Layout>} /> 
          <Route path="/NewPage" element={<NewPage />} /> 
          <Route path="/StickerMenu" element={<Layout><StickerMenu   /></Layout>} /> 
          <Route path="/Friends" element={<Layout><Friends   /></Layout>} /> 
          <Route path="/friend-request-screen" element={<Layout><FriendRequest   /></Layout>} /> 
          <Route path="/shared-books" element={<Layout><SharedBooks   /></Layout>} /> 
          <Route path="/PaperEnhancer" element={<Layout><PaperEnhancer /></Layout>} />
          <Route path="/look-my-book" element={<LookMyBooks />} />
          <Route path="/favorites-screen" element={<Favorites />} />
        </Routes>
      </Router>
    </div>
  );
}
