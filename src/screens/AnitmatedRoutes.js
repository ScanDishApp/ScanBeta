import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import NewPage from './NewPageScreen';
import {AnimatePresence} from 'framer-motion'

function AnimatedRoutes() {
  const location = useLocation(); // useLocation hook from react-router-dom

  return (
    <AnimatePresence>
    <Routes location={location}>

      <Route path="/NewPage" element={<NewPage />} /> 

    </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;