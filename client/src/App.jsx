import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Transactions from './components/Transactions';
import Settings from './components/Settings';
import './styles.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route
            path="/transactions"
            element={isLoggedIn ? <Transactions /> : <Navigate to="/" />}
          />
          <Route
            path="/settings"
            element={isLoggedIn ? <Settings /> : <Navigate to="/" />}
          />
        </Routes>
        {isLoggedIn && (
          <nav>
            <Link to="/transactions">交易</Link> | <Link to="/settings">設置</Link>
          </nav>
        )}
      </div>
    </Router>
  );
}

export default App;