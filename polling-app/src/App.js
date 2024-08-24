import React from 'react';
import PollList from './components/PollList';  
import './App.css';  // Ensure this import is correct

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="header-tile">
          <h1>Polling App</h1>
        </div>
      </header>
      <PollList />
    </div>
  );
}

export default App;
