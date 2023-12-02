// App.js
import React from 'react';
import Dashboard from './components/dashboard';
import './App.css'; // Import the CSS file for App styling

const App = () => {
  return (
    <div className="app-container">
      <header>
        {/* <img src="/dash_img2.jpg" alt="Dashboard Logo" className="logo" /> */}
        <h1>Developer Analytics Dashboard</h1>
      </header>
      <main>
        <Dashboard />
      </main>
    </div>
  );
};

export default App;


