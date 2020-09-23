import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './buzzcric.css';
import Routes from './routes/Routes';

const AppRoute = () => {
  return (
    <div className="body">
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
  );
};

export default AppRoute;
