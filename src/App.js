import React from 'react';

function WelcomePage() {
  return (
    <div style={{
      width: '100%',
      height: '100vh',
      background: 'linear-gradient(to bottom right, #ff6e7f, #bfe9ff)', /* Adjust colors as needed */
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      color: 'white',
    }}>
      <div>
        <h1 style={{ fontSize: '3rem' }}>Welcome to My Website</h1>
        <p style={{ fontSize: '1.5rem' }}>Thank you for visiting!</p>
      </div>
    </div>
  );
}

export default WelcomePage;
