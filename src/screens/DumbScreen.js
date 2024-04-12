import React from 'react';

class SimplePage extends React.Component {
  render() {
    return (
      <div>
        <header>
          <h1>Welcome to My Simple Page</h1>
        </header>
        <main>
          <p>This is a simple React webpage.</p>
          <p>You can modify it as you wish!</p>
        </main>
        <footer>
          <p>© 2024 My Simple Page</p>
        </footer>
      </div>
    );
  }
}

export default SimplePage;
