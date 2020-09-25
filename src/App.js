import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './buzzcric.css';
import Routes from './routes/Routes';
import UserContext from './context/UserContext';

const App = () => {
  const [user, setUser] = useState({});

  return (
    <div className="body">
      <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
};

export default App;
