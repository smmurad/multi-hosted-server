import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
// ... other imports ...
import UploadPage from './components/UploadPage';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {/* ... other navigation items ... */}
            <li>
              <Link to="/upload">Upload for Image Recognition</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/">
            <h1>Welcome to the Home Page. Just testing</h1>
          </Route>
          {/* ... other routes ... */}
          <Route path="/upload">
            <UploadPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
