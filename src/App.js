import React, { useState } from 'react';
import { BrowserRouter as HashRouter } from 'react-router-dom';
import './buzzcric.css';
import Routes from './routes/Routes';
import UserContext from './context/UserContext';

const App = () => {
  const [user, setUser] = useState({});

  return (
    <div className="body">
      <UserContext.Provider value={{ user, setUser }}>
        <HashRouter>
          <Routes />
        </HashRouter>
      </UserContext.Provider>
    </div>
  );
};

export default App;
