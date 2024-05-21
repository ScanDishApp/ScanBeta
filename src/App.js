import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AnimatedRoutes from './screens/AnitmatedRoutes';
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
import TemperatureConverter from './screens/TemperatureScreen';
import StickerMenu from './screens/Stickers';
import Calculator from './screens/CalculatorScreen';
import EditUser from './screens/EditUserScreen';
import LookMyBooks from './screens/LookAtBookScreen';
import Favorites from './screens/FavouriteScreen';
import Ingredients from './screens/Ingredients';
import Instructions from './screens/Instructions';
import ScanMod from './screens/ScanMod';
import ChooseScan from './screens/ChooseScan';
import InfoCarousel from './screens/infoCarousel'

const Layout = ({ children, showNav, showHeader }) => (
  <div>
    {showHeader && <Header />}
    {showNav && <NavTab />}
    {children}
  </div>
);

export default function App() {
  return (
    <div>
      <Router>
        <Routes>
        <Route path="/" element={<Layout showNav={true}><Home /></Layout>} />
<Route path="/Scan" element={<Layout showNav={true}><Scan /></Layout>} />
<Route path="/Book" element={<Layout showNav={true}><Book /></Layout>} />
<Route path="/Profile" element={<Layout showNav={true}><Profile /></Layout>} />
<Route path="/dummy-page" element={<Layout showNav={true}><DummyPage /></Layout>} /> 
<Route path="/new-user-page" element={<Layout showNav={true}><NewUser /></Layout>} /> 
<Route path="/edit-user-page" element={<Layout showNav={true}><EditUser /></Layout>} /> 
<Route path="/bookDesign" element={<Layout showNav={true}><BookDesign /></Layout>} />
<Route path="/Calculator" element={<Layout showNav={true}><Calculator /></Layout>} /> 
<Route path="/TemperatureConverter" element={<Layout showNav={true}><TemperatureConverter /></Layout>} /> 
<Route path="/MyBooks" element={<Layout showNav={true}><MyBooks /></Layout>} /> 
<Route path="/NewPage" element={<Layout showNav={true}><NewPage /></Layout>} /> 
<Route path="/StickerMenu" element={<Layout showNav={true}><StickerMenu /></Layout>} /> 
<Route path="/Friends" element={<Layout showNav={true}><Friends /></Layout>} /> 
<Route path="/friend-request-screen" element={<Layout showNav={true}><FriendRequest /></Layout>} /> 
<Route path="/shared-books" element={<Layout showNav={true}><SharedBooks /></Layout>} /> 
<Route path="/look-my-book" element={<Layout showNav={true}><LookMyBooks /></Layout>} />
<Route path="/favorites-screen" element={<Layout showNav={true}><Favorites /></Layout>} />
<Route path="/Instructions" element={<Layout showNav={true}><NewPage /></Layout>} />
<Route path="/Ingredients" element={<Layout showNav={true}><NewPage /></Layout>} />
<Route path="/ScanMod" element={<Layout showNav={true}><ScanMod /></Layout>} />
<Route path="/ChooseScan" element={<Layout showNav={true}><ChooseScan /></Layout>} />
<Route path="/InfoCarousel" element={<Layout showNav={false} showHeader={false}><InfoCarousel /></Layout>} />



        </Routes>
        <AnimatedRoutes />

      </Router>
    </div>
  );
}
