import React from 'react';
import './App.css';

// const MFE1_Dashboard = React.lazy(
//   () => import('MFE1/Dashboard')
// )
// const MFE1_App = React.lazy(
//   () => import('MFE1/App')
// )

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <React.Suspense fallback='Loading Button'>
          <MFE1_Dashboard/>
        </React.Suspense> */}
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
