import React from 'react';
import '../screens/ScreenStyle/LoadingModal.css'
import logo from '../assets/Loader.png'

const LoadingModal = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="loading-modal">
      <div className="loading-content">
        <img className="spinner"src={logo} alt="Logo"/>
        <p>Laster...</p>
      </div>
    </div>
  );
};

export default LoadingModal;