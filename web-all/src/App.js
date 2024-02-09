import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <div>
        <iframe title="frontend-1" src="http://localhost:3000" width="700" height="600" />
      </div>
      <div>
        <iframe title="frontend-2" src="http://localhost:3001" width="700" height="200" />
      </div>
      <div>
        <iframe title="frontend-3" src="http://localhost:3002" width="700" height="300" />
      </div>
      </header>
    </div>
  );
}

export default App;
