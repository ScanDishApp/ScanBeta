import React from 'react';

const ChooseScan = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50px', 
  };

  const buttonStyle = {
    margin: '10px',
    padding: '12px 24px',
    fontSize: '16px',
    backgroundColor: '#9bba59',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ color: '#333', marginBottom: '20px' }}>Choose Scan</h1>
      <button style={buttonStyle} onClick={handleScan1Click}>
        Scan Option 1
      </button>
      <button style={buttonStyle} onClick={handleScan2Click}>
        Scan Option 2
      </button>
    </div>
  );

  function handleScan1Click() {
    console.log('Scan Option 1 clicked');
  }

  function handleScan2Click() {
    console.log('Scan Option 2 clicked');
  }
};

export default ChooseScan;
